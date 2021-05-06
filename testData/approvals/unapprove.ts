import {catOptionToCatOptionCombo, getLevel3Ou, recallMechToPartner} from "@dhis2-app/test-data";
import {dedupeValueSets} from "../dataValues/dataValues.data";

const query = {approvals:[{aoc:null, ou:null}], pe: ['2020Q4'], wf: []};
dedupeValueSets.forEach(dedupe=>{
    dedupe.dataValues.forEach(async dv=>{
        let ou = await getLevel3Ou(dedupe.orgUnitId);
        let aoc = await catOptionToCatOptionCombo(dv.categoryOption_cp||dedupe.categoryOption_cp);
        const query = {approvals:[{aoc:aoc, ou:ou}], pe: ['2020Q4'], wf: ['RwNpkAM7Hw7']};
        recallMechToPartner(query);
    });
});