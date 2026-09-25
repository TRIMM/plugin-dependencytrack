import { Entity } from '@backstage/catalog-model';

export const DEPENDENCYTRACK_PROJECT_ID_ANNOTATION = 'dependencytrack/project-id';
export const DEPENDENCYTRACK_PROJECT_NAME_ANNOTATION = 'dependencytrack/project-name';

export const getProjectId = (entity: Entity) => {
  const projectId = entity?.metadata.annotations?.[DEPENDENCYTRACK_PROJECT_ID_ANNOTATION] ?? '';
  return projectId ?? '';
};

export const getProjectName = (entity: Entity) => {
  const projectName = entity?.metadata.annotations?.[DEPENDENCYTRACK_PROJECT_NAME_ANNOTATION] ?? '';
  return projectName ?? '';
};
