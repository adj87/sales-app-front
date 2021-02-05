import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjsBusinessDays from 'dayjs-business-days';
import es from 'dayjs/locale/es';



dayjs.extend(dayjsBusinessDays);
dayjs.extend(customParseFormat);
dayjs.extend(relativeTime);
dayjs.locale('es', es);

export default dayjs