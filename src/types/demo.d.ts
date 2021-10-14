declare namespace Entity {
  interface EntityTable {
    modelId: number;
    dsTableName: string;
  }

  interface EntityColumn {
    columnName: string;
    columnType: string;
    primaryKey: boolean;
  }

  interface Entity {
    id: number;
    modelKey: string;
    modelName: string;
    description: string;
    updatedAt: string;
    createdBy: number;
    tagNumber: number;
    type: 'sync' | 'create';
  }

  interface EntityColumnItem {
    columnCreateType: 'origin' | 'custom';
    columnName: string;
    indicatorsName: string;
    indicatorsType: string;
    primaryKey: boolean;
    description: string;
    dicName: string;
    columnComputeSql: string;
    dicId: number;
  }

  interface EntityDetail {
    id: number;
    originModelId: number;
    primaryKey: boolean;
    modelKey: string;
    modelName: string;
    dsTableName: string;
    description: string;
    createdAt: string;
    createdBy: number;
    modelDetailList: EntityColumnItem[];
    type: 'sync' | 'create';
  }
}
