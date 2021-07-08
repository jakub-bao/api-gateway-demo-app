import React, {CSSProperties} from "react";
import {baseUrl} from "../../../sharedModules/shared/services/config.service";
import {apiInit} from "@dhis2-app/api";
import {DevTools} from "@dhis2-app/dev-tools";
import PageLink from "./pageLink.component";

apiInit(baseUrl,process.env.NODE_ENV);

export class Main extends React.Component<{},{}> {
    constructor(props) {
        super(props);
    }
    render() {
        return <React.Fragment>
                <PageLink
                    title="Prototype #1"
                    keyword='CORS'
                    subtitle="Direct request from client"
                    backgroundColor='#FF1053'
                    style={{display: 'inline-block'} as CSSProperties}
                />
                <PageLink
                    title="Prototype #2"
                    keyword='NginxRedirect'
                    subtitle="Server-side redirect through nginx"
                    backgroundColor='#379634'
                    style={{display: 'inline-block', marginLeft: '100px'} as CSSProperties}
                />
                <PageLink
                    title="Prototype #3"
                    keyword='HRH'
                    subtitle="Example of HRH api functionality"
                    backgroundColor='#379634'
                    style={{display: 'inline-block', marginLeft: '100px'} as CSSProperties}
                />
            <DevTools buildName='First version 0.0.1' buildDate={new Date()}/>
        </React.Fragment>;
    }
}

