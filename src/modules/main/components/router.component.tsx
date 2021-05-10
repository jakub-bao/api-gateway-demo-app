import React from "react";
import {HashRouter as ReactRouter, Switch, Route} from "react-router-dom";
import {Main} from "./main.component";

export default function Router() {
    return <ReactRouter>
        <Switch>
            <Route path="/cors">
                cors
            </Route>
            <Route path="/redirect">
                redirect
            </Route>
            <Route path="/">
                <Main/>
            </Route>
        </Switch>
    </ReactRouter>;
}