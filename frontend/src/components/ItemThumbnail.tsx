// frontend/src/components/ItemThumbnail.tsx
// Last changed by Bao Vuong, 6:29PM 4/26/2025

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { Item } from '../types/jsonDataTypes.ts'
import { Box, Button } from '@mui/material';
import axios from 'axios';
import RemoveIcon from '@mui/icons-material/Remove';
import LogItemModal from './ClothingItemLog.tsx';
import React from 'react';
import EditIcon from '@mui/icons-material/Edit';


export default function ItemThumbnail({ item }: { item: Item }) {
  const [openModal, setOpenModal] = React.useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const deleted = () => {
    axios.delete("/api/item/delete-item/" + String(item.id))
      .then(() => {
        window.location.reload();
      })
      .catch((err) => console.log(err));
  }
  if (item.deleted == false && item.visibility == "shown")
    return (
      <Card sx={{ maxWidth: 300 }}>
        <Box textAlign='right'>
          <Button onClick={deleted} startIcon={<RemoveIcon />} variant='contained' style={{ height: '30px', width: '20px' }}></Button>
          <Button onClick={handleOpenModal} startIcon={<EditIcon />} variant='contained' style={{ height: '30px', width: '20px' }}></Button>
        </Box>
        <CardMedia
          component="img"
          alt={item.name}
          height="140"
          image={item.imageData ?? undefined}
          //This is what should be sizing the photos
          sx={{ p: 1, objectFit: "contain", mx: "auto" }}
        />
        <CardContent sx={{ mt: 2 }}>
          <Typography gutterBottom variant="h5" component="div">
            {item.name}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {item.note}
          </Typography>
        </CardContent>
        <Stack direction="row" spacing={1} sx={{ p: 1 }}>

          {
            item.styling.tags.map((tag: string, i: number) => (
              <Chip label={tag} color="success" variant="outlined" key={"stylingTag" + i} />
            ))
          }

        </Stack>
        <LogItemModal open={openModal} onClose={handleCloseModal} item={item} />
      </Card>
    );
}
