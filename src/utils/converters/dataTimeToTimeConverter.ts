import moment from "moment";
import { timeFormat } from "~/constants";

export const dataTimeToTimeConverter = (dateTime: string) => moment(dateTime).format(timeFormat);