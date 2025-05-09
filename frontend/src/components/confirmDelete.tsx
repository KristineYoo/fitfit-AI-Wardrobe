// frontend/src/components/ConfirmDeleteDialog.tsx

import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

interface ConfirmDeleteDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    itemName?: string;
}

const ConfirmDeleteDialog: React.FC<ConfirmDeleteDialogProps> = ({
    open,
    onClose,
    onConfirm,
    itemName,
}) => (
    <Dialog open={open} onClose={onClose}>
        <DialogTitle>Delete Item</DialogTitle>
        <DialogContent>
            <DialogContentText>
                Are you sure you want to delete <strong>{itemName ? `"${itemName}"` : "this item"}</strong>? This action cannot be undone.
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose} color="primary" variant="outlined">
                Cancel
            </Button>
            <Button onClick={onConfirm} color="error" variant="contained">
                Delete
            </Button>
        </DialogActions>
    </Dialog>
);

export default ConfirmDeleteDialog;
