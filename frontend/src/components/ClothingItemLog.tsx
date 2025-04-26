// frontend/src/components/ClothingItemLog.tsx
// Last changed by Bao Vuong, 6:28PM 4/26/2025

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


  // New state to store initial values
  const [initialValues, setInitialValues] = useState<{
    name: string;
    notes: string;
    category: string;
    color: string[];
    image: string;
    styleTags: string[];
    seasonTags: string[];
    occasionTags: string[];
    moodTags: string[];
    fabric: { material: string[]; thickness: string };
  }>({
    name: '',
    notes: '',
    category: '',
    color: [],
    image: '/img/default.png',
    styleTags: [],
    seasonTags: [],
    occasionTags: [],
    moodTags: [],
    fabric: { material: [], thickness: 'medium' },
  });

  // const to store the preview of the uploaded image
  const [imagePreview, setImagePreview] = React.useState<string | null>(null);


  useEffect(() => {
    if (item) {
      const initial = {
        name: item.name,
        notes: item.note || '',
        category: item.category || '',
        color: item.color || [],
        image: item.image || '/img/default.png',
        styleTags: item.styling?.tags || [],
        seasonTags: item.styling?.season || [],
        occasionTags: item.styling?.occasion || [],
        moodTags: item.styling?.mood || [],
        fabric: {
          material: item.fabric?.material || [],
          thickness: item.fabric?.thickness || 'medium',
        },
      };


      setInitialValues(initial);


      setName(initial.name);
      setNotes(initial.notes);
      setCategory(initial.category);
      setColor(initial.color);
      setImage(initial.image);
      setStyleTags(initial.styleTags);
      setSeasonTags(initial.seasonTags);
      setOccasionTags(initial.occasionTags);
      setMoodTags(initial.moodTags);
      setFabric(initial.fabric);
    } else {
      const initial = {
        name: '',
        notes: '',
        category: '',
        color: [],
        image: '/img/default.png',
        styleTags: [],
        seasonTags: [],
        occasionTags: [],
        moodTags: [],
        fabric: { material: [], thickness: 'medium' },
      };
      setInitialValues(initial);


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
        await axios.put(`/api/item/update-item/${item.id}`, itemData);
        console.log('Item updated successfully');
      } else {
        await axios.post('/api/item/add-item', itemData);
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


  // New function to handle cancel
  const handleCancel = () => {
    setName(initialValues.name);
    setNotes(initialValues.notes);
    setCategory(initialValues.category);
    setColor(initialValues.color);
    setImage(initialValues.image);
    setStyleTags(initialValues.styleTags);
    setSeasonTags(initialValues.seasonTags);
    setOccasionTags(initialValues.occasionTags);
    setMoodTags(initialValues.moodTags);
    setFabric(initialValues.fabric);
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

  // handling when a user uploads an image file
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      // Create a URL for the file preview
      const previewUrl = URL.createObjectURL(file);
      
      // Create a FileReader to convert the file to base64 (this is needed to send it as a string)
      const reader = new FileReader();
      
      reader.onloadend = () => {
        // reader.result contains the base64 string representation of the file
        setImage(reader.result as string);
      };
      
      // Start reading the file as a data URL (base64)
      reader.readAsDataURL(file);

      // Store the preview URL in a separate state variable
      setImagePreview(previewUrl);
    
      // Revoke the URL when no longer needed to prevent memory leaks
      return () => URL.revokeObjectURL(previewUrl);
    }
  };


  return (
    <div>
      <Modal
        open={open || isModalOpen}
        onClose={handleClose}
        aria-labelledby="clothingItemLogModalTitle"
      >
        <Box sx={style} component="form" onSubmit={handleSubmit}>
          <Typography id="clothingItemLogModalTitle" variant="h6" component="h2" sx={{ color: 'black' }}>
            Upload Clothing Item
          </Typography>
          <input id="image" type="file" accept="image/*" onChange={handleFileChange}/>
          {imagePreview && (
            <div id="image-preview-div">
              <img src={imagePreview} alt="Preview" style={{
                                                    width: '100%',
                                                    maxHeight: '250px',
                                                    objectFit: 'contain',
                                                    marginTop: '16px'
                                                  }}/>
            </div>
          )}
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
            <Button variant="outlined" color="secondary" onClick={handleCancel}>
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


export default LogItemModal
