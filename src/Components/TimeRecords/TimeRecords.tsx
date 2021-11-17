import React from "react";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

import { timeDurationConverter } from "~/utils/converters/timeDurationConverter";
import { dataTimeToTimeConverter } from "~/utils/converters/dataTimeToTimeConverter";
import { dataTimeToDateConverter } from "~/utils/converters/dataTimeToDateConverter";
import type { TimeRecordsProps } from "./interfaces";

import styles from "./TimeRecordsStyles.module.scss";

export const TimeRecords: React.FC<TimeRecordsProps> = ({timerecords}) => {

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
            <TableCell align="right">Start time</TableCell>
            <TableCell align="right">Stop time</TableCell>
            <TableCell align="right">Time tracked</TableCell>
            <TableCell align="right">Tracked by</TableCell>
            <TableCell align="right">Notes</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {timerecords && timerecords.map(timerecord => {
              const {id, notes, startdate, enddate, timespent, contact} = timerecord;
              return (
                <TableRow
                  key={id}
                  sx={{"&:last-child td, &:last-child th": {border: 0}}}
                >
                  <TableCell component="th" scope="row">
                    {dataTimeToDateConverter(startdate)}
                  </TableCell>
                  <TableCell align="right">{dataTimeToTimeConverter(startdate)}</TableCell>
                  <TableCell align="right">{dataTimeToTimeConverter(enddate)}</TableCell>
                  <TableCell align="right">{timeDurationConverter(timespent)}</TableCell>
                  <TableCell align="right">{contact.fullname}</TableCell>
                  <TableCell align="right">{notes}</TableCell>
                </TableRow>);
            }
          )}

        </TableBody>
      </Table>
    </TableContainer>
  );
};
