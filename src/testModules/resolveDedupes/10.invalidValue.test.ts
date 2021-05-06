import {checkCustomValue, searchDedupes, switchToCustom} from "../shared/sharedBasics.testService";
import {BotswanaTestCase} from "./4.resolveDedupe.test";
import {noTextIn, textIn, typeWait} from "@dhis2-app/test-tools";

test(`10 > Invalid Value`, async ()=>{
    await searchDedupes(BotswanaTestCase);
    switchToCustom(1);
    checkCustomValue(60030)
    await typeWait('resolution_custom_input', '600');
    noTextIn('status_1','Resolve');
    textIn('status_1','Invalid value');
    await typeWait('resolution_custom_input', '60050');
    textIn('status_1','Ready to resolve');
    await typeWait('resolution_custom_input', '600500');
    textIn('status_1','Invalid value');
});