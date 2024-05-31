import React from 'react';
import { StringCell, LinkCell } from './DataCell';
import { Table, TableColumn } from '@backstage/core-components';
import { Options } from '@material-table/core';
import { Finding } from '../../api/dependencytrack-types';
import { configApiRef, useApi } from '@backstage/core-plugin-api';

const getComponentUrl = (finding: Finding) => {
    return `${useApi(configApiRef).getString('dependencytrack.baseUrl')}/components/${finding.component.uuid}`;    
}

const defineSeverityScore = (finding: Finding) => {
    if(finding.vulnerability.cvssV3BaseScore){
        return finding.vulnerability.cvssV3BaseScore;
    } else if(finding.vulnerability.cvssV2BaseScore){
        return finding.vulnerability.cvssV2BaseScore;
    }
    return '-';
}

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

type DependencytrackFindingsTableProps = {
    findings?: Finding[];
    tableOptions: Options<{}>;    
};

const DependencytrackFindingsTable = ({
    findings,   
    tableOptions,    
  }: DependencytrackFindingsTableProps) => {
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