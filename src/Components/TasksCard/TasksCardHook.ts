import { useEffect, useState, useRef, useLayoutEffect } from "react";
import { useMutation } from "@apollo/client";

import { GET_TASKS, START_TIMERECORD_MUTATION, STOP_TIMERECORD_MUTATION } from "~/Services/graphql/tasks";
import { timeDurationConverter } from "~/utils/converters/timeDurationConverter";
import type { TasksCardProps } from "./interfaces";
import { fullTimeDurationConverter } from "~/utils/converters/fullTimeDurationConverter";


export const TasksCardHook = (props: TasksCardProps) => {
  const {disabled = false, name, description, id, timerecords, project: {title}} = props;
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const [isTracking, setIsTracking] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(0);
  const [notes, setNotes] = useState<string>("");
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [startTimerecord] = useMutation(START_TIMERECORD_MUTATION);
  const [stopTimerecord] = useMutation(STOP_TIMERECORD_MUTATION);

  const displayedTimer = fullTimeDurationConverter(timer);
  useEffect(() => {
    if (!isTracking) return;
    const timerId = setInterval(() => setTimer(prev => prev + 1), 1000);
    return () => {
      clearInterval(timerId);
    };
  }, [isTracking]);

  useLayoutEffect(() => {
    if (!disabled) return;
    h1Ref.current?.focus();
  }, [disabled]);

  const onStartTimer = () => {
    startTimerecord({
      variables:
        {
          input: {
            taskid: +id,
            notes: "Start notes"
          }
        }
    });
    setIsTracking(!isTracking);
  };

  const onStopTimer = () => {
    setOpenModal(false);
    stopTimerecord({
      variables:
        {
          input: {
            taskid: +id,
            notes: notes || `${title} - ${name}`
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
    h1Ref,
    disabled,
    name,
    description,
    timerecords,
    isTracking,
    displayedTimer,
    notes,
    openModal,
    setOpenModal,
    setNotes,
    onStartTimer,
    onStopTimer
  };
};