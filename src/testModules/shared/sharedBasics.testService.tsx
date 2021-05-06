import Main from "../../modules/main/components/main.component";
import React from "react";
import {DedupeTestCase} from "./models/test.models";
import {fireEvent, screen} from "@testing-library/react";
import {SnackbarProvider} from "notistack";
import {FilterDedupeStatus} from "../../modules/menu/models/filters.model";
import {
    click,
    exist,
    loadingDone,
    notExist,
    noTextIn,
    renderComponent,
    select,
    textIn,
    texts
} from "@dhis2-app/test-tools";
import {testAs} from "@dhis2-app/api";

export async function renderMain(){
    return await renderComponent(<SnackbarProvider><Main/></SnackbarProvider>,['Dedupe Type *', 'Operating Unit *']);
}

export async function searchDedupes(testCase:DedupeTestCase){
    testAs(testCase.testAs);
    await renderMain();
    if (testCase.filters.crosswalk) await select(`filter_dedupeType`,'Crosswalk Dedupes');
    ['operatingUnit','dataType','period'].forEach((filter:string)=>{
        select(`filter_${filter}`,testCase.filters[filter]);
    });
    if (testCase.filters.status===FilterDedupeStatus.resolvedAndUnresolved) await select('filter_status','Include resolved');
    click('searchDedupes');
    await loadingDone(240);
    texts(testCase.expectedTokens);
}

export function switchToCustom(index:number){
    notExist('resolution_custom_input');
    noTextIn(`status_${index}`, 'Ready to resolve');
    click(`resolution_${index}_custom`);
    textIn(`status_${index}`, 'Ready to resolve');
    exist('resolution_custom_input');
}

export function checkStatus(index:number, status:string){
    textIn(`status_${index}`, status);
}

function asInp(el:Element):HTMLInputElement{
    return el as HTMLInputElement;
}


export const checkCustomValue = (customValue:number)=>expect(asInp(screen.getByTestId('resolution_custom_input')).value).toBe(customValue.toString());

export const switchToBatch = ()=>{
    click('menu_tab_batch');
    texts(['Select everything']);
}

export const checkCheckbox = (id:number|string, value:boolean)=>{
    expect(screen.getByTestId(`batch_checkbox_${id}`).querySelector('input').checked).toEqual(value);
};

export const clickCheckbox = (id:number|string)=>{
    fireEvent.click(screen.getByTestId(`batch_checkbox_${id}`).querySelector('input'));
};

export const isDisabled = (id:string)=>expect(screen.getByTestId(id).hasAttribute('disabled')).toBeTruthy();

export const nextPage = ()=>fireEvent.click(document.querySelector('[title="Next Page"] button'));