export const TIMERECORD_INFO = `
fragment TIMERECORD_INFO on Timerecord {
  id
  timespent
  startdate
  enddate
  running
  notes
  task{
    id
  }
  contact {
    id
    fullname
  }
}`;