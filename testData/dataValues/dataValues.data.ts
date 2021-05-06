import {DedupeValueSet} from "@dhis2-app/test-data";

const Rwanda1:DedupeValueSet = {
    orgUnitId: 'TAPALAZae2l',
    dataSet: 'qzVASYuaIey',
    period: '2020Q4',
    dataElement_de: "qhGxKnmrZBd",
    categoryOptionCombo_co: "xYyVHiXrvSi",
    dataValues: [{
        value: 10010,
        categoryOption_cp: 'wXNP2RRZqbj',
    },{
        value: 10030,
        categoryOption_cp: 'xAQyTl7eVuo',
    }]
};

// Pure dedupe, across mechanisms, unresolved
const Rwanda2:DedupeValueSet = {
    orgUnitId: 'TAPALAZae2l',
    dataSet: 'qzVASYuaIey',
    period: '2020Q4',
    dataElement_de: "qhGxKnmrZBd",
    categoryOptionCombo_co: "nEKvoyX7K7X",
    dataValues: [{
        value: 10020,
        categoryOption_cp: 'wXNP2RRZqbj',
    },{
        value: 10040,
        categoryOption_cp: 'xAQyTl7eVuo',
    }]
};

// Pure dedupe, across mechanisms, resolved as sum
const Nigeria1:DedupeValueSet = {
    orgUnitId: 'BY7bSKwPjPJ',
    dataSet: 'qzVASYuaIey',
    period: '2020Q4',
    dataElement_de: 'FI2s716RRZc',
    categoryOptionCombo_co: "inrjeyWelOD",
    dataValues: [{
        value: 20010,
        categoryOption_cp: 'nwyMXmV0vPR',
    },{
        value: 20020,
        categoryOption_cp: 'EqCzVuUpqZW',
    },{
        value: 0,
        categoryOption_cp: 'xEzelmtHWPn',
        isResolution: true
    }]
};

// Pure dedupe, across mechanisms, resolved as max
const Nigeria2:DedupeValueSet = {
    orgUnitId: 'p7M264Wg1qB',
    dataSet: 'qzVASYuaIey',
    period: '2020Q4',
    dataElement_de: "qhGxKnmrZBd",
    categoryOptionCombo_co: "NMYN9FAPqWa",
    dataValues: [{
        value: 30010,
        categoryOption_cp: 'gBvOZlOT7vE',
    },{
        value: 30020,
        categoryOption_cp: 'SnYYwQ0MNdg',
    },{
        value: -30010,
        categoryOption_cp: 'xEzelmtHWPn',
        isResolution: true
    }]
};

const Zambia1:DedupeValueSet = {
    dataSet: 'jKdHXpBfWop',
    orgUnitId: 'ivv9yPgimic',
    period: '2020Q4',
    categoryOption_cp: 'PHHHN8hDekc',
    categoryOptionCombo_co: "a0F1mOe30rp",
    dataValues: [{
        value: 40010,
        dataElement_de: 'RhkU5KjtAi6',
    },{
        value: 40020,
        dataElement_de: 'Jj8qonfbvBA'
    }]
}


const Zambia2:DedupeValueSet = {
    dataSet: 'jKdHXpBfWop',
    orgUnitId: 'ivv9yPgimic',
    period: '2020Q4',
    categoryOptionCombo_co: "eD7hpv3uU9Q",
    dataValues: [{
        value: 50010,
        categoryOption_cp: 'ddfsp55f4jN',
        dataElement_de: 'cRCw63EQEbM',
    },{
        value: 50020,
        categoryOption_cp: 'k6dOaAE6oWj',
        dataElement_de: 'TiMvlchPiPH'
    }]
};

const Botswana:DedupeValueSet = {
    dataSet: 'qzVASYuaIey',
    orgUnitId: 'gGqaAXuUGpb',
    period: '2020Q4',
    categoryOptionCombo_co: "xYyVHiXrvSi",
    dataElement_de: 'qhGxKnmrZBd',
    dataValues: [{
        value: 60010,
        categoryOption_cp: 'eE1lo7cjSwe',
    },{
        value: 60020,
        categoryOption_cp: 'iRbiBYQuiNZ',
    },{
        value: 60030,
        categoryOption_cp: 'peOpZPZyPaf',
    }]
};


