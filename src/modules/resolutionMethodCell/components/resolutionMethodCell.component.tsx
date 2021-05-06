import {
    DedupeModel,
    DedupeResolutionMethodValue,
    InternalStatus,
    ResolutionMethodType
} from "../../results/models/dedupe.model";
import {FormControlLabel, RadioGroup, TextField, Typography, withStyles} from "@material-ui/core";
import {CompactRadio} from "../../results/components/compactRadio.component";
import React, {ReactElement} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {getResolutionValue} from "../services/getResolutionValue.service";
import {getAdjustmentValueByMethod} from "../services/getAdjustmentValue.service";
import {NotInterested} from "@material-ui/icons";
import {DedupeType} from "../../menu/models/filters.model";
import {getCrosswalkSumMax} from "../services/getCrosswalkSumMax.service";
import {DedupeTooltip, tooltips} from "../../../text/tooltip.texts";

export type ChangeResolutionMethod = (dedupeId: number, resolvedBy: DedupeResolutionMethodValue) => void;
export type SetResolutionValue = (dedupeId: number, value: number) => void;

const styles = {
    root: {
        marginLeft: 10
    },
    label: {
        fontSize: 13
    },
    methodLabel:{
        fontWeight: 200
    }
}

const useStyles = makeStyles({
    label: {
        fontSize: 13
    },
    customLabel: {
        fontSize: 13
    }
});

function RadioLabel(props) {
    const classes = useStyles();
    return <FormControlLabel {...props} classes={{label: classes.label}}/>
}

function onResolutionChange(dedupe: DedupeModel, resolutionMethod: ResolutionMethodType, changeResolutionMethod: ChangeResolutionMethod) {
    let resolutionValue = getResolutionValue(dedupe, resolutionMethod);
    changeResolutionMethod(dedupe.meta.internalId, {
        resolutionMethod,
        resolutionValue,
        deduplicationAdjustmentValue: getAdjustmentValueByMethod(dedupe, resolutionMethod)
    });
}


const SmallTextField = withStyles({
    root: {
        '& .MuiInputBase-input': {
            padding: 5,
            fontSize: 13,
            width: 50
        },
        '& input:valid + fieldset': {},
        '& input:invalid + fieldset': {},
        '& input:valid:focus + fieldset': {},
    },
})(TextField);

function SetCustomValue({value, setValue, visible, dedupeType}:{
    value: number,
    setValue: (value: number) => void,
    visible: boolean,
    dedupeType:DedupeType
}) {
    const classes = useStyles();
    return <DedupeTooltip title={tooltips[dedupeType.toLowerCase()].custom} enterDelay={1500}>
        <span>
        <Typography className={classes.customLabel}>Custom</Typography>
            {visible && <SmallTextField
                variant="outlined"
                type="number"
                size='small'
                value={value !== null ? value : ''}
                onChange={(event) => setValue(parseInt(event.target.value))}
                inputProps={{'data-testid': 'resolution_custom_input'}}
            />}
        </span>
    </DedupeTooltip>
}

function MethodLabel({method, value, dedupeType}: { method: ResolutionMethodType, value: number, dedupeType:DedupeType}): ReactElement {
    let methodName;
    switch (method) {
        case ResolutionMethodType.maximum:
            methodName = 'Max';
            break;
        case ResolutionMethodType.sum:
            methodName = 'Sum';
            break;
    }
    return <DedupeTooltip title={tooltips[dedupeType.toLowerCase()][method]} enterDelay={1500}>
        <Typography style={styles.label}>{methodName}&nbsp;<span style={styles.methodLabel}>({value})</span></Typography>
    </DedupeTooltip>
}

const ResolutionNa = ()=><div style={{textAlign:'center', opacity: 0.2}}>
    <NotInterested/>
</div>

export function ResolutionMethodCell({dedupe, changeResolutionMethod, setResolutionValue}: {dedupe: DedupeModel, changeResolutionMethod: ChangeResolutionMethod, setResolutionValue: SetResolutionValue}) {
    if (dedupe.status===InternalStatus.unresolvableCrosswalk) return <ResolutionNa/>;
    let resolutionSum = dedupe.resolution.availableValues.sum;
    let resolutionMax = dedupe.resolution.availableValues.maximum;
    if (dedupe.meta.dedupeType===DedupeType.crosswalk) {
        let {sum, max} = getCrosswalkSumMax(dedupe.duplicates);
        resolutionSum = sum;
        resolutionMax = max;
    }
    // @ts-ignore
    let resolutionId = dedupe.meta.internalId;
    return <RadioGroup
        style={styles.root}
        value={dedupe.resolution.resolutionMethodValue && dedupe.resolution.resolutionMethodValue.resolutionMethod}
        onChange={(event) => onResolutionChange(dedupe, event.target.value as ResolutionMethodType, changeResolutionMethod)}>
        <RadioLabel value="maximum" control={<CompactRadio testId={`resolution_${resolutionId}_maximum`}/>}
                    label={<MethodLabel method={ResolutionMethodType.maximum} value={resolutionMax} dedupeType={dedupe.meta.dedupeType}/>}/>
        <RadioLabel value="sum" control={<CompactRadio testId={`resolution_${resolutionId}_sum`} />}
                    label={<MethodLabel method={ResolutionMethodType.sum} value={resolutionSum} dedupeType={dedupe.meta.dedupeType}/>}/>
        <RadioLabel value="custom" control={<CompactRadio testId={`resolution_${resolutionId}_custom`}/>}
                    label={<SetCustomValue
                        dedupeType={dedupe.meta.dedupeType}
                        value={dedupe.resolution.resolutionMethodValue && dedupe.resolution.resolutionMethodValue.resolutionValue}
                        setValue={(value) => setResolutionValue(dedupe.meta.internalId, value)}
                        visible={dedupe.resolution.resolutionMethodValue && dedupe.resolution.resolutionMethodValue.resolutionMethod === ResolutionMethodType.custom}
                    />}
        />
    </RadioGroup>
}