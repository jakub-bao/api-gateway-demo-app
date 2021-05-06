import {getData} from "@dhis2-app/api";

export function getOrgUnitId():Promise<string>{
    return getData('/me?fields=organisationUnits[id]')
        .then(response=>response.organisationUnits[0].id)
}