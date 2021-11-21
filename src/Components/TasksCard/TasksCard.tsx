import React from "react";
import { Button } from "@mui/material";

import { TimeRecords } from "~/Components/TimeRecords";
import { TasksCardHook } from "~/Components/TasksCard/TasksCardHook";
import type { TasksCardProps } from "./interfaces";

import styles from "./TasksCardStyles.module.scss";
import clsx from "clsx";
import { NotesModal } from "~/Components/NotesModal";

export const TasksCard: React.FC<TasksCardProps> = (props) => {
  const {
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
    onCancel,
  } = TasksCardHook(props);

  return (
    <div className={clsx(styles.root, {[styles.enable]: !disabled})}>
      <h4 ref={ref => h1Ref.current = ref!}>Task: <i>{name}</i></h4>
      <span>{description}</span>
      <div className={clsx(styles.track_functionality, {[styles.viewed]: !disabled})}>
        {timerecords && timerecords?.length > 0
          ? (<TimeRecords timerecords={timerecords} />)
          : (<h4>This task without timerecords</h4>)}
        <div className={styles.buttons}>
          <div className={clsx(styles.tracker, {[styles.viewed]: !isTracking})}>
            <Button
              fullWidth
              variant="contained"
              disabled={disabled}
              onClick={onStartTimer}
            >
              Start Timer
            </Button>
          </div>

          <div className={clsx(styles.tracker, {[styles.viewed]: isTracking})}>
            <span><b>Time spend: </b></span>
            <span>{displayedTimer} (HH:mm:ss)</span>
            <Button
              fullWidth
              variant="contained"
              disabled={disabled}
              onClick={() => {
                setOpenModal(true);
              }}>
              Stop Timer
            </Button>
            <NotesModal
              value={notes}
              onChange={setNotes}
              openModal={openModal}
              onAdd={onAddNotes}
              onCancel={onCancel} />
          </div>
        </div>
      </div>
    </div>
  );
};