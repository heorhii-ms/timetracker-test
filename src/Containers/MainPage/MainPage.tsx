import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import { useForm, Controller } from "react-hook-form";

import { GET_TASKS } from "~/Services/graphql/tasks";
import { TasksCard } from "~/Components/TasksCard";
import type { TasksQueryProps, TasksEntity } from "~/Services/graphql/tasks";

import styles from "./MainPageStyles.module.scss";


export const MainPage: React.FC = () => {
  const {error, loading, data} = useQuery<TasksQueryProps>(GET_TASKS);
  const [tasks, setTasks] = useState<TasksEntity[] | null>(null);
  const {control} = useForm();

  useEffect(() => {
    console.log("-> data?.tasks", data?.tasks);
    if (!data) return;
    setTasks(data?.tasks);

  }, [data]);

  if (!tasks) return null;

  return (
    <div className={styles.root}>
      <FormControl component="fieldset" className={styles.form}>
        <FormLabel component="legend">Tasks</FormLabel>
        <Controller
          control={control}
          name="taskId"
          defaultValue={tasks[0]?.id}
          render={({field: {value, onChange, onBlur}}) =>
            <RadioGroup
              aria-label="task"
              name="radio-buttons-group"
              value={value}
              onChange={onChange}
              onBlur={onBlur}
            >

              {tasks.map(task =>
                <FormControlLabel
                  key={task.id}
                  value={task.id}
                  control={<Radio />}
                  label={
                    <TasksCard
                      {...task}
                      disabled={value !== task.id} />
                  }
                />
              )}

            </RadioGroup>
          } />
      </FormControl>
    </div>
  );
};