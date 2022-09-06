import { DependencytrackProject, Finding, ProjectMetrics } from './dependencytrack-types';
import { createApiRef } from '@backstage/core-plugin-api';
import { Entity } from '@backstage/catalog-model';

export const dependencytrackApiRef = createApiRef<DependencytrackApi>({
    id: 'plugin.dependencytrack.service',
});

export interface DependencytrackApi {
    fetchProject(
        entity: Entity,     
    ): Promise<DependencytrackProject>;

    fetchFindings(
        entity: Entity,
    ): Promise<Finding[]>;

    fetchMetrics(
        entity: Entity
    ): Promise<ProjectMetrics>;
}