import{
    getProjectId,
    DEPENDENCYTRACK_PROJECT_ID_ANNOTATION
} from '../api/annotations'

export const useProjectId = getProjectId;
export { DEPENDENCYTRACK_PROJECT_ID_ANNOTATION };