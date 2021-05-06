import {FdTestCase, testCases} from "./2.fetchDedupes.testCases";
import fetchDedupes from "../../modules/results/services/dedupeDataProvider.service";
import {apiInit, testAs} from "@dhis2-app/api";
import {DedupeModel} from "../../modules/results/models/dedupe.model";
import {baseUrl} from "../../sharedModules/shared/services/config.service";

function cleanDedupes(dedupes:DedupeModel[]):DedupeModel[]{
    return dedupes.map(d=>{
        delete d.tableData;
        d.duplicates = d.duplicates.sort((a,b)=>a.mechanismNumber>b.mechanismNumber?1:-1);
        return d;
    });
}

function fetchDedupesTest(testCase:FdTestCase){
    test(`2 > Fetch Dedupes > ${testCase.name}`, async ()=>{
        testAs(testCase.testAs);
        let dedupes = await fetchDedupes(testCase.selectedFilters);
        expect(cleanDedupes(dedupes)).toStrictEqual(cleanDedupes(testCase.dedupes));
    });
}

testCases.forEach(fetchDedupesTest);