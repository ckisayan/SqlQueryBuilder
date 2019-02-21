export interface DbTable {
    tableName: string;
    tableDesc: string;
}
export interface DbColumn {
    columnName: string;
    columnDesc: string;
}
export interface QueryResultset {
    claimIdentifier: string;
    providerName: string;
    providerAddress: string;
    providerTaxIdentifier: string;
    providerContactName: string;
}
