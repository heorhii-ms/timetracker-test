import { useMutation } from "@apollo/client";

import { GET_TASKS, START_TIMERECORD_MUTATION, STOP_TIMERECORD_MUTATION } from "~/Services/graphql/tasks";
import { timeDurationConverter } from "~/utils/converters/timeDurationConverter";
import type { TasksCardProps } from "./interfaces";


export const TasksCardHook = (props: TasksCardProps) => {
  const {disabled = false, name, description, taskTotalTimespent, id, timerecords, project: {title}} = props;
  const [startTimerecord, startTimerecordState] = useMutation(START_TIMERECORD_MUTATION);
  const [stopTimerecord, stopTimerecordState] = useMutation(STOP_TIMERECORD_MUTATION);

  const displayedTime = timeDurationConverter(taskTotalTimespent);

  const onStartTime = () => {
    startTimerecord({
      variables:
        {
          input: {
            taskid: +id,
            notes: `${title} ${name}`
          }
        }
    });
  };

  const onStopTimer = () => {
    stopTimerecord({
      variables:
        {
          input: {
            taskid: +id,
          }
        },
      refetchQueries: [
        GET_TASKS,
        "GET_TASKS"
      ]

    });
  };

  return {
    disabled,
    name,
    description,
    displayedTime,
    timerecords,
    onStartTime,
    onStopTimer
  };
};