import _dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";

import "dayjs/locale/ru";

_dayjs.locale("ru");
_dayjs.extend(LocalizedFormat);

export { default as dayjs } from "dayjs";
