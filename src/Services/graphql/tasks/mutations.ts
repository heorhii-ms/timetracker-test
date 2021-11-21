import { gql } from "@apollo/client";

import { TIMERECORD_INFO } from "./fragments";

export const START_TIMERECORD_MUTATION = gql`
${TIMERECORD_INFO}
mutation START_TIMERECORD($input: StartTimerecordInput) {
  startTimerecord(input: $input) {
    ...TIMERECORD_INFO
  }
}
`;

export const STOP_TIMERECORD_MUTATION = gql`
${TIMERECORD_INFO}
mutation STOP_TIMERECORD($input: StartTimerecordInput) {
  stopTimerecord(input: $input) {
   ...TIMERECORD_INFO
    }
}
`;

export const UPDATE_TIMERECORD_NOTES_MUTATION = gql`
${TIMERECORD_INFO}
mutation UPDATE_TIMERECORD_NOTES($input: UpdateTimerecordNotesInput) {
  updateTimerecordNotes(input: $input) {
  ...TIMERECORD_INFO
  }
}`;