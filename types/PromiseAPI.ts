import { ResponseContext, RequestContext, HttpFile } from '../http/http';
import * as models from '../models/all';
import { Configuration} from '../configuration'
import { injectable, inject, optional } from "inversify";
import { AbstractConfiguration } from "../services/configuration";

import { ObservableVpnApi } from './ObservableAPI';

import { VpnApiRequestFactory, VpnApiResponseProcessor} from "../apis/VpnApi";
import { AbstractVpnApiRequestFactory, AbstractVpnApiResponseProcessor } from "../apis/VpnApi.service";

@injectable()
export class PromiseVpnApi {
    private api: ObservableVpnApi

    public constructor(
        @inject(AbstractConfiguration) configuration: Configuration,
        @inject(AbstractVpnApiRequestFactory) @optional() requestFactory?: AbstractVpnApiRequestFactory,
        @inject(AbstractVpnApiResponseProcessor) @optional() responseProcessor?: AbstractVpnApiResponseProcessor
    ) {
        this.api = new ObservableVpnApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * @param dataDir Returns the binary version
     * @param version Returns the binary version
     */
    public startLetheand(dataDir: string, version?: boolean, _options?: Configuration): Promise<void> {
        const result = this.api.startLetheand(dataDir, version, _options);
        return result.toPromise();
    }


}



