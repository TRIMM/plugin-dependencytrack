import {
  ApiBlueprint,
  createFrontendPlugin,
  discoveryApiRef,
  identityApiRef,
  type ExtensionDefinition,
  type OverridableFrontendPlugin,
} from '@backstage/frontend-plugin-api';
import { useEntity } from '@backstage/plugin-catalog-react';
import { EntityCardBlueprint, EntityContentBlueprint } from '@backstage/plugin-catalog-react/alpha';
import { Options } from '@material-table/core';
import { dependencytrackApiRef, ProductionDependencytrackApi } from './api';
import {
  DependencytrackFindingCard as DependencytrackFindingCardComponent,
  DependencytrackSummaryCard as DependencytrackSummaryCardComponent,
} from './components/DependencytrackCard';
import { isDependencytrackAvailable } from './components';
import { rootRouteRef } from './routes';

type DependencytrackPageProps = {
  tableOptions?: Options<never>;
};

const defaultSummaryTableOptions: Options<never> = {
  padding: 'dense',
  paging: true,
  search: false,
  pageSize: 10,
};

const defaultFindingTableOptions: Options<never> = {
  padding: 'dense',
  paging: true,
  search: false,
  pageSize: 10,
};

const defaultContentTableOptions: Options<never> = {
  padding: 'dense',
  paging: true,
  search: true,
  pageSize: 15,
  pageSizeOptions: [15, 30, 60],
};

export const DependencytrackSummaryCard = (props: DependencytrackPageProps) => {
  const { entity } = useEntity();

  return (
    <DependencytrackSummaryCardComponent
      entity={entity}
      tableOptions={props.tableOptions ?? defaultSummaryTableOptions}
    />
  );
};

export const DependencytrackFindingCard = (props: DependencytrackPageProps) => {
  const { entity } = useEntity();

  return (
    <DependencytrackFindingCardComponent
      entity={entity}
      tableOptions={props.tableOptions ?? defaultFindingTableOptions}
    />
  );
};

export const DependencytrackContent = (props: DependencytrackPageProps) => {
  const { entity } = useEntity();
  const tableOptions = {
    ...defaultContentTableOptions,
    ...props.tableOptions,
  };

  return <DependencytrackFindingCardComponent entity={entity} tableOptions={tableOptions} />;
};

const dependencytrackApi = ApiBlueprint.make({
  params: defineParams =>
    defineParams({
      api: dependencytrackApiRef,
      deps: {
        discoveryApi: discoveryApiRef,
        identityApi: identityApiRef,
      },
      factory: ({ discoveryApi, identityApi }) =>
        new ProductionDependencytrackApi(discoveryApi, identityApi),
    }),
});

export const EntityDependencytrackSummaryCard: ExtensionDefinition = EntityCardBlueprint.make({
  name: 'summary',
  params: {
    type: 'info',
    filter: isDependencytrackAvailable,
    loader: async () => <DependencytrackSummaryCard />,
  },
});

export const EntityDependencytrackFindingCard: ExtensionDefinition = EntityCardBlueprint.make({
  name: 'findings',
  params: {
    type: 'content',
    filter: isDependencytrackAvailable,
    loader: async () => <DependencytrackFindingCard />,
  },
});

export const EntityDependencytrackContent: ExtensionDefinition = EntityContentBlueprint.make({
  name: 'dependencytrack',
  params: {
    path: '/dependencytrack',
    title: 'Dependencytrack',
    routeRef: rootRouteRef,
    filter: isDependencytrackAvailable,
    loader: async () => <DependencytrackContent />,
  },
});

const dependencytrackPlugin: OverridableFrontendPlugin<{
  root: typeof rootRouteRef;
}> = createFrontendPlugin({
  pluginId: 'dependencytrack',
  title: 'Dependencytrack',
  routes: {
    root: rootRouteRef,
  },
  extensions: [
    dependencytrackApi,
    EntityDependencytrackSummaryCard,
    // EntityDependencytrackFindingCard # Uncomment if findings should also be shown in the overview page
    EntityDependencytrackContent,
  ],
});

export default dependencytrackPlugin;

export { dependencytrackApiRef } from './api';
export type { DependencytrackApi } from './api';
export { isDependencytrackAvailable } from './components';
