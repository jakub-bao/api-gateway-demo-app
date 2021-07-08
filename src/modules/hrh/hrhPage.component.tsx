import React, { CSSProperties, useState } from "react";
import SolutionTemplate from "../solutionPage/components/solutionTemplate.component";
import InfoSection from "../solutionPage/components/infoSection.component";
import { Button, Typography,Icon } from "@material-ui/core";
import { baseUrl } from "../../sharedModules/shared/services/config.service";
import HRHAPI from "./hrhAPI";

var hrh = null as HRHAPI;

const styles = {
    report: {
    } as CSSProperties
}

async function getToken(setToken: (token: string) => void): Promise<void> {
    let init = {
        method: 'GET', 
        credentials: 'include' as RequestCredentials
    };
    let token = await await fetch(baseUrl + 'pdapsession', init).then(r => r.text())
    setToken(token);
    hrh = new HRHAPI(token);
}

async function getTemplate(setTemplate: (template: string) => void, ou): Promise<void> {
    let template = await hrh.generateTemplate(ou).then(r => r.json());
    setTemplate(template.presigned_url);
}

async function handleUpload(setUpload: (upload: string) => void, file): Promise<void> {
    let upload = await hrh.processTemplatePresignedUrl().then(r => r.json());
    setUpload(upload);
    await hrh.uploadTemplate(upload.presigned_url,file)
}

async function postJob(setShowSuccess: (showSuccess: boolean) => void, key, orgUnit, mech, period): Promise<void> {
    let result = await hrh.processTemplateNotify(key,orgUnit,mech,period)
    if (result.ok)
        setShowSuccess(true)
}

export default function HRHPage() {
    let [token, setToken] = useState(null);
    let [template, setTemplate] = useState(null);
    let [orgUnit, setOrgUnit] = useState('cDGPF739ZZr');
    let [mech, setMech] = useState('iePQSQ6G2Xl');
    let [period, setPeriod] = useState('fy2020');
    let [upload, setUpload] = useState(null);
    let [file, setFile] = useState(null);
    let [showUpload, setShowUpload] = useState(null);
    let [showSuccess, setShowSuccess] = useState(null);

    return <SolutionTemplate>
        <InfoSection>
            <Typography variant='h5'>Process</Typography>
            <Typography>
                <ol>
                    <li>GET pdapsession to retrieve the encrypted session for PDAP API</li>
                    <li>GET PDAP API to request template for a passed in ou</li>
                    <li>Download template from the returned S3 presigned url</li>
                    <li>GET PDAP API to request a upload link</li>
                    <li>PUT S3 API upload the finished template</li>
                    <li>POST PDAP API to notify of template upload completion</li>
                </ol>
            </Typography>
        </InfoSection>

        <InfoSection>
            <Typography variant='h5'>Test</Typography>
            <br />
            <ol>
                <li><Button variant="contained" color="secondary" size='small' onClick={() => getToken(setToken)}>
                    Get Token
                </Button></li>
                {token && <React.Fragment>
                    <Typography style={styles.report}>HRH App received the following token:</Typography>
                    <blockquote>{token}</blockquote>
                    <li><Button variant="contained" color="secondary" size='small' onClick={() => getTemplate(setTemplate, orgUnit)}>
                        Request Template
                    </Button>
                        <label style={{ display: 'inline-block', marginLeft: '10px' } as CSSProperties}>
                            Orginzation Unit:
                            <input type="text" value={orgUnit} onChange={e => setOrgUnit(e.target.value)} />
                        </label></li>
                </React.Fragment>}
                {template && <React.Fragment>
                    <li><Button href={template} variant="contained" color="secondary" size='small' download onClick={() => setShowUpload(true)}>
                        Download Template
                    </Button></li>
                </React.Fragment>}
                {showUpload && <React.Fragment>
                    <li>The GET request for a presigned url is completed prior to upload. <Icon>arrow_downward</Icon></li>
                    <li>
                    <input type="file" onChange={e => setFile(e.target.files[0])} />
                    <Button variant="contained" color="secondary" size='small' onClick={() => handleUpload(setUpload, file)}>
                        Upload Template
                    </Button></li>
                </React.Fragment>}
                {upload && <React.Fragment>
                    <li><Button variant="contained" color="secondary" size='small' onClick={() => postJob(setShowSuccess,upload.file_key, orgUnit, mech, period)}>
                        Notify PDAP
                    </Button>
                    <label style={{ display: 'inline-block', marginLeft: '10px' } as CSSProperties}>
                        Mechanism:
                        <input type="text" value={mech} onChange={e => setMech(e.target.value)} />
                    </label>
                    <label style={{ display: 'inline-block', marginLeft: '10px' } as CSSProperties}>
                    Period:
                        <input type="text" value={period} onChange={e => setPeriod(e.target.value)} />
                    </label></li>
                </React.Fragment>}
                {showSuccess && <React.Fragment>
                    <br/>
                    <Typography style={styles.report}><b>Success:</b> All steps complete!</Typography>
                </React.Fragment>}
            </ol>
        </InfoSection>
    </SolutionTemplate>;
}