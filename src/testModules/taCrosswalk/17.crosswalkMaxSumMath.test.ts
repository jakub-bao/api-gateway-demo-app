import {countCrosswalkSumMax} from "../../modules/resolutionMethodCell/services/getCrosswalkSumMax.service";

test(`17 > Croswwalk Max/Sum Math`, ()=>{
    expect(countCrosswalkSumMax({dsd: 70010, ta: 89000})).toStrictEqual({max: 18990, sum: 89000});
    expect(countCrosswalkSumMax({ta: 70010, dsd: 89000})).toStrictEqual({max: 0, sum: 70010})
    expect(countCrosswalkSumMax({dsd: 89000, ta: 89000})).toStrictEqual({max: 0, sum: 89000})
    expect(countCrosswalkSumMax({dsd: 1, ta: 2000})).toStrictEqual({max: 1999, sum: 2000})
    expect(countCrosswalkSumMax({dsd: 2000, ta: 1})).toStrictEqual({max: 0, sum: 1})
});

test(`17 > Crosswalk math from duplicate list`, ()=>{

});