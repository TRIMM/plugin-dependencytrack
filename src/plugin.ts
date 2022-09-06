import {   
  createApiFactory,
  createPlugin,
  createRouteRef,
  discoveryApiRef,
  identityApiRef,  
} from '@backstage/core-plugin-api';
import { ProductionDependencytrackApi, dependencytrackApiRef } from './api';

export const rootRouteRef = createRouteRef({
  id: 'dependencytrack'
});

export const dependencytrackPlugin = createPlugin({
  id: 'dependencytrack',
  apis: [
    createApiFactory({
      api: dependencytrackApiRef,
      deps: {        
        discoveryApi: discoveryApiRef,
        identityApi: identityApiRef        
      },
      factory: ({
        discoveryApi, identityApi
      }) =>
      new ProductionDependencytrackApi(
        discoveryApi, identityApi,
      ),
    }),
  ],
  routes: {
    root: rootRouteRef,
  },
});