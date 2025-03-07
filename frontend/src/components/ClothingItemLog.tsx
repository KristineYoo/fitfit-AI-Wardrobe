import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import SelectStyleTagList from './LogClothingItemform-Components/styleTag'
import SeasonTagList from './LogClothingItemform-Components/seasonTag'
import OccasionTagList from './LogClothingItemform-Components/occasionTag'
import MoodTagList from './LogClothingItemform-Components/moodTag'
import FabricSelect from './LogClothingItemform-Components/fabricSelect';
import ThicknessSelect from './LogClothingItemform-Components/thicknessSelect-logItem';

import TypeSelect from './LogClothingItemform-Components/typeSelect';



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
  maxHeight: '80vh',  // Set max height for modal
  overflowY: 'auto',  // Enable vertical scrolling
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
          <Typography id="clothingItemLogModalTitle" variant="h6" component="h2" sx={{ color: 'black' }}>
            Upload Clothing Item
          </Typography>
          <TextField id="uploadItem-name" label="Name of Item" variant="outlined" fullWidth sx={{ my: 2 }} />
          <TextField id="uploadItem-Notes" label="Notes" variant="outlined" fullWidth sx={{ my: 2 }} />
          <TypeSelect />
          <p style={{ color: "black" }}>Clothing Styles</p>



          <SelectStyleTagList />
          <SeasonTagList />
          <OccasionTagList />
          <MoodTagList />
          <p style={{ color: "black" }}>Fabric </p>
          <FabricSelect />
          <ThicknessSelect />






        </Box>
      </Modal>
    </div>
  );
}
