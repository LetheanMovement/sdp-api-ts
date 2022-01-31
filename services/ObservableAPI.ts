import type { HttpFile } from "../http/http";
import type { Observable } from "../rxjsStub";
import type { Configuration } from "../configuration";



export abstract class AbstractObservableVpnApi {
    public abstract startLetheand(dataDir: string, version?: boolean, options?: Configuration): Observable<void>;

}
