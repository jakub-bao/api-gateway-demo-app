
import { pdapUrl } from "../../sharedModules/shared/services/config.service";


export default class HRHAPI {
  token = "";

  constructor(token) {
    this.token = token;
  }

  async generateTemplate(orgUnit){
    return await  this.hrh('GET', 'poc-hrh/datim/jobs/hrh_generate_template?org_unit_id=' + orgUnit);
  }

  async processTemplatePresignedUrl(){
    return await  this.hrh('GET', 'poc-hrh/datim/jobs/hrh_process_template/presignedurl');
  }

  async processTemplate(filter,orgUnit=undefined,agencyId=undefined,mechanismId=undefined){
    let query = '?query_filter='+filter;
    if (orgUnit)
      query+= '&org_unit_id=' + orgUnit;
    if (agencyId)
      query+= '&agency_id=' + agencyId;
    if (mechanismId)
      query+= '&mechanism_id=' + mechanismId;
    return await  this.hrh('GET', 'poc-hrh/datim/jobs/hrh_process_template'+query);
  }

  async processTemplateNotify(fileKey,orgUnit,mechanismId,period){
    return await this.hrh('POST', 'poc-hrh/datim/jobs/hrh_process_template?org_unit_id=' + orgUnit + '&mechanism_id=' + mechanismId + '&period_id=' + period, '{"file_key":"' + fileKey + '"}', 'application/json');
  }

  async processTemplateDelete(filter,orgUnit=undefined,agencyId=undefined,mechanismId=undefined){
    let query = '?query_filter='+filter;
    if (orgUnit)
      query+= '&org_unit_id=' + orgUnit;
    if (agencyId)
      query+= '&agency_id=' + agencyId;
    if (mechanismId)
      query+= '&mechanism_id=' + mechanismId;
    return await  this.hrh('DELETE', 'poc-hrh/datim/jobs/hrh_process_template'+query);
  }

  async uploadTemplate(presignedUrl,file){
    let formData = new FormData();
    formData.append(
        "template",
        file,
        file.name
    );
    //application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
    //application/x-www-form-urlencoded
    return await this.req('PUT', presignedUrl, formData, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  }

  /*
    * Make a request
    * @param {*} method GET, POST, PUT, PATCH or DELETE
    * @param {*} url The url to request
    * @param {*} body Body to send to the url.
    * @param {*} contentType Content type of body
    * @param {*} headers Any Headers for the request
    */
  async req(method: string, url: string, body = null, contentType: string = null, headers: {} = null, credentials = false) {
    if (headers == null)
      headers = {};
    if (contentType != null && !headers.hasOwnProperty('Content-Type'))
      headers['Content-Type'] = contentType;
    let init = {
      method: method,
      headers: headers,
      body: body
    };
    if (credentials)
      init["credentials"] = 'include' as RequestCredentials;
    let request = new Request(url);
    return await fetch(request, init).then(this.handleErrors)
      .catch(error => console.log(error));
  }
  
  /**
  * Make a HRH PDAP request
  * @param {*} method GET, POST, PUT, PATCH or DELETE
  * @param {*} url The url to request
  * @param {*} body Body to send to the url.
  * @param {*} contentType Content type of body
  */
  async hrh(method: string, url: string, body = null, contentType: string = null) {
    let headers = {};
    headers['datim-session'] = this.token;
    url = pdapUrl + url;
    return await this.req(method, url, body, contentType, headers);
  }

  /**
   * Handles a non ok fetch request
   * @param response The fetch response.
   * @returns The fetch response
   */
  handleErrors(response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
  }

}