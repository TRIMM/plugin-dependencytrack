import { EmptyState, InfoCard, InfoCardVariants, Progress } from '@backstage/core-components';
import { MissingAnnotationEmptyState } from '@backstage/plugin-catalog-react';
import { ErrorApi, errorApiRef, useApi } from '@backstage/core-plugin-api';
import { Entity } from '@backstage/catalog-model';
import { Options } from '@material-table/core';
import { useEffect } from 'react';
import useAsync from 'react-use/lib/useAsync';
import { dependencytrackApiRef } from '../../api';
import { DEPENDENCYTRACK_PROJECT_ID_ANNOTATION, useProjectId, useProjectName } from '../hooks';
import DependencytrackMetricsTable from '../DependencytrackTable/DependencytrackMetricsTable';
import DependencytrackFindingTable from '../DependencytrackTable/DependencytrackFindingsTable';

export const DependencytrackSummaryCard = ({
  entity,
  variant = 'gridItem',
  tableOptions,
}: {
  entity: Entity;
  variant?: InfoCardVariants;
  tableOptions: Options<{}>;
}) => {
  const errorApi = useApi<ErrorApi>(errorApiRef);
  const dependencytrackApi = useApi(dependencytrackApiRef);

  const projectId = useProjectId(entity);
  const projectName = useProjectName(entity);
  const projectRef = projectId || projectName;
  const { loading, value, error } = useAsync(() => {
    return dependencytrackApi.fetchMetrics(entity);
  }, [dependencytrackApi, projectRef]);

  useEffect(() => {
    if (error) {
      errorApi.post(error);
    }
  }, [error, errorApi]);

  if (loading || !projectRef || error) {
    return (
      <InfoCard title="Dependencytrack Metrics" variant={variant}>
        {loading && <Progress />}

        {!loading && !projectRef && (
          <MissingAnnotationEmptyState annotation={DEPENDENCYTRACK_PROJECT_ID_ANNOTATION} />
        )}

        {!loading && error && (
          <EmptyState
            missing="info"
            title="No information to display"
            description={`There is no Dependencytrack project with reference '${projectRef}'.`}
          />
        )}
      </InfoCard>
    );
  }

  return <DependencytrackMetricsTable projectMetrics={value} tableOptions={tableOptions} />;
};

export const DependencytrackFindingCard = ({
  entity,
  variant = 'gridItem',
  tableOptions,
}: {
  entity: Entity;
  variant?: InfoCardVariants;
  tableOptions: Options<{}>;
}) => {
  const errorApi = useApi<ErrorApi>(errorApiRef);
  const dependencytrackApi = useApi(dependencytrackApiRef);

  const projectId = useProjectId(entity);
  const projectName = useProjectName(entity);
  const projectRef = projectId || projectName;
  const { loading, value, error } = useAsync(
    () => dependencytrackApi.fetchFindings(entity),
    [dependencytrackApi, projectRef],
  );

  useEffect(() => {
    if (error) {
      errorApi.post(error);
    }
  }, [error, errorApi]);

  if (loading || !projectRef || error) {
    return (
      <InfoCard title="Dependencytrack Findings" variant={variant}>
        {loading && <Progress />}

        {!loading && !projectRef && (
          <MissingAnnotationEmptyState annotation={DEPENDENCYTRACK_PROJECT_ID_ANNOTATION} />
        )}

        {!loading && error && (
          <EmptyState
            missing="info"
            title="No information to display"
            description={`There is no Dependencytrack project with reference '${projectRef}'.`}
          />
        )}
      </InfoCard>
    );
  }

  return <DependencytrackFindingTable findings={value} tableOptions={tableOptions} />;
};
