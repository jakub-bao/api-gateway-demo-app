import React, {CSSProperties} from "react";
import {Button, Typography} from "@material-ui/core";
import {Link, Route, Switch} from "react-router-dom";
import {ArrowBack} from "@material-ui/icons";

const styles = {
    title: {
        fontWeight: 300,
        marginBottom: 30,
        display: 'inline-block',
        fontSize: 24,
        color: 'black'
    } as CSSProperties,
    subtitle: {
        fontWeight: 300,
        marginBottom: 30,
        display: 'inline-block',
        fontSize: 20,
        color: 'gray'
    } as CSSProperties,
    back: {
        float: 'right'
    } as CSSProperties
}

export default function Heading({}:{}) {
    return <React.Fragment>
        <Switch>
            <Route path={["/cors",'/nginxredirect']}>
                <Link to='/'>
                    <Button
                        size="large"
                        style={styles.back}
                        startIcon={<ArrowBack />}
                    >
                        Back
                    </Button>
                </Link>
            </Route>
        </Switch>
        <Link to='/'><Typography style={styles.title}>API Gateway access demo app</Typography></Link>
        &nbsp;|&nbsp;
        <Typography style={styles.subtitle}>
            <Switch>
                <Route path="/cors">
                    Cross-Origin Request
                </Route>
                <Route path="/nginxredirect">
                    Nginx Redirect
                </Route>
                <Route path="/">
                    Main Menu
                </Route>
            </Switch>
        </Typography>
    </React.Fragment>
}