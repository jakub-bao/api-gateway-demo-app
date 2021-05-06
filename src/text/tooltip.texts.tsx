import React from "react";
import {Tooltip, withStyles} from "@material-ui/core";

const style = {
    fontSize: 14,
    fontWeight: 300,
    lineHeight: 1.3
}


export const DedupeTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: '#f3f3f3',
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 350,
        fontSize: theme.typography.pxToRem(14),
        fontWeight: 400,
        border: '1px solid rgba(0, 0, 0, 0.87)',
    },
}))(Tooltip);

const Method = ({children})=><span style={{fontWeight: 600}}>{children}</span>;
const Number = ({children})=><span style={{fontWeight: 600}}>{children}</span>;



const pureResolution = <span>In this column, select the best way to resolve the potential duplicates that have been flagged by DATIM.<br/><br/><i>Hover over each option for a description of what it does.</i></span>

const pureMax = <span>This resolution uses the largest data value submitted between the implementing partners for the indicator. By selecting <Method>Max</Method>, you are indicating that all values are duplicated between both partners.<br/>
<br/>
<b>Example:</b> Partner A tested <Number>5</Number> clients for HIV. Partner B tested <Number>2</Number> clients for HIV at the same site. Using Max means there was a reporting duplication and only a total of <Number>5</Number> clients were tested at this site.
</span>

const pureSum = <span>This resolution sums all values entered by both implementing partners. By selecting <Method>Sum</Method>, you are indicating that no values are duplicated between both partners.<br/>
<br/>
    <b>Example:</b> Partner A circumcised <Number>3</Number> clients and Partner B circumcised <Number>7</Number> clients at the same site. Using <Method>Sum</Method> means the final value should be <Number>10 (7+3=10)</Number>, since the partners did not (and could not have) circumcised the same client twice.
</span>

const pureCustom = <span>This resolution allows you to manually enter a Custom value for the indicator to resolve the duplicate. The value cannot be less than the Max data value nor exceed the Sum of the entered values. By selecting <Method>Custom</Method>, you are indicating that some but not all values are duplicated between both partners.<br/>
<br/>
<b>Example:</b> Partner A enrolled <Number>8</Number> pregnant women on ART. Partner B enrolled <Number>3</Number> Female Sex Workers (FSW) on ART at the same site. However, one FSW was pregnant, and she was served by both partners. Using a <Method>Custom</Method> value of <Number>10</Number> indicates this partial overlap between partners' services.</span>;



const cwResolution = <span>In this column, select the best way to resolve the potential duplicates between DSD and TA that have been flagged by DATIM.<br/><br/><i>Hover over each option for a description of what it does.</i></span>

const cwMax = <span>This resolution changes the final technical assistance (TA) value so that it overlaps as much as possible with the direct service delivery (DSD) value.<br/>
<br/>
    <b>Example:</b> Partner A tested <Number>5</Number> clients for HIV. Partner B provided technical assistance for testing <Number>2</Number> clients for HIV at the same site. Using <Method>Max</Method> means there was a reporting duplication, so that the final TA value should be <Number>0</Number> (reflecting that <Number>5</Number> clients were served in total).<br/>
<br/>
<i>This is the default resolution. Most crosswalk dedupes should be resolved this way.</i></span>;

const cwSum = <span>This resolution leaves the final technical assistance (TA) value unadjusted, indicating that no values overlap between TA and direct service delivery (DSD).<br/>
<br/>
    <b>Example:</b> Partner A circumcised <Number>3</Number> clients and Partner B provided technical assistance for circumcising <Number>7</Number> clients at the same site. Using <Method>Sum</Method> means that the final TA value remains <Number>7</Number>, as none of the technical assistance was related to the delivery of service at this site.<br/>
<br/>
    <i>It is rarely the right approach to resolve a crosswalk dedupe with <Method>Sum</Method>. Please be cautious using this resolution.</i></span>

const cwCustom = <span>This resolution changes the final technical assistance (TA) value to reflect a partial overlap with the direct service delivery (DSD) value. The custom TA value must be between Max and Sum.<br/>
<br/>
<b>Example:</b> Partner A enrolled <Number>8</Number> pregnant women on ART. Partner B provided TA for <Number>3</Number> Female Sex Workers (FSWs) at the same site. However, one FSW was pregnant and she was served by both partners. Using a <Method>Custom</Method> final TA value of <Number>2</Number> indicates that <Number>2</Number> of the TA clients were not covered by DSD (reflecting that <Number>10</Number> clients were served in total).<br/>
<br/>
    <i>It is rarely the right approach to resolve a crosswalk dedupe with <Method>Custom</Method>. Please be cautious using this resolution.</i></span>

export const tooltips = {
    pure: {
        resolution: pureResolution,
        maximum: pureMax,
        sum: pureSum,
        custom: pureCustom
    },
    crosswalk: {
        resolution: cwResolution,
        maximum: cwMax,
        sum: cwSum,
        custom: cwCustom
    }
};