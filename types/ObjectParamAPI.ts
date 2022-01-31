import { ResponseContext, RequestContext, HttpFile } from '../http/http';
import * as models from '../models/all';
import { Configuration} from '../configuration'


import { ObservableVpnApi } from "./ObservableAPI";
import { VpnApiRequestFactory, VpnApiResponseProcessor} from "../apis/VpnApi";

export interface VpnApiStartLetheandRequest {
    /**
     * Returns the binary version
     * @type string
     * @memberof VpnApistartLetheand
     */
    dataDir: string
    /**
     * Returns the binary version
     * @type boolean
     * @memberof VpnApistartLetheand
     */
    version?: boolean
}

export class ObjectVpnApi {
    private api: ObservableVpnApi

    public constructor(configuration: Configuration, requestFactory?: VpnApiRequestFactory, responseProcessor?: VpnApiResponseProcessor) {
        this.api = new ObservableVpnApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * @param param the request object
     */
    public startLetheand(param: VpnApiStartLetheandRequest, options?: Configuration): Promise<void> {
        return this.api.startLetheand(param.dataDir, param.version,  options).toPromise();
    }

}
