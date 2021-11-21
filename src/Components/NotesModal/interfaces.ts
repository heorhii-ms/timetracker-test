import type { Dispatch, SetStateAction } from "react";

export type NotesModalProps = {
  value: string,
  onChange: Dispatch<SetStateAction<string>>,
  openModal: boolean,
  onAdd: () => void,
  onCancel: () => void
}
