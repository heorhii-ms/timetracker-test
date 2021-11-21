import React, { useRef } from "react";
import { Button, Modal, TextField } from "@mui/material";
import type { NotesModalProps } from "./interfaces";

import styles from "./NotesModalStyles.module.scss";

export const NotesModal: React.FC<NotesModalProps> = (props) => {
  const {
    value,
    onChange,
    openModal,
    onAdd,
    onCancel
  } = (props);

  return (

    <Modal
      open={openModal}
      onClose={onCancel}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description">
      <div className={styles.modal}>
        <TextField
          autoFocus
          id="outlined-multiline-flexible"
          label="Notes"
          multiline
          value={value}
          onChange={(event) => {
            onChange(event.target.value);
          }}
        />
        <div>
          <Button
            fullWidth
            variant="contained"
            onClick={onAdd}>
            Add notes
          </Button>
          <Button
            fullWidth
            color="error"
            variant="contained"
            onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};