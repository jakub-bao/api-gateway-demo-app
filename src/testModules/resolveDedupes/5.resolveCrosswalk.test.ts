import {DedupeTestCase} from "../shared/models/test.models";
import {checkCustomValue, searchDedupes} from "../shared/sharedBasics.testService";
import {registerSendMock} from "@dhis2-app/api";
import {FilterDedupeStatus} from "../../modules/menu/models/filters.model";
import {click, text, textsWait, typeWait} from "@dhis2-app/test-tools";

const CameroonTestCase:DedupeTestCase = {
    testAs: 'test-de-superAdmin',
    name: `Cameroon > MER Results > 2020 Q4`,
    filters: {
        operatingUnit: 'Cameroon',
        dataType: 'MER Results',
        period: 'Oct - Dec 2020',
        status: FilterDedupeStatus.resolvedAndUnresolved,
        crosswalk: true
    },
    expectedTokens: [
        'VMMC_CIRC (N, TA, Age/Sex/HIVStatus): Voluntary Circumcised',
        '20-24, Positive, Male',
        'CMA de Songkolong',
        'HHS/CDC',
        'Ready to resolve','70020','70010','(10)','(70020)'
    ],
    resolved: null,
};

test(`5 > Resolve Crosswalk Dedupes > Cameroon`, async ()=>{
    await searchDedupes(CameroonTestCase);
    // switchToCustom(1);
    click(`resolution_${1}_custom`);
    checkCustomValue(70020)
    await typeWait('resolution_custom_input', '70080');
    checkCustomValue(70080);
    registerSendMock('POST','/dataValues', {ok:true},(data:any)=>{
        expect(data).toBe('de=TiMvlchPiPH&co=pWaGXt8b4rt&ou=Qxqy3OnMtLi&pe=2020Q4&value=-69950&cc=wUpfppgjEza&cp=OM58NubPbx1');
    });
    click(`dedupe_1_resolve`);
    text('Processing...');
    await textsWait(['1 dedupe successfully resolved','Resolved on server']);
    checkCustomValue(70080);
});