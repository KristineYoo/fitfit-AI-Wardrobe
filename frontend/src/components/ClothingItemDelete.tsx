// frontend/src/components/ClothingItemDelete.tsx
// Last changed by Bao Vuong, 6:28PM 4/26/2025
// Mod by Iain Gore 5/9/25

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
  const [mess, setMess] = useState("")
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    window.location.reload();
  }
  const [id, setId] = useState('');
  const handleChange = (event: SelectChangeEvent) => {
    setId(event.target.value as string);
  };
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("/api/item/")
      .then((res) => {
        console.log(res.data);
        setData(res.data.items || []);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (mess!="") {
      sessionStorage.setItem("Status", mess)
    }
  })

  const deleted = () => {
    axios.delete("/api/item/delete-item/" + id)
      .then(() => {
        setMess("Delete")
        window.location.reload();
      })
      .catch((err) => setMess("Error"));
  }


  return (
    <div>
      <Fab
        sx={{
          position: 'fixed',
          bottom: 16,
          left: 16,
          bgcolor: '#f5e6e8',
          '&:hover': { bgcolor: 'error.main', color: 'common.white' },

        }}
        color="error"
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
                  <MenuItem value={item.id}>{item.deleted == false && item.name}</MenuItem>
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
