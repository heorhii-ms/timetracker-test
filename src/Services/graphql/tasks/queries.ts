import { gql } from "@apollo/client";

import { TIMERECORD_INFO } from "./fragments";

export const GET_TASKS = gql`

${TIMERECORD_INFO}

query GET_TASKS {
  tasks(
    input: {
      limit: 10
      orderby: { name: asc }
      where: { 
          displaytype:{NEQ:heading},
          status: { EQ: active } }
    }
  ) {
    id
    name
    timerecords {
      ...TIMERECORD_INFO
    }
    taskTotalTimespent: timespent
  }
}
`;