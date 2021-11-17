import React from "react";
import { Button } from "@mui/material";

import { TimeRecords } from "~/Components/TimeRecords";
import { TasksCardHook } from "~/Components/TasksCard/TasksCardHook";
import type { TasksCardProps } from "./interfaces";

import styles from "./TasksCardStyles.module.scss";
import clsx from "clsx";

export const TasksCard: React.FC<TasksCardProps> = (props) => {
  const {
    disabled,
    name,
    description,
    timerecords,
    onStartTime,
    onStopTimer
  } = TasksCardHook(props);

  return (
    <div className={clsx(styles.root, {[styles.enable]: !disabled})}>
      <h4>{name}</h4>
      <span>{description}</span>
      <div className={clsx(styles.track_functionality, {[styles.viewed]: !disabled})}>
        {timerecords && timerecords?.length > 0
          ? (<TimeRecords timerecords={timerecords} />)
          : (<h4>This task without timerecords</h4>)}
        <div>
          <Button
            variant="contained"
            disabled={disabled}
            onClick={onStartTime}>
            Start Timer
          </Button>
          <Button
            variant="contained"
            disabled={disabled}
            onClick={onStopTimer}>
            Stop Timer
          </Button>
        </div>
      </div>
    </div>
  );
};