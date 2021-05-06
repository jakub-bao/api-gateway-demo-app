import {DedupeTestCase} from "../shared/models/test.models";
import {FilterDedupeStatus} from "../../modules/menu/models/filters.model";
import {searchDedupes} from "../shared/sharedBasics.testService";

const MalawiTaCrosswalk:DedupeTestCase = {
    testAs: 'test-de-superAdmin',
    name: `Malawi > TA Crosswalk`,
    filters: {
        operatingUnit: 'Malawi',
        dataType: 'MER Results',
        period: 'Oct - Dec 2020',
        status: FilterDedupeStatus.resolvedAndUnresolved,
        crosswalk: true
    },
    expectedTokens: [
        'HTS_TST (N, TA, KeyPop/Result): HTS received results',
        'PWID, Positive',
        'Dowa District',
        'Corresponding DSD Value', 'TA Value',
        'Unresolvable crosswalk','11010'
    ],
    resolved: null,
};

test(`16 > Resolve Crosswalk Dedupes > Malawi`, async ()=>{
    await searchDedupes(MalawiTaCrosswalk);
});