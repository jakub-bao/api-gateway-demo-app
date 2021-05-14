import React, {CSSProperties, useState} from "react";
import SolutionTemplate from "../solutionPage/components/solutionTemplate.component";
import InfoSection from "../solutionPage/components/infoSection.component";
import {Button, Typography} from "@material-ui/core";

const styles = {
    report: {
        display: 'inline-block'
    } as CSSProperties
}

async function connect(setCookie:(cookie:string)=>void):Promise<void>{
    let response = await fetch('/apiGateway').then(r=>r.json());
    setCookie(response.cookies);
}

export default function NgingxRedirectPage(){
    let [cookie,setCookie] = useState(null);
    return <SolutionTemplate>
        <InfoSection>
            <Typography variant='h5'>Process</Typography>
            <Typography>
                <ol>
                    <li>The app sends an HTTP GET request to https://jakub.datim.org/apiGateway</li>
                    <li>The server should be able to extract JSESSIONID cookie from the request headers and send it back</li>
                </ol>
            </Typography>
        </InfoSection>

        <InfoSection>
            <Typography variant='h5'>Test</Typography>
            <br/>
            <Button variant="contained" color="secondary" size='small' onClick={()=>connect(setCookie)}>
                Reach API Gateway
            </Button>
            {cookie&&<Typography style={styles.report}>API Gateway received the following cookies</Typography>}
        </InfoSection>
    </SolutionTemplate>;
}