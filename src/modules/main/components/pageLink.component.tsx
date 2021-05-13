import React, {CSSProperties} from "react";
import {Divider, Paper, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";

const styles = {
    root: {
        margin: '0px 80px'
    },
    paper: {
        width: 200,
        height: 300,
        position: 'relative',
        cursor: 'pointer'
    } as CSSProperties,
    title: {
        fontWeight: 500,
        marginBottom: -5
    },
    subtitle: {
        marginTop: 150,
        position: 'absolute',
        bottom: 10
    } as CSSProperties,
    keyword: {
        color: 'white',
        textAlign: 'center',
        position: 'relative',
        top: 90,
        fontSize: 25
    } as CSSProperties
}

export default function PageLink({title, subtitle, backgroundColor, keyword, ...props}:{
    title:string,
    subtitle:string,
    backgroundColor:string,
    keyword: string,
    style:any
}) {
        return <Link to={`/${keyword.toLowerCase()}`} {...props}>
            <Paper style={Object.assign({},styles.paper, {backgroundColor})}>
                <Typography style={styles.title}>{title}</Typography>
                <Divider/>
                <Typography style={styles.keyword}>{keyword}</Typography>
                <Typography style={styles.subtitle}>{subtitle}</Typography>
            </Paper>
        </Link>
}