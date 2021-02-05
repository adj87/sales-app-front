import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjsBusinessDays from 'dayjs-business-days';
import es from 'dayjs/locale/es';

const dateFormat = process.env.REACT_APP_FORMAT_DATE || '';

dayjs.extend(dayjsBusinessDays);
dayjs.extend(customParseFormat);
dayjs.extend(relativeTime);
dayjs.locale('es', es);

const dayjsWithDefaultFormat = (formatDate: string) => {
  return (date?: any) => (date ? dayjs(date, formatDate) : dayjs());
};

export default dayjsWithDefaultFormat(dateFormat);
