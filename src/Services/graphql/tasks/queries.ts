import { gql } from "@apollo/client";

import { TIMERECORD_INFO } from "./fragments";

export const FILTER_TASKS = gql`

${TIMERECORD_INFO}

query FILTER_TASKS($searchTerm: String) {
  tasks(
    input: {
      limit: 10
      orderby: { name: asc }
      where: { 
          displaytype:{NEQ:heading},
          status: { EQ: active }, 
          name: { LIKE: $searchTerm } 
        }
    }
  ) {
    id
    name
    timerecords {
      ...TIMERECORD_INFO
    }
    project {
      title
    }
    taskTotalTimespent: timespent
  }
}
`;