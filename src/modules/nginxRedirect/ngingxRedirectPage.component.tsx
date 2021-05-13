import React from "react";
import SolutionTemplate from "../solutionPage/components/solutionTemplate.component";
import InfoSection from "../solutionPage/components/infoSection.component";
import {Typography} from "@material-ui/core";

export default function NgingxRedirectPage(){
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
            <Typography variant='h5'>JSESSIONID cookie received by server</Typography>
            <Typography>
                <ol>
                    <li>The app sends an HTTP GET request to https://jakub.datim.org/apiGateway</li>
                    <li>The server should be able to extract JSESSIONID cookie from the request headers and send it back</li>
                </ol>
            </Typography>
        </InfoSection>
    </SolutionTemplate>;
}