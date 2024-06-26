export type DependencytrackProject = {
    author: string;
    publisher: string;
    group: string;
    name: string;
    description: string;
    version: string;
    classifier: CLASSIFIER;
    cpe: string;
    swidTagId: string;
    directDependencies: string;
    uuid: string;
    lastBomImport: string;
    lastBomImportFormat: string;
    lastInheritedRiskScore: number;
    active: boolean;
    metrics: ProjectMetrics;
    findings: Finding[];    
}

export enum CLASSIFIER {
    APPLICATION,
    FRAMEWORK,
    LIBRARY,
    CONTAINER,
    OPERATING_SYSTEM,
    DEVICE,
    FIRMWARE,
    FILE
}
export const metrictypes = [
    "critical",
    "high",
    "medium",
    "low",
    "unassigned",
    "vulnerabilities",
    "vulnerableComponents",
    "components",
    "suppressed",
    "findingsTotal",
    "findingsAudited",
    "findingsUnaudited",
    "inheritedRiskScore",
    "firstOccurrence",
    "lastOccurrence"
] as const;

export type ProjectMetrics = {
    [k in typeof metrictypes[number]]: number;
};

export type Finding = {    
    component: Component;
    vulnerability: Vulnerability;
    analysis: Analyis;
    attribution: Attribution;
    matrix: string;
}

export type Component = {
    author?: string;
    publisher?: string;
    group?: string;
    classifier?: string;
    uuid: string;
    name: string;
    version: string;
    purl: string;
    project: string;
}

export enum SEVERITY {
    CRITICAL,
    HIGH,   
    MEDIUM,
    LOW,
    INFO,
    UNASSIGNED
}

export type Vulnerability = {
    uuid: string;
    source: string;
    vulnId: string;
    title?: string;
    severity: SEVERITY;
    severityRank: number;
    epssScore: number;
    epssPercentile: number;
    cweId: number;
    cweName: string;
    cwes: cwe[];
    aliases: string[];
    description: string;
    recommendation: string | null;
    cvssV2BaseScore?: number;
    cvssV2ImpactSubScore?: number;
    cvssV2ExploitabilitySubScore?: number;
    cvssV2Vector?: string;
    cvssV3BaseScore?: number;
    cvssV3ImpactSubScore?: number;
    cvssV3ExploitabilitySubScore?: number;
    cvssV3Vector?: string;
}

export type cwe = {
    cweId: number;
    name: string;
}

export type Analyis = {
    isSuppressed: boolean;
}

export enum ANALYZER_IDENTITY {
    INTERNAL_ANALYZER,
    OSSINDEX_ANALYZER,
    NPM_AUDIT_ANALYZER,
    VULNDB_ANALYZER,
    NONE
}

export type Attribution = {
    analyzerIdentity: ANALYZER_IDENTITY;
    attributedOn: number;
    alternateIdentifier: string;
    referenceUrl: string;
}