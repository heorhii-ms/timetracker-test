import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";

import { GET_TASKS, START_TIMERECORD_MUTATION, STOP_TIMERECORD_MUTATION } from "~/Services/graphql/tasks";
import { timeDurationConverter } from "~/utils/converters/timeDurationConverter";
import type { TasksCardProps } from "./interfaces";
import { fullTimeDurationConverter } from "~/utils/converters/fullTimeDurationConverter";


export const TasksCardHook = (props: TasksCardProps) => {
  const {disabled = false, name, description, taskTotalTimespent, id, timerecords, project: {title}} = props;
  const [isTracking, setIsTracking] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(0);
  const [startTimerecord, startTimerecordState] = useMutation(START_TIMERECORD_MUTATION);
  const [stopTimerecord, stopTimerecordState] = useMutation(STOP_TIMERECORD_MUTATION);

  const displayedTime = timeDurationConverter(taskTotalTimespent);
  const displayedTimer = fullTimeDurationConverter(timer);
  useEffect(() => {
    if (!isTracking) return;
    const timerId = setInterval(() => setTimer(prev => prev + 1), 1000);
    return () => {
      clearInterval(timerId);
    };
  }, [isTracking]);

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
    setIsTracking(!isTracking);
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
    setIsTracking(!isTracking);
  };

  return {
    disabled,
    name,
    description,
    displayedTime,
    timerecords,
    isTracking,
    displayedTimer,
    onStartTime,
    onStopTimer
  };
};