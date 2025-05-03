// frontend/src/components/ItemThumbnail.tsx
// Last changed by Bao Vuong, 6:29PM 4/26/2025

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { Item } from '../types/jsonDataTypes.ts'
import { Box, IconButton } from '@mui/material';
import axios from 'axios';
import RemoveIcon from '@mui/icons-material/Remove';
import LogItemModal from './ClothingItemLog.tsx';
import React from 'react';
import EditIcon from '@mui/icons-material/Edit';


interface ItemThumbnailProps {
  item: Item;
}

const CARD_WIDTH = 350;
const CARD_HEIGHT = 400;
const IMAGE_HEIGHT = 190;
const MAX_TAGS_DISPLAY = 3;

const ItemThumbnail: React.FC<ItemThumbnailProps> = ({ item }) => {
  const [openModal, setOpenModal] = React.useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleDelete = () => {
    axios.delete(`/api/item/delete-item/${item.id}`)
      .then(() => window.location.reload())
      .catch((err) => console.log(err));
  };

  if (item.deleted || item.visibility !== "shown") return null;

  return (
    <Card
      sx={{
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxSizing: 'border-box',
        position: 'relative',
        transition: 'transform 0.2s cubic-bezier(0.4,0,0.2,1), box-shadow 0.2s cubic-bezier(0.4,0,0.2,1)',
        '&:hover': {
          transform: 'scale(1.035)',
          boxShadow: 6,
          zIndex: 2,
        },
        overflow: 'hidden',
      }}
      elevation={3}
    >
      {/* Action Buttons: Circular, top-right */}
      <Box sx={{
        position: 'absolute',
        top: 8,
        right: 8,
        display: 'flex',
        gap: 1,
        zIndex: 1,
        flexDirection: 'column',
      }}>
        <IconButton
          onClick={handleDelete}
          color="error"
          sx={{
            bgcolor: '#f5e6e8',
            '&:hover': { bgcolor: 'error.main', color: 'common.white' },
            boxShadow: 2,
            width: 40,
            height: 40,
          }}
          aria-label="delete"
        >
          <RemoveIcon />
        </IconButton>
        <IconButton
          onClick={handleOpenModal}
          color="primary"
          sx={{
            bgcolor: 'primary.dark',
            '&:hover': { bgcolor: 'primary.main', color: 'common.white' },
            boxShadow: 2,
            width: 40,
            height: 40,
          }}
          aria-label="edit"
        >
          <EditIcon />
        </IconButton>
      </Box>

      {/* Image */}
      <CardMedia
        component="img"
        alt={item.name}
        image={item.imageData ?? undefined}
        sx={{
          width: '100%',
          height: IMAGE_HEIGHT,
          objectFit: 'contain',
          background: '#ffffff',
          borderRadius: 1,
          mt: 4, // Push image below the buttons
          mb: 1
        }}
      />

      {/* Text Content */}
      <CardContent sx={{ flexGrow: 1, py: 1 }}>
        <Typography
          variant="h6"
          component="div"
          sx={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            fontWeight: 600,
            mb: 0.5
          }}
        >
          {item.name}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            minHeight: '2.5em'
          }}
        >
          {item.note}
        </Typography>
      </CardContent>

      {/* Tags */}
      <Stack direction="row" spacing={1} sx={{ p: 0.75, flexWrap: 'wrap', minHeight: 40, mb: 0.5 }}>
        {item.styling.tags.slice(0, MAX_TAGS_DISPLAY).map((tag, i) => (
          <Chip
            label={tag}
            variant="outlined"
            key={`stylingTag${i}`}
            sx={{

              color: '#333',
              borderColor: 'primary.darker',
              borderWidth: 1.5,
              borderStyle: 'solid',
            }}
          />
        ))}
        {item.styling.tags.length > MAX_TAGS_DISPLAY && (
          <Chip
            label={`+${item.styling.tags.length - MAX_TAGS_DISPLAY} more`}
            variant="outlined"
            key="extraTags"
            sx={{

              color: '#333',
              borderColor: 'primary.darker',
              borderWidth: 1.5,
              borderStyle: 'solid',
            }}
          />
        )}
      </Stack>

      {/* Edit Modal */}
      <LogItemModal open={openModal} onClose={handleCloseModal} item={item} />
    </Card>
  );
};

export default ItemThumbnail;