import { gql } from "@apollo/client";

export const TIMERECORD_INFO = `
{
      id
      timespent
      startdate
      enddate
      running
      notes
      task {
        id
      }
      contact {
        id
        fullname
      }
    }`;