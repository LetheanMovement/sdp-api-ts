import { ResponseContext, RequestContext, HttpFile } from '../http/http';
import * as models from '../models/all';
import { Configuration} from '../configuration'
import { Observable, of, from } from '../rxjsStub';
import {mergeMap, map} from  '../rxjsStub';
import { injectable, inject, optional } from "inversify";
import { AbstractConfiguration } from "../services/configuration";

import { VpnApiRequestFactory, VpnApiResponseProcessor} from "../apis/VpnApi";
import { AbstractVpnApiRequestFactory, AbstractVpnApiResponseProcessor } from "../apis/VpnApi.service";

@injectable()
export class ObservableVpnApi {
    private requestFactory: AbstractVpnApiRequestFactory;
    private responseProcessor: AbstractVpnApiResponseProcessor;
    private configuration: Configuration;

    public constructor(
        @inject(AbstractConfiguration) configuration: Configuration,
        @inject(AbstractVpnApiRequestFactory) @optional() requestFactory?: AbstractVpnApiRequestFactory,
        @inject(AbstractVpnApiResponseProcessor) @optional() responseProcessor?: AbstractVpnApiResponseProcessor
    ) {
        this.configuration = configuration;
        this.requestFactory = requestFactory || new VpnApiRequestFactory(configuration);
        this.responseProcessor = responseProcessor || new VpnApiResponseProcessor();
    }

    /**
     * @param dataDir Returns the binary version
     * @param version Returns the binary version
     */
    public startLetheand(dataDir: string, version?: boolean, _options?: Configuration): Observable<void> {
        const requestContextPromise = this.requestFactory.startLetheand(dataDir, version, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.startLetheand(rsp)));
            }));
    }

}
