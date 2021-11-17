import moment from "moment";
import { timeFullFormat } from "~/constants";

export const fullTimeDurationConverter = (timeDuration: number) => {
  const duration = moment.duration(timeDuration, "seconds").asMilliseconds();
  return moment.utc(duration).format(timeFullFormat);
};