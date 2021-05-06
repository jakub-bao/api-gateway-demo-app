import React from "react";
import {render} from "react-dom";
import {baseUrl, networkCheckInterval, networkCheckTimeoutS} from "./sharedModules/shared/services/config.service";
import ThemeWrapper from "./sharedModules/boot/components/themeWrapper.component";
import "./index.css";
import {Provider} from "@dhis2/app-runtime";
import {HeaderBar} from '@dhis2/ui'
import {Main} from "./modules/main/components/main.component";

export function Index(){
    return <Provider config={{baseUrl: baseUrl, apiVersion: 33}}>
        <div id='dhis2HeaderBar'>
            <HeaderBar/>
        </div>
        <ThemeWrapper>
            <Main/>
        </ThemeWrapper>
        <br/>
    </Provider>;
}

render(<Index/>, document.getElementById('root'));
