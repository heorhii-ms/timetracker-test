export interface TasksQueryProps {
  tasks: (TasksEntity)[] | null;
}

export interface TasksEntity {
  id: string;
  name: string;
  description:string;
  timerecords?: (TimerecordsEntity | null)[] | null;
  taskTotalTimespent: number;
}
export interface TimerecordsEntity {
  id: string;
  timespent: number;
  startdate: string;
  enddate: string;
  running: boolean;
  notes: string;
  task: Task;
  contact: Contact;
}
export interface Task {
  id: string;
}
export interface Contact {
  id: string;
  fullname: string;
}
