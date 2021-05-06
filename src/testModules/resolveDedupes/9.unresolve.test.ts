import {searchDedupes} from "../shared/sharedBasics.testService";
import {Nigeria1} from "../renderDedupes/3.renderDedupes.testCases";
import {registerSendMock} from "@dhis2-app/api";
import {click, noTextsIn, pause, text, textsIn} from "@dhis2-app/test-tools";


test('9 > Unresolve Dedupe', async ()=>{
    await searchDedupes(Nigeria1);
    textsIn('status_1',['Resolved on server','Unresolve']);
    registerSendMock('DELETE','/dataValues?de=qhGxKnmrZBd&co=NMYN9FAPqWa&ou=p7M264Wg1qB&pe=2020Q4&value=-30010&cc=wUpfppgjEza&cp=xEzelmtHWPn', {ok:true},null);
    click('dedupe_1_unresolve');
    text('Processing...');
    await pause(1);
    text('1 dedupe successfully unresolved');
    noTextsIn('status_1',['Resolved on server']);
    textsIn('status_1',['Unresolved']);
});