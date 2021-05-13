import React from "react";
import SolutionTemplate from "../solutionPage/components/solutionTemplate.component";
import InfoSection from "../solutionPage/components/infoSection.component";
import {Typography} from "@material-ui/core";
import {Info} from "@material-ui/icons";

export default class CrossOriginRequest extends React.Component<{},{}> {
  render() {
    return <SolutionTemplate>
        <InfoSection>
            <Typography variant='h5'>Outcome</Typography>
            <Typography>
                REACT app cannot access session cookie issued by DHIS2 (JSESSIONID)<br/>
                The cookie is marked as HttpOnly=true. Therefore it is hidden to JavaScript client.
            </Typography>
        </InfoSection>
        <InfoSection>
            <Typography>{'Chrome > DevTools > Cookies > JSESSIONID > HttpOnly'}</Typography><br/>
            <img src='img/httpOnlyChrome.png' width='750px'/>
        </InfoSection>
        <InfoSection>
            <Typography>{'Listing all available cookies inside JavaScript via `document.cookie`'}</Typography>
            <img src='img/documentCookieLength.png'/>
        </InfoSection>
        <InfoSection>
            <Typography>{'Explanation of HttpOnly cookie parameter from `developer.mozilla.org`'}</Typography>
            <img src='img/httpOnlyDevzilla.png' width='750px'/>
            <Typography>source: <a href={'https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#restrict_access_to_cookies'}>https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#restrict_access_to_cookies</a></Typography>
        </InfoSection>
    </SolutionTemplate>;
  }
}