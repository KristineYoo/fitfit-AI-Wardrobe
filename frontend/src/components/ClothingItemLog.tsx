import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function LogItemModal() {
  const [open, setOpen] = React.useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Fab
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16
        }}
        color="primary"
        aria-label="add"
        onClick={handleOpen} >
        <AddIcon />
      </Fab>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="clothingItemLogModalTitle"
      >
        <Box sx={style}>
          <Typography id="clothingItemLogModalTitle" variant="h6" component="h2">
            Uplaod Clothing Item
          </Typography>
          <TextField id="outlined-basic" label="Name of Item" variant="outlined" fullWidth sx={{ mt: 2 }} />
          <TextField id="standard-basic" label="Notes" variant="standard" fullWidth sx={{ mt: 2 }} />
        </Box>
      </Modal>
    </div>
  );
}
