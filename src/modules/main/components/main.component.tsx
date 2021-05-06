import React from "react";
import Menu from "../../menu/components/menu.component";
import {DataType, DedupeType, FilterDedupeStatus, FiltersModel, FilterType} from "../../menu/models/filters.model";
import FilterOptionsProvider from "../../menu/services/filterOptionsProvider.service";
import {
    DedupeModel,
    DedupeResolutionMethodValue,
    InternalStatus,
    ResolutionMethodType
} from "../../results/models/dedupe.model";
import fetchDedupes from "../../results/services/dedupeDataProvider.service";
import Results from "../../results/components/results.component";
import ContentWrapper from "./contentWrapper.component";
import Loading from "../../../sharedModules/shared/components/loading.component";
import NetworkError from "../../../sharedModules/boot/components/networkError.component";
import PleaseSelect, {PleaseSelectType} from "../../../sharedModules/mainPage/components/pleaseSelect.component";
import {
    ChangeResolutionMethod,
    SetResolutionValue
} from "../../resolutionMethodCell/components/resolutionMethodCell.component";
import {changeResolutionMethod, checkUnsaved, setResolutionValue} from "../services/dedupeData.service";
import {resolveDedupe, unresolveDedupe} from "../services/saveDedupe.service";
import {OptionsObject, SnackbarKey, SnackbarMessage, withSnackbar} from "notistack";
import {ActionValue, MenuVariant, UiActionType, UiModel, updateUi} from "../../menu/services/uiModel";
import {
    BatchActionType,
    BatchExecute,
    BatchMethod,
    BatchSelect,
    SelectionType
} from "../../menu/components/batchResolveMenu.component";
import {batchSelectDedupes} from "../../batch/services/batchSelect.service";
import {generateBatchStats} from "../../batch/services/generateBatchStats.service";
import {batchSetMethod, batchUnsetMethod} from "../../batch/services/batchSetMethod.service";
import {batchResolve} from "../../batch/services/batchResolve.service";
import {exportCsv} from "../services/exportCsv.service";
import {baseUrl} from "../../../sharedModules/shared/services/config.service";
import {apiInit} from "@dhis2-app/api";
import {registerDevMethod, DevTools} from "@dhis2-app/dev-tools";

apiInit(baseUrl,process.env.NODE_ENV);

