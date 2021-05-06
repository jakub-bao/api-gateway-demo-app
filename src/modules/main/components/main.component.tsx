import React, {CSSProperties} from "react";
import Loading from "../../../sharedModules/shared/components/loading.component";
import NetworkError from "../../../sharedModules/boot/components/networkError.component";
import {baseUrl} from "../../../sharedModules/shared/services/config.service";
import {apiInit} from "@dhis2-app/api";
import {registerDevMethod, DevTools} from "@dhis2-app/dev-tools";
import {Grid, Typography} from "@material-ui/core";
import PageLink from "./pageLink.component";

apiInit(baseUrl,process.env.NODE_ENV);

const styles = {
    root:{
        margin: '20px auto',
        width:1024
    } as CSSProperties,
    title: {
        fontWeight: 300,
        marginBottom: 80
    } as CSSProperties
};

export class Main extends React.Component<{},{}> {
    constructor(props) {
        super(props);
    }
    render() {
        return <div style={styles.root}>
            <Typography variant='h5' style={styles.title}>API Gateway demo app</Typography>
            <Grid container justify='center' spacing={10}>
                <PageLink
                    title="Prototype #1"
                    keyword='CORS'
                    subtitle="Direct request from client"
                    backgroundColor='#FF1053'
                />
                <PageLink
                    title="Prototype #2"
                    keyword='Redirect'
                    subtitle="Server-side redirect"
                    backgroundColor='#379634'
                />
            </Grid>
            <DevTools buildName='First version 0.0.1' buildDate={new Date()}/>
        </div>;
    }
}

