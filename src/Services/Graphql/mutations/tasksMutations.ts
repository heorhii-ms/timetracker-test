import { gql } from "@apollo/client";

import { TIMERECORD_INFO } from "../infos/tasksInfos";

export const START_TIMERECORD_MUTATION = gql`
mutation startTimerecord($input: StartTimerecordInput) {
  startTimerecord(
  input:$input
  )
  ${TIMERECORD_INFO}
  }
`;

export const STOP_TIMERECORD_MUTATION = gql`
mutation stopTimerecord($input: StartTimerecordInput) {
  stopTimerecord (
  input:$input
  )
  ${TIMERECORD_INFO}    
}
`;