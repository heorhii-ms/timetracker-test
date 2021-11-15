import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";

import { LOAD_TASKS } from "../../Graphql/Queries";

export const GetTasks: React.FC = () => {
  const {error, loading, data} = useQuery(LOAD_TASKS);
  const [tasks, setTasks] = useState<any>([]);


  useEffect(() => {
    if (!data) return;
    setTasks(data.tasks);
    console.log("-> tasks", tasks);
  }, [data, tasks]);
  return <></>;
};