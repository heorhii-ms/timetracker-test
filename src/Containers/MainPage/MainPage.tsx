import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { Autocomplete, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from "@mui/material";

import type { TasksEntity, TasksQueryProps } from "~/Services/graphql/tasks";
import { FILTER_TASKS } from "~/Services/graphql/tasks";
import { TasksCard } from "~/Components/TasksCard";

import styles from "./MainPageStyles.module.scss";


export const MainPage: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const {error, loading, data} = useQuery<TasksQueryProps>(FILTER_TASKS, {
    variables: {
      searchTerm: search
    }
  });
  const [tasks, setTasks] = useState<TasksEntity[]>([]);
  const [value, setValue] = useState<string | null>(null);

  useEffect(() => {
    if (!data?.tasks) return;
    setTasks(data.tasks);
    if (!value) {
      setValue(data.tasks[0].id);
    }
  }, [data]);

  if (loading) return <div className={styles.root}><h3>Loading...</h3></div>;
  if (error) return <div className={styles.root}><h3>Error: {error.message}</h3></div>;

  return (
    <div className={styles.root}>
      <Autocomplete
        options={tasks.map(task => task.name)}
        freeSolo
        noOptionsText="No tasks found..."
        renderInput={(params) => <TextField {...params} label="Search..." />}
        value={search}
        onChange={(_, value) => {
          setSearch(value || "");
        }}
      />

      <FormControl component="fieldset" className={styles.form}>

        <FormLabel component="legend">Tasks</FormLabel>
        {tasks.length === 0
          ? (<h2>No tasks found...</h2>)
          : (<RadioGroup
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
          </RadioGroup>)
        }
      </FormControl>
    </div>
  );
};