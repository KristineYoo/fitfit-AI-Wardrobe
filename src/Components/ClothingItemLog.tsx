import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import ThicknessSelect from './ThicknessSelect-logItem';
import SelectStyleTagList from './StyleTag'
import SeasonTagList from './SeasonTag'
import OccasionTagList from './OccasionTag'
import MoodTagList from './MoodTag'
import SelectCurrency from './CurrencySelect'
import SelectDate from './DateInput'
import DamageScale from './Damage-logclothingitem';
import DisplayButton from './DisplaySwitch-logItem'
import FabricSelect from './FabricSelect';
import TypeSelect from './TypeSelect';

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
          <Typography id="clothingItemLogModalTitle" variant="h6" component="h2">
            Uplaod Clothing Item
          </Typography>
          <TextField id="uploadItem-name" label="Name of Item" variant="outlined" fullWidth sx={{ my: 2 }} />
          <TextField id="uploadItem-Notes" label="Notes" variant="outlined" fullWidth sx={{ my: 2 }} />
          <TypeSelect />
          <TextField id="uploadclothing-brand" label="Brand" variant="outlined" fullWidth sx={{ my: 2 }} />

          Clothing Styles

          <SelectStyleTagList />
          <SeasonTagList />
          <OccasionTagList />
          <MoodTagList />

          Purchase Info
          <TextField id="purchaseInfo-price" label="Price" variant="outlined" fullWidth sx={{ my: 2 }} />
          <SelectCurrency />

          <TextField id="purchaseInfo-link" label="Link to Shop" variant="outlined" fullWidth sx={{ my: 2 }} />
          Enter Date Purchased
          <SelectDate />
          <TextField id="purchaseInfo-resaleVal" label="Resale Value" variant="outlined" fullWidth sx={{ my: 2 }} />
          Select Condition of Clothing Article
          <DamageScale />
          <TextField id="Status-location" label="Where is this clothing item" variant="outlined" fullWidth sx={{ my: 2 }} />
          Reccomend this piece of clothing in outfits?
          <DisplayButton />
          <FabricSelect />
          <TextField id="fabric-material" label="What are the care instructions for this clothing item" variant="outlined" fullWidth sx={{ my: 2 }} />
          <ThicknessSelect />




        </Box>
      </Modal>
    </div>
  );
}
