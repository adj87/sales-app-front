export const getColumnsTablesConfig = () => {
  const columnsTableConfigString = localStorage.getItem('columnsTableConfig');
  return columnsTableConfigString ? JSON.parse(columnsTableConfigString) : {};
};

export const getColumnsHiddenInTable = (tableName) => {
  return getColumnsTablesConfig()[tableName] ?? [];
};

export const setColumnToHiddenOrShownInTable = (tableName, columnToShowOrHide) => {
  let columnsHiddenInTable = getColumnsHiddenInTable(tableName);

  const columnPositionInArray = columnsHiddenInTable.indexOf(columnToShowOrHide);
  const isColumnAlreadyHidden = columnPositionInArray > -1;
  if (isColumnAlreadyHidden) {
    columnsHiddenInTable.splice(columnPositionInArray, 1);
  } else {
    columnsHiddenInTable.push(columnToShowOrHide);
  }

  const columnsTablesConfig = getColumnsTablesConfig(tableName);
  const newColumnsTableConfig = { ...columnsTablesConfig, [tableName]: columnsHiddenInTable };
  return localStorage.setItem('columnsTableConfig', JSON.stringify(newColumnsTableConfig));
};
