import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import axios from 'axios';
//import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import SelectStyleTagList from './LogClothingItemform-Components/styleTag'
import SeasonTagList from './LogClothingItemform-Components/seasonTag'
import OccasionTagList from './LogClothingItemform-Components/occasionTag'
import MoodTagList from './LogClothingItemform-Components/moodTag'
import FabricSelect from './LogClothingItemform-Components/fabricSelect';
import { Item } from '../types/jsonDataTypes';
import TypeSelect from './LogClothingItemform-Components/typeSelect';
import ThicknessSelect from './LogClothingItemform-Components/thicknessSelect-logItem';
//import { Category } from '@mui/icons-material';




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

interface LogItemModalProps {
  open: boolean;
  onClose: () => void;
  item?: Item;
}


export default function LogItemModal({ open, onClose, item }: LogItemModalProps) {
  const [name, setName] = useState('');
  const [notes, setNotes] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [styleTags, setStyleTags] = useState<string[]>([]);
  const [seasonTags, setSeasonTags] = useState<string[]>([]);
  const [occasionTags, setOccasionTags] = useState<string[]>([]);
  const [moodTags, setMoodTags] = useState<string[]>([]);
  const [fabric, setFabric] = useState<{ material: string[]; thickness: string }>({
    material: [],
    thickness: '',
  });



  useEffect(() => {
    if (item) {
      setName(item.name);
      setNotes(item.note || '');
      setCategory(item.category || '');
      setImage(item.image || '');
      setStyleTags(item.styling?.tags || []);
      setSeasonTags(item.styling?.season || []);
      setOccasionTags(item.styling?.occasion || []);
      setMoodTags(item.styling?.mood || []);
      setFabric({
        material: item.fabric?.material || [],
        thickness: item.fabric?.thickness || '',
      });

    } else {

      setName('');
      setNotes('');
      setCategory('');
      setImage('');
      setStyleTags([]);
      setSeasonTags([]);
      setOccasionTags([]);
      setMoodTags([]);


    }
  }, [item]);


  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const updatedItem = {
      name,
      note: notes,
      category,
      image,
      styling: {
        tags: styleTags,
        season: seasonTags,
        occasion: occasionTags,
        mood: moodTags,
      },
      fabric,

    };

    try {
      if (item) {
        const response = await axios.put(`/api/update-item/${item.id}`, updatedItem);
        console.log('Item updated:', response.data);
      } else {
        const response = await axios.post('/api/create-item', updatedItem);
        console.log('Item created:', response.data);
      }
      onClose();
      window.location.reload();
    } catch (error) {
      console.error('Error saving item:', error);
    }
  };


  return (

    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="clothingItemLogModalTitle"
    >
      <Box sx={style} component="form" onSubmit={handleSubmit}>
        <Typography id="clothingItemLogModalTitle" variant="h6" component="h2" sx={{ color: 'black' }}>
          Upload Clothing Item
        </Typography>
        <TextField id="uploadItem-name" label="Name of Item" variant="outlined" fullWidth sx={{ my: 2 }} value={name} onChange={(e) => setName(e.target.value)} />
        <TextField id="uploadItem-Notes" label="Notes" variant="outlined" fullWidth sx={{ my: 2 }} value={notes}
          onChange={(e) => setNotes(e.target.value)} />
        <TypeSelect value={category}
          onChange={(category) => setCategory(category)} />
        <p style={{ color: "black" }}>Clothing Styles</p>
        <SelectStyleTagList
          selectedStyles={styleTags}
          onChange={(styles) => setStyleTags(styles)}
        />
        <SeasonTagList
          selectedSeasons={seasonTags}
          onChange={(seasons) => setSeasonTags(seasons)}
        />

        <OccasionTagList selectedOccasions={occasionTags} onChange={(occasions) => setOccasionTags(occasions)} />
        <MoodTagList selectedMoods={moodTags} onChange={(moods) => setMoodTags(moods)} />

        <p style={{ color: "black" }}>Fabric </p>
        <FabricSelect selectedFabrics={fabric.material}
          onChange={(material) => setFabric({ ...fabric, material })} />
        <ThicknessSelect value={fabric.thickness}
          onChange={(thickness) => setFabric({ ...fabric, thickness })} />

      </Box>
    </Modal>

  );
}
