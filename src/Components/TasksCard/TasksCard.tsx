import React, { useEffect, useState } from "react";
import moment from "moment";
import { Button } from "@mui/material";
import { useMutation } from "@apollo/client";


import { timeFormat } from "../../constants";
import { START_TIMERECORD_MUTATION, STOP_TIMERECORD_MUTATION } from "../../Services/Graphql/mutations/tasksMutations";
import type { TasksEntity, TimerecordsEntity } from "../../Services/Graphql/queries/interfaces/tasksQueriesInterfaces";

import styles from "./TasksCardStyles.module.scss";
import { StartTimerecordInput } from "Services/Graphql/queries/interfaces/tasksMutationsInterfaces";


export type TasksCardProps = TasksEntity & {
  disabled?: boolean
}

export const TasksCard: React.FC<TasksCardProps> = (props) => {
  const {disabled = false, name, description, taskTotalTimespent, id} = props;
  const [startTimerecord] = useMutation(START_TIMERECORD_MUTATION);
  const [stopTimerecord] = useMutation(STOP_TIMERECORD_MUTATION);

  const displayedTime = moment(taskTotalTimespent, "minutes").format(timeFormat);


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

  return (
    <div className={styles.root}>
      <div className={styles.info}>
        <h4>{name}</h4>
        <span>{description}</span>
      </div>
      <div className={styles.tracker}>
        <div>
          <h4>Time</h4>
          {displayedTime}
        </div>
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
            onClick={onEndTimer}>
            Stop Timer
          </Button>
        </div>
      </div>
    </div>
  );
};