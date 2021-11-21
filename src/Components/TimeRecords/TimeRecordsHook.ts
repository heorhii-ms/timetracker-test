import type { PropsWithChildren } from "react";
import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";

import { FILTER_TASKS, UPDATE_TIMERECORD_NOTES_MUTATION } from "~/Services/graphql/tasks";
import type { TimeRecordsProps } from "./interfaces";

export const TimeRecordsHook = (props: PropsWithChildren<TimeRecordsProps>) => {
  const {timerecords} = props;
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [editedNotes, setEditedNotes] = useState<string>("");
  const [updateTimerecordNotes, {error}] = useMutation(UPDATE_TIMERECORD_NOTES_MUTATION);

  const displayedRecords = timerecords.slice().sort((a, b) =>
    +a.id < +b.id
      ? 1
      : +a.id > +b.id
        ? -1 : 0);

  const onEditNotes = (notes: string) => {
    setEditedNotes(notes);
    setOpenModal(true);
  };

  const closeModal = () => {
    setEditedNotes("");
    setOpenModal(false);
  };

  const onAddNotes = (timeRecordId: string) => {
    updateTimerecordNotes({
      variables:
        {
          input: {
            notes: editedNotes,
            id: +timeRecordId,

          }
        },
      refetchQueries: [
        FILTER_TASKS,
        "GET_TASKS"
      ]
    });

    closeModal();
  };

  useEffect(() => {
    if (error) {
      const conf = window.confirm("Something went wrong, please reload page");
      if (conf) {
        window.location.reload();
      } else {
        window.location.reload();
      }
    }
  }, [error]);


  return {
    displayedRecords,
    openModal,
    editedNotes,
    setEditedNotes,
    onEditNotes,
    onAddNotes,
    closeModal,
    error
  };
};
