import dayjsOriginal from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjsBusinessDays from 'dayjs-business-days';
import es from 'dayjs/locale/es';

const dateFormat = process.env.REACT_APP_FORMAT_DATE_BACK || '';

dayjsOriginal.extend(dayjsBusinessDays);
dayjsOriginal.extend(customParseFormat);
dayjsOriginal.extend(relativeTime);
dayjsOriginal.locale('es', es);

export const dayjsCustom = ((formatDate: string) => {
  return (date?: any) => (date ? dayjsOriginal(date, formatDate) : dayjsOriginal());
})(dateFormat);

export const dayjs = dayjsOriginal;
