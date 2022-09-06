import { Entity } from '@backstage/catalog-model';
import { DEPENDENCYTRACK_PROJECT_ID_ANNOTATION } from './hooks';

export const isDependencytrackAvailable = (entity: Entity) =>
    Boolean(entity.metadata.annotations?.[DEPENDENCYTRACK_PROJECT_ID_ANNOTATION]);