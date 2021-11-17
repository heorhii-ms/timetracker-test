import moment from "moment";
import { timeFormat } from "~/constants";

export const timeDurationConverter = (timeDuration: number) => {
  const duration = moment.duration(timeDuration, "minutes").asMilliseconds();
  return moment.utc(duration).format(timeFormat);
};