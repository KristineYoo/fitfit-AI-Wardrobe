// frontend/src/components/ItemThumbnail.tsx
// Last changed by Bao Vuong, 6:29PM 4/26/2025
// last changed by Kristine Yoo, 7:29 5/8/2025
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import { Item } from '../types/jsonDataTypes.ts'
import { Box, IconButton } from '@mui/material';
import axios from 'axios';
import RemoveIcon from '@mui/icons-material/Remove';
import LogItemModal from './ClothingItemLog.tsx';
import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import ConfirmDeleteDialog from './confirmDelete.tsx';


interface ItemThumbnailProps {
  item: Item;
}

const CARD_WIDTH = 350;
const CARD_HEIGHT = 400;
const IMAGE_HEIGHT = 190;
const CHIP_MARGIN = 8; // px, adjust if needed

const ItemThumbnail: React.FC<ItemThumbnailProps> = ({ item }) => {
  const [openModal, setOpenModal] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [chipsToShow, setChipsToShow] = useState(item.styling.tags.length);

  const chipsContainerRef = useRef<HTMLDivElement>(null);
  const chipRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [mess, setMess] = useState("")

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  useEffect(() => {
      if (mess!="") {
        sessionStorage.setItem("Status", mess)
      }
    })

  const handleDelete = () => {
    axios.delete(`/api/item/delete-item/${item.id}`)
      .then(() => {
        setMess("Delete")
        window.location.reload()})
      .catch((err) => setMess("Error"));
  };

  // Calculate how many chips fit in the available width
  useLayoutEffect(() => {
    if (!chipsContainerRef.current) return;

    let availableWidth = chipsContainerRef.current.offsetWidth;
    let usedWidth = 0;
    let fitCount = 0;

    for (let i = 0; i < item.styling.tags.length; i++) {
      const chipEl = chipRefs.current[i];
      if (!chipEl) continue;
      const chipWidth = chipEl.offsetWidth + CHIP_MARGIN;
      if (usedWidth + chipWidth > availableWidth) break;
      usedWidth += chipWidth;
      fitCount++;
    }

    // If not all chips fit, reserve space for the "+n more" chip
    if (fitCount < item.styling.tags.length) {
      const moreChipEl = chipRefs.current[item.styling.tags.length];
      if (moreChipEl && usedWidth + moreChipEl.offsetWidth > availableWidth) {
        fitCount = Math.max(0, fitCount - 1);
      }
    }

    setChipsToShow(fitCount);
    // eslint-disable-next-line
  }, [item.styling.tags]);

  // Recalculate on window resize
  useEffect(() => {
    const handleResize = () => setChipsToShow(item.styling.tags.length); // triggers useLayoutEffect
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [item.styling.tags.length]);

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
          onClick={() => setConfirmDeleteOpen(true)}
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

      {/* Tags - Always single line, +n more if needed */}
      <div
        ref={chipsContainerRef}
        style={{
          padding: '8px',
          minHeight: 40,
          marginBottom: 4,
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          width: '100%',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        {item.styling.tags.slice(0, chipsToShow).map((tag, i) => (
          <div
            key={tag}
            ref={el => chipRefs.current[i] = el}
            style={{ display: 'inline-block', marginRight: CHIP_MARGIN }}
          >
            <Chip
              label={tag}
              variant="outlined"
              sx={{
                color: '#333',
                borderColor: 'primary.darker',
                borderWidth: 1.5,
                borderStyle: 'solid',
                maxWidth: 120, // Optional: prevent super long tags
              }}
            />
          </div>
        ))}
        {chipsToShow < item.styling.tags.length && (
          <div
            ref={el => chipRefs.current[item.styling.tags.length] = el}
            style={{ display: 'inline-block', marginRight: CHIP_MARGIN }}
          >
            <Chip
              label={`+${item.styling.tags.length - chipsToShow} more`}
              variant="outlined"
              sx={{
                color: '#333',
                borderColor: 'primary.darker',
                borderWidth: 1.5,
                borderStyle: 'solid',
              }}
            />
          </div>
        )}
      </div>

      {/* Confirm Delete Dialog */}
      <ConfirmDeleteDialog
        open={confirmDeleteOpen}
        onClose={() => setConfirmDeleteOpen(false)}
        onConfirm={() => {
          setConfirmDeleteOpen(false);
          handleDelete();
        }}
        itemName={item.name}
      />

      {/* Edit Modal */}
      <LogItemModal open={openModal} onClose={handleCloseModal} item={item} />
    </Card>
  );
};

export default ItemThumbnail;

