import { TasksEntity } from "src/Services/graphql/tasks";

export type TasksCardProps = TasksEntity & {
  disabled?: boolean
}
