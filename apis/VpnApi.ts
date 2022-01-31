// TODO: better import syntax?
import { BaseAPIRequestFactory, RequiredError } from './baseapi';
import {Configuration} from '../configuration';
import { RequestContext, HttpMethod, ResponseContext, HttpFile} from '../http/http';
import {ObjectSerializer} from '../models/ObjectSerializer';
import {ApiException} from './exception';
import {canConsumeForm, isCodeInRange} from '../util';

import { injectable } from "inversify";


/**
 * no description
 */
@injectable()
export class VpnApiRequestFactory extends BaseAPIRequestFactory {

    /**
     * @param dataDir Returns the binary version
     * @param version Returns the binary version
     */
    public async startLetheand(dataDir: string, version?: boolean, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'dataDir' is not null or undefined
        if (dataDir === null || dataDir === undefined) {
            throw new RequiredError("VpnApi", "startLetheand", "dataDir");
        }



        // Path Params
        const localVarPath = '/letheand/start';

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.GET);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

        // Query Params
        if (version !== undefined) {
            requestContext.setQueryParam("version", ObjectSerializer.serialize(version, "boolean", ""));
        }

        // Query Params
        if (dataDir !== undefined) {
            requestContext.setQueryParam("data_dir", ObjectSerializer.serialize(dataDir, "string", ""));
        }



        return requestContext;
    }

}

@injectable()
export class VpnApiResponseProcessor {

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to startLetheand
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async startLetheand(response: ResponseContext): Promise<void > {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            return;
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: void = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "void", ""
            ) as void;
            return body;
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

}
