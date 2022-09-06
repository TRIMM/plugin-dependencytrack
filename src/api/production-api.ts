import { DependencytrackProject, ProjectMetrics, Finding } from "./dependencytrack-types";
import { DependencytrackApi } from "./dependencytrack-api";
import { getProjectId } from "./annotations";
import { DiscoveryApi, IdentityApi } from '@backstage/core-plugin-api';
import { Entity } from '@backstage/catalog-model';

export class ProductionDependencytrackApi implements DependencytrackApi {
    constructor(
        private readonly discoveryApi: DiscoveryApi,        
        private readonly identityApi?: IdentityApi,
        
    ){}

    async fetchMetrics(entity: Entity): Promise<ProjectMetrics> {
        const project = getProjectId(entity);

        const apiUrl = `${await this.discoveryApi.getBaseUrl('proxy')}/dependencytrack`;        
        const authOpts = await this.authOptions();

        const metricsResponse = await fetch(
            `${apiUrl}/api/v1/metrics/project/${project}/current`,
            authOpts
        );

        if(metricsResponse.status >= 400 && metricsResponse.status < 600){
            throw new Error('Failed fetching expanded metrics');
        }

        return (await metricsResponse.json()) as ProjectMetrics;

    }

    async fetchFindings(
        entity: Entity
    ): Promise<Finding[]>{
        const project = getProjectId(entity);

        const apiUrl = `${await this.discoveryApi.getBaseUrl('proxy')}/dependencytrack`;        
        const authOpts = await this.authOptions();

        const findingsResponse = await fetch(
            `${apiUrl}/api/v1/finding/project/${project}`,
            authOpts
        );

        if(findingsResponse.status >= 400 && findingsResponse.status < 600){
            throw new Error('Failed fetching expanded findings');
        }            

        return (await findingsResponse.json()) as Finding[];
    }

    async fetchProject(
        entity: Entity,
    ): Promise<DependencytrackProject>{    
        const project = getProjectId(entity);

        const apiUrl = `${await this.discoveryApi.getBaseUrl('proxy')}/dependencytrack`;        
        const authOpts = await this.authOptions();        
        
        const simpleResponse = await fetch(
            `${apiUrl}/api/v1/project/${project}`,
            authOpts
        );
        
        if (simpleResponse.status >= 400 && simpleResponse.status < 600) {                        
            throw new Error('Failed fetching Dependencytrack project');
        }
        
        let simpleProject = (await simpleResponse.json()) as DependencytrackProject;
   
        return simpleProject;        
    }

    private async authOptions(){
        if(! this.identityApi){
            return {};
        }
        const { token } = await this.identityApi.getCredentials();        
        return {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };
    }

}