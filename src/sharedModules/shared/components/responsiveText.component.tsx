import React from "react";

function ResponsiveText({short,long, cutoff}:{short:string|React.ComponentElement<any, any>, long:string|React.ComponentElement<any, any>, cutoff:number}) {
    let hash;
    if (typeof long == 'string') hash = long.replace(/[^A-z0-9]/,'');
    else hash = 'xxx';
    return <React.Fragment>
        <style type="text/css" scoped>
            {`
                .responsiveLong_${hash}{display: none;}
                .responsiveShort_${hash}{display: block;}    
                @media (min-width: ${cutoff}px) {
                    .responsiveLong_${hash}{display: block;}
                    .responsiveShort_${hash}{display: none;}
                }
            `}
        </style>
        <span className={`responsiveShort_${hash}`}>{short}</span>
        <span className={`responsiveLong_${hash}`}>{long}</span>
    </React.Fragment>
}

export default React.memo(ResponsiveText);