import { useEffect, useRef, useState } from "react";
import { useMutation } from "@apollo/client";

import { FILTER_TASKS, START_TIMERECORD_MUTATION, STOP_TIMERECORD_MUTATION } from "~/Services/graphql/tasks";
import { timeDurationConverter } from "~/utils/converters/timeDurationConverter";
import type { TasksCardProps } from "./interfaces";


export const TasksCardHook = (props: TasksCardProps) => {
  const {disabled = false, name, description, id, timerecords, project: {title}} = props;
  const h1Ref = useRef<HTMLHeadingElement>();
  const [isTracking, setIsTracking] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(0);
  const [notes, setNotes] = useState<string>("");
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [startTimerecord, startTimerecordResult] = useMutation(START_TIMERECORD_MUTATION);
  const [stopTimerecord, stopTimerecordResult] = useMutation(STOP_TIMERECORD_MUTATION);

  const displayedTimer = timeDurationConverter(timer);
  useEffect(() => {
    if (!isTracking) return;
    const timerId = setInterval(() => setTimer(prev => prev + 1), 60000);
    return () => {
      clearInterval(timerId);
    };
  }, [isTracking]);

  useEffect(() => {
    if (!disabled) return;
    h1Ref.current!.focus();
  }, [disabled]);

  useEffect(() => {
    if (startTimerecordResult.error || stopTimerecordResult.error) {
      const conf = window.confirm("Something went wrong, please reload page");
      if (conf) {
        window.location.reload();
      } else {
        window.location.reload();
      }
    }
  }, [startTimerecordResult.error, stopTimerecordResult.error]);

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

  const addNotes = (notes: string) => {
    setOpenModal(false);
    stopTimerecord({
      variables:
        {
          input: {
            taskid: +id,
            notes: notes
          }
        },
      refetchQueries: [
        FILTER_TASKS,
        "GET_TASKS"
      ]

    });
    setTimer(0);
    setIsTracking(!isTracking);
  };

  const onAddNotes = () => {
    addNotes(notes || `${title} - ${name}`);

  };

  const onCancel = () => {
    addNotes(`${title} - ${name}`);
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
    onAddNotes,
    onCancel
  };
};