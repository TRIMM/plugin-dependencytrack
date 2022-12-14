import { RandomUUIDOptions } from "crypto";

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

enum CLASSIFIER {
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
    "inheritedRiskScore"    
] as const;
export type ProjectMetrics = {
    [k in keyof typeof metrictypes]: number;
};

export type Finding = {    
    component: Component;
    vulnerability: Vulnerability;
    analysis: Analyis;
    attribution: Attribution;
    matrix: string;
}

export type Component = {
    author: string;
    publisher: string;
    group: string;
    name: string;
    version: string;
    classifier: string;
    uuid: string;
    purl: string;
    project: string;
}

enum SEVERITY {
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
    title: string;
    severity: SEVERITY;
    severityRank: number;
    cweId: number;
    cweName: string;
    cwes: cwe[];
    description: string;
    recommendation: string;
    cvssV2BaseScore: number;
    cvssV2ImpactSubScore: number;
    cvssV2ExploitabilitySubScore: number;
    cvssV2Vector: string;
    cvssV3BaseScore: number;
    cvssV3ImpactSubScore: number;
    cvssV3ExploitabilitySubScore: number;
    cvssV3Vector: string;
}

export type cwe = {
    cweId: number;
    name: string;
}

export type Analyis = {
    isSupressed: boolean;
}

enum ANALYZER_IDENTITY {
    INTERNAL_ANALYZER,
    OSSINDEX_ANALYZER,
    NPM_AUDIT_ANALYZER,
    VULNDB_ANALYZER,
    NONE
}

export type Attribution = {
    analyzerIdentity: ANALYZER_IDENTITY;
    attributedOn: string;
}