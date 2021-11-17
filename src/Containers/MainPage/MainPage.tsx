import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";

import { GET_TASKS } from "~/Services/graphql/tasks";
import { TasksCard } from "~/Components/TasksCard";
import type { TasksQueryProps, TasksEntity } from "~/Services/graphql/tasks";

import styles from "./MainPageStyles.module.scss";


export const MainPage: React.FC = () => {
  const {error, loading, data} = useQuery<TasksQueryProps>(GET_TASKS);
  const [tasks, setTasks] = useState<TasksEntity[] | null>(null);
  const [value, setValue] = useState<string | null>(null);

  useEffect(() => {
    console.log("-> data?.tasks", data?.tasks);
    if (!data?.tasks) return;
    setTasks(data.tasks);
    // setValue(data.tasks[0].id);
  }, [data]);

  if (!tasks) return null;

  return (
    <div className={styles.root}>
      <FormControl component="fieldset" className={styles.form}>
        <FormLabel component="legend">Tasks</FormLabel>
        <RadioGroup
          aria-label="task"
          name="radio-buttons-group"
          value={value}
          onChange={(_, value) => {
            setValue(value);
          }}
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
      </FormControl>
    </div>
  );
};