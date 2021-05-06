import {DuplicateModel} from "../../results/models/dedupe.model";

export function countCrosswalkSumMax({dsd,ta}:{dsd:number, ta:number}):{max:number, sum:number}{
    if(dsd===null||ta===null) throw new Error(`Can't detect dsd/ta. Received: ${dsd}, ${ta}`);
    let max:number;
    if (ta-dsd<0) max = 0;
    else max = ta-dsd;
    return {max,sum:ta};
}

export function getCrosswalkSumMax(duplicates:DuplicateModel[]):{max:number, sum:number}{
    let dsd = duplicates.filter(d=>d.agencyName==='DSD Value')[0].value;
    let ta = duplicates.filter(d=>d.agencyName!=='DSD Value')[0].value;
    return countCrosswalkSumMax({dsd,ta});
}