import moment from "moment";
import { dateFormat } from "~/constants";

export const dataTimeToDateConverter = (dateTime: string) => moment(dateTime).format(dateFormat);