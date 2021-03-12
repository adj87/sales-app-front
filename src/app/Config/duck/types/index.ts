import { IConfig } from './IConfig';

const SECTION_CONFIG = 'CONFIG';
export const SET_YEAR = SECTION_CONFIG + 'SET_YEAR';

export interface SetYearAction {
  type: typeof SET_YEAR;
  payload: number;
}

export interface ConfigState extends IConfig {}
