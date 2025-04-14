
import { Fab, Modal, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import LogItemModal from "./ClothingItemLog";
import React, { useState } from "react";



const FloatingActionButton: React.FC = () => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <Fab
                color="primary"
                aria-label="add"
                style={{
                    position: "fixed",
                    bottom: "20px",
                    right: "20px",
                }}
                onClick={handleOpen}
            >
                <AddIcon />
            </Fab>
            <Modal open={open} onClose={handleClose}>
                <Box>
                    <LogItemModal open={open} onClose={handleClose} />
                </Box>
            </Modal>
        </>
    );
};

export default FloatingActionButton;

