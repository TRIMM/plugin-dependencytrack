import {
  ApiBlueprint,
  createFrontendPlugin,
  discoveryApiRef,
  identityApiRef,
} from '@backstage/frontend-plugin-api';
import { useEntity } from '@backstage/plugin-catalog-react';
import {
  EntityCardBlueprint,
  EntityContentBlueprint,
} from '@backstage/plugin-catalog-react/alpha';
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
  search: false,
  pageSize: 5,
};

export const DependencytrackSummaryCard = (
  props: DependencytrackPageProps,
) => {
  const { entity } = useEntity();

  return (
    <DependencytrackSummaryCardComponent
      entity={entity}
      tableOptions={props.tableOptions ?? defaultSummaryTableOptions}
    />
  );
};

export const DependencytrackFindingCard = (
  props: DependencytrackPageProps,
) => {
  const { entity } = useEntity();

  return (
    <DependencytrackFindingCardComponent
      entity={entity}
      tableOptions={props.tableOptions ?? defaultFindingTableOptions}
    />
  );
};

const DependencytrackContent = (props: DependencytrackPageProps) => {
  const { entity } = useEntity();

  return (
    <DependencytrackFindingCardComponent
      entity={entity}
      tableOptions={{ ...defaultContentTableOptions, ...props.tableOptions }}
    />
  );
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

export const EntityDependencytrackSummaryCard = EntityCardBlueprint.make({
  name: 'summary',
  params: {
    type: 'info',
    filter: isDependencytrackAvailable,
    loader: async () => <DependencytrackSummaryCard />,
  },
});

export const EntityDependencytrackFindingCard = EntityCardBlueprint.make({
  name: 'findings',
  params: {
    type: 'content',
    filter: isDependencytrackAvailable,
    loader: async () => <DependencytrackFindingCard />,
  },
});

export const EntityDependencytrackContent = EntityContentBlueprint.make({
  name: 'dependencytrack',
  params: {
    path: '/dependencytrack',
    title: 'Dependencytrack',
    routeRef: rootRouteRef,
    filter: isDependencytrackAvailable,
    loader: async () => <DependencytrackContent />,
  },
});

export default createFrontendPlugin({
  pluginId: 'dependencytrack',
  title: 'Dependencytrack',
  routes: {
    root: rootRouteRef,
  },
  extensions: [
    dependencytrackApi,
    EntityDependencytrackSummaryCard,
    EntityDependencytrackFindingCard,
    EntityDependencytrackContent,
  ],
});

export { dependencytrackApiRef } from './api';
export type { DependencytrackApi } from './api';
export { isDependencytrackAvailable } from './components';