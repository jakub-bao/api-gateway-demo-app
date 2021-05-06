import {screen, waitFor} from "@testing-library/react";
import {select} from "@dhis2-app/test-tools";

export async function selectOu(ouName:string){
    await select('mechanismMenuSelect_Operating_Unit',ouName);
    await waitFor(()=>expect(screen.queryByTestId('loading')).not.toBeInTheDocument(),{timeout:10*1000});
}