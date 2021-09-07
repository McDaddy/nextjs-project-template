/*
 * Copyright (c) 2021 Terminus, Inc.
 *
 * This program is free software: you can use, redistribute, and/or modify
 * it under the terms of the GNU Affero General Public License, version 3
 * or later ("AGPL"), as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

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
