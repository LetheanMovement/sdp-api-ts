import type { Configuration } from "../configuration";
import type { HttpFile, RequestContext, ResponseContext } from "../http/http";


export abstract class AbstractVpnApiRequestFactory {
    public abstract startLetheand(dataDir: string, version?: boolean, options?: Configuration): Promise<RequestContext>;

}


export abstract class AbstractVpnApiResponseProcessor {
     public abstract startLetheand(response: ResponseContext): Promise<void >;

}
