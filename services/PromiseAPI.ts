import type { HttpFile } from "../http/http";
import type { Configuration } from "../configuration";



export abstract class AbstractPromiseVpnApi {
    public abstract startLetheand(dataDir: string, version?: boolean, options?: Configuration): Promise<void>;

}
