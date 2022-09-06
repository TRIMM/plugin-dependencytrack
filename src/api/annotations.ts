import { Entity } from '@backstage/catalog-model';

export const DEPENDENCYTRACK_PROJECT_ID_ANNOTATION = 'dependencytrack/project-id';

export const getProjectId = (entity: Entity) => {
    const projectId = entity?.metadata.annotations?.[DEPENDENCYTRACK_PROJECT_ID_ANNOTATION] ?? '';
    return projectId ?? '';
  };