import { gql } from "@apollo/client";

import { TIMERECORD_INFO } from "../infos/tasksInfos";

export const GET_TASKS = gql`
query GET_TASKS {
  tasks {
    id
    name
    timerecords 
    ${TIMERECORD_INFO}
    taskTotalTimespent: timespent
  }
}
`;