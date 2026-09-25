import {
  getProjectId,
  getProjectName,
  DEPENDENCYTRACK_PROJECT_ID_ANNOTATION,
  DEPENDENCYTRACK_PROJECT_NAME_ANNOTATION,
} from '../api/annotations';

export const useProjectId = getProjectId;
export const useProjectName = getProjectName;
export { DEPENDENCYTRACK_PROJECT_ID_ANNOTATION, DEPENDENCYTRACK_PROJECT_NAME_ANNOTATION };
