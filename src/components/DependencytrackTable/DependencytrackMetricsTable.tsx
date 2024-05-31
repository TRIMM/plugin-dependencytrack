import React from 'react';
import { KeyCell, ValueCell } from './DataCell';
import { Table, TableColumn } from '@backstage/core-components';
import { Options } from '@material-table/core';
import { metrictypes, ProjectMetrics } from '../../api/dependencytrack-types';

const columns: TableColumn[] = [

    {
        title: 'Type',        
        render: data => <KeyCell keyvaluePair={data as {key: string, value: number}} />
    },
    {
        title: 'Count',
        render: data => <ValueCell keyvaluePair={data as {key: string, value: number}}/>
    }

];

type DependencytrackMetricsTableProps = {
  projectMetrics?: ProjectMetrics;
    tableOptions?: Options<{}>;
};

const kv = (obj: {[k: string]: number}) => metrictypes.reduce((acc, key: string) => {
  const value: number =  obj[key];
  acc.push({key,value});
  return acc;
}, [] as unknown as Array<{key: string, value: number}>);

const DependencytrackMetricsTable = ({
    projectMetrics,   
    tableOptions,
  }: DependencytrackMetricsTableProps) => {
    if(!projectMetrics){
      throw new Error('Failed rendering table');
    }    
    return (
      <Table
        columns={columns}
        options={tableOptions}
        title="Dependencytrack Metrics"        
        data={kv(projectMetrics)}        
      />
    );
  };

  export default DependencytrackMetricsTable;