import { StringCell, LinkCell } from './DataCell';
import { Table, TableColumn } from '@backstage/core-components';
import { Options } from '@material-table/core';
import { Finding } from '../../api/dependencytrack-types';
import { configApiRef, useApi } from '@backstage/core-plugin-api';

const severityOrderMap: Record<string, number> = {
  UNASSIGNED: 0,
  INFO: 1,
  LOW: 2,
  MEDIUM: 3,
  HIGH: 4,
  CRITICAL: 5,
};

const defineSeverityScore = (finding: Finding): number | undefined => {
  if (finding.vulnerability.cvssV3BaseScore != null) {
    return finding.vulnerability.cvssV3BaseScore;
  } else if (finding.vulnerability.cvssV2BaseScore != null) {
    return finding.vulnerability.cvssV2BaseScore;
  }
  return undefined;
};

const defineSeverityOrder = (finding: Finding): number => {
  const normalizedSeverity = finding.vulnerability.severity.toUpperCase();
  return severityOrderMap[normalizedSeverity] ?? finding.vulnerability.severityRank;
};

type FindingRow = {
  dependency: string;
  name: string;
  version: string;
  severity: string;
  severityOrder: number;
  score: number | null;
  vulnerability: string;
  componentUrl: string;
};

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

  const rows: FindingRow[] = (findings ?? []).map(finding => ({
    dependency: finding.component.name,
    name: finding.vulnerability.cweName,
    version: finding.component.version,
    severity: finding.vulnerability.severity,
    severityOrder: defineSeverityOrder(finding),
    score: defineSeverityScore(finding) ?? null,
    vulnerability: finding.vulnerability.vulnId,
    componentUrl: getComponentUrl(finding),
  }));

  const columns: TableColumn<FindingRow>[] = [
    {
      title: 'Dependency',
      field: 'dependency',
      render: data => (
        <LinkCell url={(data as FindingRow).componentUrl} text={(data as FindingRow).dependency} />
      ),
    },
    {
      title: 'Name',
      field: 'name',
      render: data => <StringCell text={(data as FindingRow).name} />,
    },
    {
      title: 'Version',
      field: 'version',
      render: data => <StringCell text={(data as FindingRow).version} />,
    },
    {
      title: 'Severity',
      field: 'severity',
      customSort: (a, b) => a.severityOrder - b.severityOrder,
      render: data => <StringCell text={(data as FindingRow).severity} />,
    },
    {
      title: 'Score',
      field: 'score',
      type: 'numeric',
      customSort: (a, b) => (a.score ?? -1) - (b.score ?? -1),
      render: data => <StringCell text={(data as FindingRow).score?.toString() ?? '-'} />,
    },
    {
      title: 'Vulnerability',
      field: 'vulnerability',
      render: data => <StringCell text={(data as FindingRow).vulnerability} />,
    },
  ];

  if (!findings) {
    throw new Error('Failed rendering table');
  }
  return (
    <Table<FindingRow>
      columns={columns}
      options={tableOptions as Options<FindingRow>}
      title="Dependencytrack Findings"
      data={rows}
    />
  );
};

export default DependencytrackFindingsTable;
