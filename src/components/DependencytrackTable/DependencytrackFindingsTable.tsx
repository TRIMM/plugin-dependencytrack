import { StringCell, LinkCell } from './DataCell';
import { Table, TableColumn } from '@backstage/core-components';
import { Options } from '@material-table/core';
import { Finding } from '../../api/dependencytrack-types';
import { configApiRef, useApi } from '@backstage/core-plugin-api';

const defineSeverityScore = (finding: Finding) => {
    if(finding.vulnerability.cvssV3BaseScore){
        return finding.vulnerability.cvssV3BaseScore;
    } else if(finding.vulnerability.cvssV2BaseScore){
        return finding.vulnerability.cvssV2BaseScore;
    }
    return '-';
}

type DependencytrackFindingsTableProps = {
    findings?: Finding[];
    tableOptions: Options<{}>;    
};

const DependencytrackFindingsTable = ({
    findings,   
    tableOptions,    
  }: DependencytrackFindingsTableProps) => {
    const config = useApi(configApiRef);
    const baseUrl = config.getString('dependencytrack.baseUrl');

    const getComponentUrl = (finding: Finding) => {
      return `${baseUrl}/components/${finding.component.uuid}`;
    };

    const columns: TableColumn[] = [
      {
        title: 'Dependency',
        render: data => <LinkCell url={getComponentUrl((data as Finding))} text={(data as Finding).component.name} />
      },
      {
        title: 'Name',
        render: data => <StringCell text={(data as Finding).vulnerability.cweName}/>,
      },
      {
        title: 'Version',
        render: data => <StringCell text={(data as Finding).component.version} />
      },
      {
        title: 'Severity',
        render: data => <StringCell text={(data as Finding).vulnerability.severity.toString()} />
      },
      {
        title: 'Score',
        render: data => <StringCell text={defineSeverityScore((data as Finding)).toString()} />
      },
      {
        title: 'Vulnerability',
        render: data => <StringCell text={(data as Finding).vulnerability.vulnId}/>
      }
    ];

    if(!findings){
      throw new Error('Failed rendering table');
    }    
    return (
      <Table
        columns={columns}
        options={tableOptions}
        title="Dependencytrack Findings"        
        data={findings}        
      />
    );
  };

  export default DependencytrackFindingsTable;
