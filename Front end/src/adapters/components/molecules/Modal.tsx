
import * as React from 'react';
import Dialog from '@mui/material/Dialog';


export interface IModalProps {
  open: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
}

const  Modal = (props: IModalProps) => {
  const { onClose,  open, children } = props;

  const handleClose = () => {
    onClose();
  };

 

  return (
    <Dialog onClose={handleClose} open={open}>
      {children}
    </Dialog>
  );
}
export default Modal;