import { gql } from "@apollo/client";

export const LOAD_TASKS = gql`
  query{
    tasks {
      id
      name
      description
      timerecords {
        id
        timespent
        notes
      }
    }
  }
`;