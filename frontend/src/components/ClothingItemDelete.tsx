import * as React from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import RemoveIcon from '@mui/icons-material/Remove';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import { useEffect } from "react";
import { Item } from "../types/jsonDataTypes";
import { useState } from "react";

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

export default function DeleteItemModal() {
  const [open, setOpen] = React.useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {setOpen(false);
    window.location.reload();
  } 
  const [id, setId] = useState('');
  const handleChange = (event: SelectChangeEvent) => {
    setId(event.target.value as string);
  };
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("/api/relevantItems")
      .then((res) => {
        console.log(res.data); 
        setData(res.data.items || []); 
      })
      .catch((err) => console.log(err));
  }, []);

  const deleted = () => {
    axios.delete("/api/delete-item/"+id)
      .then(() => {
        window.location.reload();
      })
      .catch((err) => console.log(err));
  }


  return (
    <div>
      <Fab
        sx={{
          position: 'fixed',
          bottom: 16,
          left: 16
        }}
        color="primary"
        aria-label="add"
        onClick={handleOpen} >
        <RemoveIcon />
      </Fab>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="clothingItemDeleteModalTitle"
      >
        <Box sx={style}>
          <Typography id="clothingItemDeleteModalTitle" variant="h6" component="h2">
            Select Clothing Item to delete
          </Typography>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Item</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Select Item to Delete"
              onChange={handleChange}
            >
              {
                data.map((item: Item) => (
                  <MenuItem value={item.id}>{item.deleted==false && item.name}</MenuItem>
                ))
                }
            </Select>
          </FormControl>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={deleted}>Ok</Button>
          </DialogActions>
        </Box>
      </Modal>
    </div>
  );
}
