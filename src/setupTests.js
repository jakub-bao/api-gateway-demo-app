import '@testing-library/jest-dom/extend-expect';
import "jest-expect-message";
import "./test/expect/approx.expect"
import {apiInit, initTestApiCache} from "@dhis2-app/api";
import {baseUrl} from "./sharedModules/shared/services/config.service";

initTestApiCache();
apiInit(baseUrl,process.env.NODE_ENV);

HTMLCanvasElement.prototype.getContext = () => {
    // return whatever getContext has to return
};
jest.setTimeout(120000);