import type { HttpFile } from '../http/http';
import type { Configuration } from '../configuration'
import type * as req from "../types/ObjectParamAPI";



export abstract class AbstractObjectVpnApi {
    /**
     * @param param the request object
     */
    public abstract startLetheand(param: req.VpnApiStartLetheandRequest, options?: Configuration): Promise<void>;

}
