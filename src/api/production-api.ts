import { DependencytrackProject, ProjectMetrics, Finding } from './dependencytrack-types';
import { DependencytrackApi } from './dependencytrack-api';
import { getProjectId, getProjectName } from './annotations';
import { DiscoveryApi, IdentityApi } from '@backstage/core-plugin-api';
import { Entity } from '@backstage/catalog-model';

export class ProductionDependencytrackApi implements DependencytrackApi {
  constructor(
    private readonly discoveryApi: DiscoveryApi,
    private readonly identityApi?: IdentityApi,
  ) {}

  // Resolve the DependencyTrack project UUID for an entity.
  // Precedence:
  //   1. dependencytrack/project-id   - a fixed version UUID (kept for backwards compatibility).
  //   2. dependencytrack/project-name - resolved to the project's latest version UUID via
  //      GET /api/v1/project/latest/{name} (DependencyTrack's isLatest flag). This lets a project
  //      that carries one version per build (a git commit or a semver release) always link to the
  //      current build, without re-pinning a UUID in catalog-info on every release.
  private async resolveProjectUuid(entity: Entity): Promise<string> {
    const explicitId = getProjectId(entity);
    if (explicitId) {
      return explicitId;
    }

    const projectName = getProjectName(entity);
    if (!projectName) {
      return '';
    }

    const apiUrl = `${await this.discoveryApi.getBaseUrl('proxy')}/dependencytrack`;
    const authOpts = await this.authOptions();

    const latestResponse = await fetch(
      `${apiUrl}/api/v1/project/latest/${encodeURIComponent(projectName)}`,
      authOpts,
    );

    if (latestResponse.status >= 400 && latestResponse.status < 600) {
      throw new Error(`Failed resolving latest Dependencytrack project for name '${projectName}'`);
    }

    const latest = (await latestResponse.json()) as DependencytrackProject;
    return latest?.uuid ?? '';
  }

  async fetchMetrics(entity: Entity): Promise<ProjectMetrics> {
    const project = await this.resolveProjectUuid(entity);

    const apiUrl = `${await this.discoveryApi.getBaseUrl('proxy')}/dependencytrack`;
    const authOpts = await this.authOptions();

    const metricsResponse = await fetch(
      `${apiUrl}/api/v1/metrics/project/${project}/current`,
      authOpts,
    );

    if (metricsResponse.status >= 400 && metricsResponse.status < 600) {
      throw new Error('Failed fetching expanded metrics');
    }

    return (await metricsResponse.json()) as ProjectMetrics;
  }

  async fetchFindings(entity: Entity): Promise<Finding[]> {
    const project = await this.resolveProjectUuid(entity);

    const apiUrl = `${await this.discoveryApi.getBaseUrl('proxy')}/dependencytrack`;
    const authOpts = await this.authOptions();

    const findingsResponse = await fetch(`${apiUrl}/api/v1/finding/project/${project}`, authOpts);

    if (findingsResponse.status >= 400 && findingsResponse.status < 600) {
      throw new Error('Failed fetching expanded findings');
    }

    return (await findingsResponse.json()) as Finding[];
  }

  async fetchProject(entity: Entity): Promise<DependencytrackProject> {
    const project = await this.resolveProjectUuid(entity);

    const apiUrl = `${await this.discoveryApi.getBaseUrl('proxy')}/dependencytrack`;
    const authOpts = await this.authOptions();

    const simpleResponse = await fetch(`${apiUrl}/api/v1/project/${project}`, authOpts);

    if (simpleResponse.status >= 400 && simpleResponse.status < 600) {
      throw new Error('Failed fetching Dependencytrack project');
    }

    const simpleProject = (await simpleResponse.json()) as DependencytrackProject;
    return simpleProject;
  }

  private async authOptions() {
    if (!this.identityApi) {
      return {};
    }
    const { token } = await this.identityApi.getCredentials();
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }
}
