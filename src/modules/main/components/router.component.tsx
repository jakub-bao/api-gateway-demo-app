import React, {CSSProperties} from "react";
import {HashRouter as ReactRouter, Route, Switch} from "react-router-dom";
import {Main} from "./main.component";
import CrossOriginRequest from "../../crossOriginRequest/crossOriginRequestPage.component";
import Heading from "./heading.component";
import NgingxRedirectPage from "../../nginxRedirect/ngingxRedirectPage.component";
import HRHPage from "../../hrh/hrhPage.component";

const styles = {
    root:{
        margin: '20px auto',
        width:900,
        padding: '0px 30px'
    } as CSSProperties
};

export default function Router() {
    return <div style={styles.root}>
        <ReactRouter>
            <Heading/><br/>
            <Switch>
                <Route path="/cors">
                    <CrossOriginRequest/>
                </Route>
                <Route path="/nginxRedirect">
                    <NgingxRedirectPage/>
                </Route>
                <Route path="/hrh">
                    <HRHPage/>
                </Route>
                <Route path="/">
                    <Main/>
                </Route>
            </Switch>
        </ReactRouter>
    </div>
}