import { useMutation } from "@apollo/client";

import { START_TIMERECORD_MUTATION, STOP_TIMERECORD_MUTATION } from "~/Services/graphql/tasks";
import { timeDurationConverter } from "~/utils/converters/timeDurationConverter";
import type { TasksCardProps } from "./interfaces";


export const TasksCardHook = (props: TasksCardProps) => {
  const {disabled = false, name, description, taskTotalTimespent, id, timerecords} = props;
  const [startTimerecord] = useMutation(START_TIMERECORD_MUTATION);
  const [stopTimerecord] = useMutation(STOP_TIMERECORD_MUTATION);

  const displayedTime = timeDurationConverter(taskTotalTimespent);

  const onStartTime = () => {
    startTimerecord({
      variables:
        {
          input: {
            taskid: +id,
            notes: "sddfdsdfdsf"
          }
        }
    });
  };

  const onEndTimer = () => {
    stopTimerecord({
      variables:
        {
          input: {
            taskid: +id,
            notes: "sddfdsdfdsf"
          }
        }
    });
  };

  return {
    disabled,
    name,
    description,
    displayedTime,
    timerecords,
    onStartTime,
    onEndTimer
  };
};