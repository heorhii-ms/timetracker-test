import React from "react";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

import { timeDurationConverter } from "~/utils/converters/timeDurationConverter";
import { dataTimeToTimeConverter } from "~/utils/converters/dataTimeToTimeConverter";
import { dataTimeToDateConverter } from "~/utils/converters/dataTimeToDateConverter";
import { NotesModal } from "~/Components/NotesModal";
import { TimeRecordsHook } from "~/Components/TimeRecords/TimeRecordsHook";
import type { TimeRecordsProps } from "./interfaces";

import styles from "./TimeRecordsStyles.module.scss";

export const TimeRecords: React.FC<TimeRecordsProps> = (props) => {
  const {
    displayedRecords,
    openModal,
    editedNotes,
    setEditedNotes,
    onEditNotes,
    onAddNotes,
    closeModal
  } = TimeRecordsHook(props);

  return (
    <TableContainer
      sx={{width: "900px"}}
      component={Paper}
      className={styles.root}
    >
      <Table aria-label="a time records table">
        <TableHead>
          <TableRow>
            <TableCell>Start date</TableCell>
            <TableCell align="center">Start time</TableCell>
            <TableCell align="center">Stop time</TableCell>
            <TableCell align="center">Time tracked</TableCell>
            <TableCell align="center">Tracked by</TableCell>
            <TableCell align="center">Notes</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {displayedRecords
            .map(timerecord => {
                const {id, notes, startdate, enddate, timespent, contact} = timerecord;
                return (
                  <TableRow
                    key={id}
                    sx={{"&:last-child td, &:last-child th": {border: 0}}}
                  >
                    <TableCell component="th" scope="row">
                      {dataTimeToDateConverter(startdate)}
                    </TableCell>
                    <TableCell align="center">{dataTimeToTimeConverter(startdate)}</TableCell>
                    <TableCell align="center">{dataTimeToTimeConverter(enddate)}</TableCell>
                    <TableCell align="center">{timeDurationConverter(timespent)}</TableCell>
                    <TableCell align="center">{contact.fullname}</TableCell>
                    <TableCell align="right">
                      {notes}&nbsp;
                      <button onClick={() => onEditNotes(notes)}>Edit</button>
                      <NotesModal
                        value={editedNotes}
                        onChange={setEditedNotes}
                        openModal={openModal}
                        onAdd={() => onAddNotes(id)}
                        onCancel={closeModal} />
                    </TableCell>
                  </TableRow>);
              }
            )}

        </TableBody>
      </Table>
    </TableContainer>
  );
};
