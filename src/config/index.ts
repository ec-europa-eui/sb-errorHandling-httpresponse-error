import { EuiAppConfig } from '@eui/core';
import { GLOBAL } from './global';
import { MODULES } from './modules';
import { LogLevel,ConsoleAppender } from '@eui/core';

import { HttpErrorHandlerConfig} from '@eui/core'
import { HttpErrorRouteConfig,GrowlHttpErrorCallbackFn,HttpErrorCallbackFn} from '@eui/core'


export const appConfig: EuiAppConfig = {
    global: GLOBAL,
    modules: MODULES,
    httpErrorHandler: {
        routes: [{
            path: '/test/sendError',
            500: '/page500',
        },
        {
            path: '*',
            401: '/page401',  
            404: '/page404',
            500: '/page500',
            default: GrowlHttpErrorCallbackFn,
        },],
    },
};