const Cameroon:DedupeValueSet = {
    dataSet: 'jKdHXpBfWop',
    orgUnitId: 'Qxqy3OnMtLi',
    period: '2020Q4',
    categoryOptionCombo_co: "pWaGXt8b4rt",
    categoryOption_cp: 'gSrW64Ru7Ia',
    dataValues: [{
        value: 70010,
        dataElement_de: 'cRCw63EQEbM',
    },{
        value: 70020,
        dataElement_de: 'TiMvlchPiPH',
    }]
};

const Ethiopia:DedupeValueSet = {
    dataSet: 'qzVASYuaIey',
    orgUnitId: 'Dl0yK0OhftZ',
    period: '2020Q4',
    categoryOptionCombo_co: "xYyVHiXrvSi",
    dataValues: [{
        value: 80010,
        dataElement_de: 'qhGxKnmrZBd',
        categoryOption_cp: 'Mc2Hbha1xD6',
    },{
        value: 80020,
        dataElement_de: 'kt5rPumWUBE',
        categoryOption_cp: 'IlCRnjpyBAl',
    }]
};

const Lesotho:DedupeValueSet = {
    orgUnitId: 'qN2HRbLDMdt',
    dataSet: 'TBcmmtoaCBC',
    period: '2020Q4',
    categoryOptionCombo_co: "xYyVHiXrvSi",
    dataValues: [{
        value: 90010,
        dataElement_de: 'qhGxKnmrZBd',
        categoryOption_cp: 'wjhyEIu2Vtx',
    },{
        value: 90020,
        dataElement_de: 'kt5rPumWUBE',
        categoryOption_cp: 'wjhyEIu2Vtx',
    },{
        value: 90030,
        dataElement_de: 'qhGxKnmrZBd',
        categoryOption_cp: 'M2ciDvXFLUD',
    }]
}

/*
-- de: kt5rPumWUBE
-- co: xYyVHiXrvSi
--ds: TBcmmtoaCBC
--ou: zphK9WV8JB4
-- pe: 2020Q4
value: 11
cc: wUpfppgjEza
cp: tx3y6qzjqBJ
* */

/*
de: kt5rPumWUBE
co: xYyVHiXrvSi
ds: TBcmmtoaCBC
ou: zphK9WV8JB4
pe: 2020Q4
value: 22
cc: wUpfppgjEza
cp: vAXc48ujKRD
 */

/*
* de: qhGxKnmrZBd
co: xYyVHiXrvSi
--ds: TBcmmtoaCBC
--ou: zphK9WV8JB4
--pe: 2020Q4
--value: 11030
--cc: wUpfppgjEza
cp: tx3y6qzjqBJ
*
* */

const MalawiPure:DedupeValueSet = {
    orgUnitId: 'zphK9WV8JB4',
    dataSet: 'TBcmmtoaCBC',
    period: '2020Q4',
    dataElement_de: "kt5rPumWUBE",
    categoryOptionCombo_co: "xYyVHiXrvSi",
    dataValues: [{
        value: 11010,
        categoryOption_cp: 'tx3y6qzjqBJ',
    },{
        value: 11020,
        categoryOption_cp: 'vAXc48ujKRD',
    }]
};

const MalawiCrosswalk:DedupeValueSet = {
    orgUnitId: 'zphK9WV8JB4',
    dataSet: 'TBcmmtoaCBC',
    period: '2020Q4',
    dataElement_de: "qhGxKnmrZBd",
    categoryOptionCombo_co: "xYyVHiXrvSi",
    dataValues: [{
        value: 11010,
        categoryOption_cp: 'tx3y6qzjqBJ',
    }]
};

export const dedupeValueSets:DedupeValueSet[] = [Nigeria1,Nigeria2,Rwanda1,Rwanda2,Zambia1,Zambia2,Botswana, Cameroon, Ethiopia, Lesotho, MalawiPure, MalawiCrosswalk];
// export const dedupeValueSets = [MalawiPure,MalawiCrosswalk];