class Main extends React.Component<{
    enqueueSnackbar: (message: SnackbarMessage, options?: OptionsObject) => SnackbarKey;
    closeSnackbar: (key?: SnackbarKey) => void;
    setUnsavedChanges: (boolean)=>void;
}, {
    selectedFilters: FiltersModel,
    results: {
        dedupes: DedupeModel[],
        selectedFilters: FiltersModel
    },
    ui: UiModel,
}> {
    filterOptionsProvider: FilterOptionsProvider = new FilterOptionsProvider();

    constructor(props) {
        super(props);
        this.state = {
            selectedFilters: {
                dedupeType: DedupeType.pure,
                operatingUnit: null,
                dataType: null,
                period: null,
                agency: null,
                technicalArea: null,
                status: FilterDedupeStatus.unresolved,
            },
            results: {
                dedupes: null,
                selectedFilters: null
            },
            ui: {
                menu: {
                    menuTab: MenuVariant.search
                },
                error: {},
                loading: {
                    filters: true
                },
            },
        };
        this.filterOptionsProvider.init().then(() => {
            this.updateUi([{action: UiActionType.loadingFilters, value: false}]);
        }).catch(() => {
            this.updateUi([{action: UiActionType.errorFilters, value: true}]);
        });


        const searches = [
            {name: '1. Rwanda', method: () => this.preselect('XtxUYCsDWrR', '2020Q4', DedupeType.pure)},
            {name: '2. Nigeria', method: () => this.preselect('PqlFzhuPcF1', '2020Q4', DedupeType.pure)},
            // {name: '3. Zambia', method: () => this.preselect('f5RoebaDLMx', '2020Q4', DedupeType.crosswalk)},
            // {name: '4. Botswana', method: () => this.preselect('l1KFEXKI4Dg', '2020Q4', DedupeType.pure)},
            // {name: '5. Cameroon', method: () => this.preselect('bQQJe0cC1eD', '2020Q4', DedupeType.crosswalk)},
            // {name: '6. Ethiopia', method: () => this.preselect('IH1kchw86uA', '2020Q4', DedupeType.crosswalk)},
            // {name: '7. Full list', method: () => this.preselect('l1KFEXKI4Dg', '2020Q3', DedupeType.pure)},
            // {name: '8. No results', method: () => this.preselect('h11OyvlPxpJ', '2020Q4', DedupeType.pure)},
            // {name: '9. Dataset locked', method: () => this.preselect('PqlFzhuPcF1', '2017Q1', DedupeType.pure)},
            // {name: '10. Lesotho', method: () => this.preselect('qllxzIjjurr', '2020Q4', DedupeType.crosswalk)},
            // {name: '11a. Malawi Pure', method: () => this.preselect('lZsCb6y0KDX', '2020Q4', DedupeType.pure)},
            // {name: '11b. Malawi Crosswalk', method: () => this.preselect('lZsCb6y0KDX', '2020Q4', DedupeType.crosswalk)}
        ];

        searches.forEach(registerDevMethod);

        registerDevMethod({name:'current time', method: ()=>alert(`the current time is ${new Date()}`)})

    }

    resolveMessage = (msg:string)=>this.props.enqueueSnackbar(msg, {variant:'success'});
    unresolveMessage = this.resolveMessage;
    errorMessage = (msg:SnackbarMessage)=>this.props.enqueueSnackbar(msg,{variant:'error', persist: true});

    updateUi = (actions: ActionValue[]) => {
        let ui = updateUi(this.state.ui, actions);
        this.setState({ui});
    }

    checkUnsaved = ()=>{
        if (this.props.setUnsavedChanges) this.props.setUnsavedChanges(checkUnsaved(this.state.results.dedupes));
    }

    onSearchClick = () => {
        this.updateUi([{action: UiActionType.loadingResults, value: true}, {
            action: UiActionType.errorResults,
            value: false
        }]);
        let selectedFilters = {...this.state.selectedFilters};
        fetchDedupes(this.state.selectedFilters).then(dedupes => {
            if (JSON.stringify(this.state.selectedFilters)!==JSON.stringify(selectedFilters)) return;
            this.setState({results: {dedupes, selectedFilters}});
            this.updateUi([{action: UiActionType.loadingResults, value: false}])
        }).catch(() => {
            this.setState({results: {dedupes: null, selectedFilters}});
            this.updateUi([{action: UiActionType.loadingResults, value: false}, {
                action: UiActionType.errorResults,
                value: true
            }])
        });
    };

    onFiltersSelect = (filterType: FilterType, filterValue: string | boolean): void => {
        if (this.state.selectedFilters[filterType] === filterValue) return;
        let selectedFilters = {...this.state.selectedFilters};
        // @ts-ignore
        selectedFilters[filterType] = filterValue;
        this.setState({selectedFilters});
    };

    updateDedupes = (dedupes: DedupeModel[]) => {
        this.setState({results: {dedupes, selectedFilters: this.state.results.selectedFilters}});
        this.checkUnsaved();
    }

    changeResolutionMethod: ChangeResolutionMethod = (dedupeId: number, resolvedBy: DedupeResolutionMethodValue) => {
        this.updateDedupes(changeResolutionMethod(this.state.results.dedupes, dedupeId, resolvedBy));
    };

    setResolutionValue: SetResolutionValue = (dedupeId: number, customValue) => {
        this.updateDedupes(setResolutionValue(this.state.results.dedupes, dedupeId, customValue));
    };

    onSelectChange = ()=>{
        this.setState({results:this.state.results});
        if (this.state.ui.menu.menuTab!==MenuVariant.batch) this.updateUi([{action: UiActionType.menuTab, value: MenuVariant.batch}]);
    }

    triggerExport = ()=>{
        exportCsv(this.state.results.selectedFilters);
    };

    renderResults() {
        if (this.state.ui.loading.results) return <Loading message={'Searching duplicates...'} margin={100}/>;
        if (this.state.ui.error.results) return <NetworkError/>;
        if (!this.state.results.dedupes) return <PleaseSelect type={PleaseSelectType.ou}/>;
        return <Results
            filteredDedupes={this.state.results.dedupes}
            setResolutionValue={this.setResolutionValue}
            changeResolutionMethod={this.changeResolutionMethod}
            resolveDedupe={this.resolveDedupe}
            unresolveDedupe={this.unresolveDedupe}
            onSelectChange={this.onSelectChange}
            triggerExport={this.triggerExport}
            dedupeType={this.state.results.selectedFilters.dedupeType}
        />;
    }




    switchMenuTab = (tab: MenuVariant) => {
        this.updateUi([{action: UiActionType.menuTab, value: tab}]);
    }

    resolveDedupe = (id: number) => {
        let dedupe: DedupeModel = this.state.results.dedupes[id - 1];
        dedupe.status = InternalStatus.processing;
        this.setState({results: this.state.results});
        resolveDedupe(dedupe).then(()=>{
            this.resolveMessage(`1 dedupe successfully resolved`);
            dedupe.resolution.original_resolutionMethodValue = JSON.parse(JSON.stringify(dedupe.resolution.resolutionMethodValue));
            dedupe.status = InternalStatus.resolvedOnServer;
            this.updateDedupes(this.state.results.dedupes);
        }).catch(async (response)=>{
            dedupe.status = InternalStatus.readyToResolve;
            this.setState({results: this.state.results});
            this.processResponse(`Cannot resolve dedupe`, response);
        });
    }

    unresolveDedupe = (index: number) => {
        let results = this.state.results;
        let dedupe = results.dedupes[index - 1];
        dedupe.status = InternalStatus.processing;
        this.setState({results});
        unresolveDedupe(this.state.results.dedupes[index - 1]).then(() => {
            this.unresolveMessage(`1 dedupe successfully unresolved`);
            let results = this.state.results;
            dedupe.resolution.resolutionMethodValue = null;
            dedupe.resolution.original_resolutionMethodValue = null;
            dedupe.status = InternalStatus.unresolved;
            this.updateDedupes(results.dedupes);
        }).catch(async (response)=>{
            dedupe.status = InternalStatus.resolvedOnServer;
            this.setState({results: this.state.results});
            this.processResponse(`Cannot unresolve dedupe`, response);
        });
    }

    processResponse = async (message:string, response:any)=>{
        let output:string;
        try {
            let serverMessage = (await response.json()).message;
            output = `Error: ${serverMessage}`;
        } catch(e){
            output = `Error: ${message}`;
        }
        this.errorMessage(output);
    }

    preselect = (orgUnitId: string, period: string, dedupeType: DedupeType) => {
        let selectedFilters = {...this.state.selectedFilters};
        selectedFilters.operatingUnit = orgUnitId;
        selectedFilters.dataType = DataType.results;
        selectedFilters.period = period;
        selectedFilters.dedupeType = dedupeType;
        selectedFilters.status = FilterDedupeStatus.resolvedAndUnresolved;
        this.setState({selectedFilters});
        setTimeout(this.onSearchClick, 0);
    };

    batchSelect:BatchSelect = (selectionType:SelectionType)=>{
        let results = this.state.results;
        results.dedupes = batchSelectDedupes(results.dedupes, selectionType);
        this.setState({results});
    };

    batchMethod:BatchMethod = (method:ResolutionMethodType)=>{
        if(method) batchSetMethod(this.state.results.dedupes, method);
        else batchUnsetMethod(this.state.results.dedupes);
        this.setState({results:this.state.results});
    };

    markDedupesAs = (dedupes:DedupeModel[], status:InternalStatus)=>{
        dedupes.forEach(dedupe=>{
            dedupe.status=status;
            if (status===InternalStatus.resolvedOnServer) dedupe.resolution.original_resolutionMethodValue = JSON.parse(JSON.stringify(dedupe.resolution.resolutionMethodValue));
            if (status===InternalStatus.unresolved) dedupe.resolution.original_resolutionMethodValue = null;
        });
        this.updateDedupes(this.state.results.dedupes);
    };

    batchExecute:BatchExecute = ()=>{
        let dedupesToResolve = this.state.results.dedupes.filter(d=>d.tableData.checked&&d.status===InternalStatus.readyToResolve);
        let dedupesToUnresolve = this.state.results.dedupes.filter(d=>d.tableData.checked&&d.status===InternalStatus.readyToUnresolve);
        if (dedupesToResolve.length>0) this.batchAction(dedupesToResolve, BatchActionType.resolve);
        if (dedupesToUnresolve.length>0) this.batchAction(dedupesToUnresolve, BatchActionType.unresolve);
    }

    batchAction = async (dedupes: DedupeModel[],action:BatchActionType)=>{
        let fromStatus:InternalStatus,toStatus:InternalStatus, verb:string;
        if (action===BatchActionType.resolve){
            fromStatus = InternalStatus.readyToResolve;
            toStatus = InternalStatus.resolvedOnServer;
            verb = 'resolved';
        }
        if (action===BatchActionType.unresolve){
            fromStatus = InternalStatus.readyToUnresolve;
            toStatus = InternalStatus.unresolved;
            verb = 'unresolved';
        }
        this.markDedupesAs(dedupes, InternalStatus.processing);
        let result = await batchResolve(dedupes, action);
        if (result) {
            let msg = `${dedupes.length} dedupe${dedupes.length>1?'s':''} successfully ${verb}`;
            if (action===BatchActionType.resolve) this.resolveMessage(msg);
            if (action===BatchActionType.unresolve) this.unresolveMessage(msg)
            this.markDedupesAs(dedupes,toStatus);
        } else {
            this.errorMessage('Batch processing failed');
            this.markDedupesAs(dedupes, fromStatus);
        }
    };



    render() {
        if (this.state.ui.error.filters) return <NetworkError/>;
        if (this.state.ui.loading.filters) return <Loading message={'Loading...'} margin={100}/>;
        return <React.Fragment>
            <Menu
                selectedFilters={this.state.selectedFilters}
                onFiltersSelect={this.onFiltersSelect}
                filterOptionsProvider={this.filterOptionsProvider}
                onSearchClick={this.onSearchClick}
                menuUi={this.state.ui.menu}
                switchMenuTab={this.switchMenuTab}
                batchSelect={this.batchSelect}
                batchExecute={this.batchExecute}
                batchMethod={this.batchMethod}
                batchStats={generateBatchStats(this.state.results.dedupes)}
            />

            <ContentWrapper>
                {this.renderResults()}
            </ContentWrapper>
            <DevTools buildName='Session expired fix DAT-472' buildDate={new Date()}/>
        </React.Fragment>;
    }
}

export default withSnackbar(Main);

// registerDevMethod({name: 'current time', method: ()=>{
//     alert(`current time is ${new Date()}`)
// }})