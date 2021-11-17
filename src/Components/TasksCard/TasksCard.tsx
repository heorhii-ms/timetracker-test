import React from "react";
import { Button, Modal, TextField } from "@mui/material";

import { TimeRecords } from "~/Components/TimeRecords";
import { TasksCardHook } from "~/Components/TasksCard/TasksCardHook";
import type { TasksCardProps } from "./interfaces";

import styles from "./TasksCardStyles.module.scss";
import clsx from "clsx";

export const TasksCard: React.FC<TasksCardProps> = (props) => {
  const {
    ref,
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
  } = TasksCardHook(props);

  return (
    <div className={clsx(styles.root, {[styles.enable]: !disabled})}>
      <h4 ref={ref}>Task: <i>{name}</i></h4>
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
            <Modal
              open={openModal}
              onClose={onStopTimer}
              aria-labelledby="parent-modal-title"
              aria-describedby="parent-modal-description">
              <div className={styles.modal}>
                <TextField
                  id="outlined-multiline-flexible"
                  label="Notes"
                  multiline
                  // maxRows={4}
                  value={notes}
                  onChange={(event) => {
                    setNotes(event.target.value);
                  }}
                />
                <div>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={onStopTimer}>
                    Add notes
                  </Button>
                  <Button
                    fullWidth
                    color="error"
                    variant="contained"
                    onClick={onStopTimer}>
                    Cancel
                  </Button>
                </div>
              </div>
            </Modal>

          </div>
        </div>
      </div>
    </div>
  )
    ;
};