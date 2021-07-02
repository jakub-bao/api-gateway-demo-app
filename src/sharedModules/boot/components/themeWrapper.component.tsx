import React, {CSSProperties} from "react";
import {ThemeProvider} from "@material-ui/styles";
import {createGenerateClassName, createMuiTheme, StylesProvider} from "@material-ui/core/styles";

import "../css/themeWrapper.component.css";
import {colors} from "../../../values/color.values";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: colors.primaryDatim
        },
        secondary: {
            main: 'rgb(156, 13, 56)'
        },
        error:{
            main: '#D72638'
        }
    },
});

const styles = {
    wrapper: {
        margin: 0,
        position: 'relative',
        top: 48
    } as CSSProperties
};

const generateClassName = createGenerateClassName({
    productionPrefix: 'withStyles',
});

export default function ThemeWrapper({children}) {
    return (
        <StylesProvider generateClassName={generateClassName}>
        <ThemeProvider theme={theme}>
            <div style={styles.wrapper}>
                {children}
            </div>
        </ThemeProvider>
        </StylesProvider>
    );
}