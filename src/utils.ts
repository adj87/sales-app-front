interface UnknownObject {
  [key: string]: Array<String>;
}

export const getColumnsTablesConfig = (): UnknownObject => {
  const columnsTableConfigString = localStorage.getItem('columnsTableConfig');
  return columnsTableConfigString ? JSON.parse(columnsTableConfigString) : {};
};

export const getColumnsHiddenInTable = (tableName: String): Array<String> => {
  return getColumnsTablesConfig()[tableName.toString()] ?? [];
};

export const setColumnToHiddenOrShownInTable = (tableName: String, columnToShowOrHide: String) => {
  let columnsHiddenInTable = getColumnsHiddenInTable(tableName);

  const columnPositionInArray = columnsHiddenInTable.indexOf(columnToShowOrHide);
  const isColumnAlreadyHidden = columnPositionInArray > -1;
  if (isColumnAlreadyHidden) {
    columnsHiddenInTable.splice(columnPositionInArray, 1);
  } else {
    columnsHiddenInTable.push(columnToShowOrHide);
  }

  const columnsTablesConfig = getColumnsTablesConfig()[tableName.toString()];
  const newColumnsTableConfig = {
    ...columnsTablesConfig,
    [tableName.toString()]: columnsHiddenInTable,
  };
  return localStorage.setItem('columnsTableConfig', JSON.stringify(newColumnsTableConfig));
};
