import {DuplicateModel} from "../models/dedupe.model";
import React, {CSSProperties} from "react";
import {Table, TableBody, TableCell, TableRow, Tooltip, withStyles} from "@material-ui/core";
import ResponsiveText from "../../../sharedModules/shared/components/responsiveText.component";
import {NotInterested} from "@material-ui/icons";

const styles = {
    root:{
        height: '100%'
    } as CSSProperties,
    col0:{width:'15%'},
    col1:{width:'25%'},
    col2:{width:'45%'},
    col3:{width:'15%'}
}

export const ColWidths = ()=> <colgroup>
    <col span={1} style={styles.col0}/>
    <col span={1} style={styles.col1}/>
    <col span={1} style={styles.col2}/>
    <col span={1} style={styles.col3}/>
</colgroup>

const Row = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const Cell = withStyles(()=>({
    root:{
        borderBottom: 0,
        padding: 7,
        borderRight: `1px solid rgba(0,0,0,0.08)`,
        fontSize: 13,
        '&:last-child':{
            paddingRight: 7,
            borderRight: 0
        }
    }
}))(TableCell);

function ExpandableCell({value,prime}:{value:string,prime:boolean}){
    if (!['DSD Value','TA Value'].includes(value)) return <Cell>{value}</Cell>;
    if (value==='DSD Value') value = 'Corresponding DSD Value';
    if (!prime) return null;
    return <Cell colSpan={3} style={{textAlign: 'center'}}>{value}</Cell>
}

const unresolvedStyle = {textAlign:'center', opacity: 0.2} as CSSProperties;
const Unresolved = <ResponsiveText cutoff={1300} long={'unresolved'} short={<div style={unresolvedStyle}><Tooltip title={'Pure dedupe not resolved'}>
    <NotInterested/>
</Tooltip></div>}/>

function Value({duplicate}:{duplicate:DuplicateModel}){
    return <Row>
        <ExpandableCell value={duplicate.mechanismNumber} prime={true}/>
        <ExpandableCell value={duplicate.agencyName} prime={false}/>
        <ExpandableCell value={duplicate.partnerName} prime={false}/>
        <Cell style={{textAlign: 'center'}}>{duplicate.value===null?Unresolved:duplicate.value}</Cell>
    </Row>
}

function _DuplicateList({duplicates}:{duplicates:DuplicateModel[]}){
    return <Table size="small" style={styles.root}>
        <ColWidths/>
        <TableBody>
            {duplicates.map((duplicate:DuplicateModel)=><Value duplicate={duplicate} key={duplicate.mechanismNumber}/>)}
        </TableBody>
    </Table>
}

export const DuplicateList = React.memo(_DuplicateList);