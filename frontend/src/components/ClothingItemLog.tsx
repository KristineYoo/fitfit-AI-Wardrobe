import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';

import SelectStyleTagList from './LogClothingItemform-Components/styleTag';
import SeasonTagList from './LogClothingItemform-Components/seasonTag';
import OccasionTagList from './LogClothingItemform-Components/occasionTag';
import MoodTagList from './LogClothingItemform-Components/moodTag';
import FabricSelect from './LogClothingItemform-Components/fabricSelect';
import ThicknessSelect from './LogClothingItemform-Components/thicknessSelect-logItem';
import ColorSelector from './LogClothingItemform-Components/clothingColor';
import TypeSelect from './LogClothingItemform-Components/typeSelect';
import { Item } from '../types/jsonDataTypes';

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
  maxHeight: '80vh',
  overflowY: 'auto',
};

interface LogItemModalProps {
  open: boolean;
  onClose: () => void;
  item?: Item;
}

const LogItemModal: React.FC<LogItemModalProps> = ({ open, onClose, item }) => {
  const [name, setName] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [color, setColor] = useState<string[]>([]);
  const [image, setImage] = useState<string>('/img/default.png');
  const [styleTags, setStyleTags] = useState<string[]>([]);
  const [seasonTags, setSeasonTags] = useState<string[]>([]);
  const [occasionTags, setOccasionTags] = useState<string[]>([]);
  const [moodTags, setMoodTags] = useState<string[]>([]);
  const [fabric, setFabric] = useState<{ material: string[]; thickness: string }>({
    material: [],
    thickness: 'medium',
  });
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (item) {
      setName(item.name);
      setNotes(item.note || '');
      setCategory(item.category || '');
      setColor(item.color || []);
      setImage(item.image || '/img/default.png');
      setStyleTags(item.styling?.tags || []);
      setSeasonTags(item.styling?.season || []);
      setOccasionTags(item.styling?.occasion || []);
      setMoodTags(item.styling?.mood || []);
      setFabric({
        material: item.fabric?.material || [],
        thickness: item.fabric?.thickness || 'medium',
      });
    } else {
      setName('');
      setNotes('');
      setCategory('');
      setColor([]);
      setImage('/img/default.png');
      setStyleTags([]);
      setSeasonTags([]);
      setOccasionTags([]);
      setMoodTags([]);
      setFabric({ material: [], thickness: 'medium' });
    }
  }, [item]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const itemData = {
      name,
      note: notes,
      category,
      color,
      image,
      styling: { tags: styleTags, season: seasonTags, occasion: occasionTags, mood: moodTags },
      fabric,
      visibility: 'shown',
      deleted: false,
    };

    try {
      if (item && item.id) {
        await axios.put(`/api/update-item/${item.id}`, itemData);
        console.log('Item updated successfully');
      } else {
        await axios.post('/api/add-item', itemData);
        console.log('Item added successfully');
      }
      onClose();
      window.location.reload();
    } catch (error) {
      console.error('Error saving item:', error);
      alert('Failed to save item. Please try again.');
    }
  };

  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => {
    setIsModalOpen(false);
    onClose();
  };

  const handleSeasonChange = (seasons: string[]) => {
    setSeasonTags(seasons);
  };

  const handleFabricChange = (material: string[]) => {
    setFabric({ ...fabric, material });
  };
  const handleThicknessChange = (thickness: string) => {
    setFabric({ ...fabric, thickness: thickness });
  };

  return (
    <div>
      <Fab
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
        }}
        color="primary"
        aria-label="add"
        onClick={handleOpen}
      >
        <AddIcon />
      </Fab>
      <Modal
        open={open || isModalOpen}
        onClose={handleClose}
        aria-labelledby="clothingItemLogModalTitle"
      >
        <Box sx={style} component="form" onSubmit={handleSubmit}>
          <Typography id="clothingItemLogModalTitle" variant="h6" component="h2" sx={{ color: 'black' }}>
            Upload Clothing Item
          </Typography>
          <TextField
            id="uploadItem-name"
            label="Name of Item"
            variant="outlined"
            fullWidth
            sx={{ my: 2 }}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            id="uploadItem-note"
            label="Notes"
            variant="outlined"
            fullWidth
            sx={{ my: 2 }}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
          <TypeSelect value={category} onChange={(cat) => setCategory(cat)} />
          <ColorSelector onColorChange={(colors) => setColor(colors)} />
          <p style={{ color: 'black' }}>Clothing Styles</p>
          <SelectStyleTagList selectedStyles={styleTags} onChange={(styles) => setStyleTags(styles)} />
          <SeasonTagList selectedSeasons={seasonTags} onChange={handleSeasonChange} />
          <OccasionTagList selectedOccasions={occasionTags} onChange={(occasions) => setOccasionTags(occasions)} />
          <MoodTagList selectedMoods={moodTags} onChange={(moods) => setMoodTags(moods)} />
          <p style={{ color: 'black' }}>Fabric </p>
          <FabricSelect selectedFabrics={fabric.material} onFabricChange={handleFabricChange} onChange={handleFabricChange} />
          <ThicknessSelect value={fabric.thickness} onChange={handleThicknessChange} />

          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="outlined" color="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" type="submit">
              Save Item
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default LogItemModal;
