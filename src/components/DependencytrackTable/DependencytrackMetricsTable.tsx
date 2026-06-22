import { KeyCell, ValueCell } from './DataCell';
import { Table, TableColumn } from '@backstage/core-components';
import { Options } from '@material-table/core';
import { metrictypes, ProjectMetrics } from '../../api/dependencytrack-types';

type MetricRow = {
  key: string;
  value: number;
};

const columns: TableColumn<MetricRow>[] = [
  {
    title: 'Type',
    field: 'key',
    render: data => <KeyCell keyvaluePair={data as MetricRow} />,
  },
  {
    title: 'Count',
    field: 'value',
    type: 'numeric',
    render: data => <ValueCell keyvaluePair={data as MetricRow} />,
  },
];

type DependencytrackMetricsTableProps = {
  projectMetrics?: ProjectMetrics;
  tableOptions?: Options<{}>;
};

const kv = (obj: { [k: string]: number }) =>
  metrictypes.reduce((acc, key: string) => {
    const value: number = obj[key];
    acc.push({ key, value });
    return acc;
  }, [] as MetricRow[]);

const DependencytrackMetricsTable = ({
  projectMetrics,
  tableOptions,
}: DependencytrackMetricsTableProps) => {
  if (!projectMetrics) {
    throw new Error('Failed rendering table');
  }
  return (
    <Table<MetricRow>
      columns={columns}
      options={tableOptions as Options<MetricRow>}
      title="Dependencytrack Metrics"
      data={kv(projectMetrics)}
    />
  );
};

export default DependencytrackMetricsTable;
