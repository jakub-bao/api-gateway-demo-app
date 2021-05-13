import React from "react";
import {Card, CardContent} from "@material-ui/core";

const styles = {
    root: {
        width: 800,
        marginBottom: 20
    }
}

export default function InfoSection({children}:{children:any}) {
    return <Card style={styles.root}>
        <CardContent>
            {children}
        </CardContent>
    </Card>;
}