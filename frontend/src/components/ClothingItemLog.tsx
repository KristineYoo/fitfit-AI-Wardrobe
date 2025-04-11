import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';

import SelectStyleTagList from './LogClothingItemform-Components/styleTag'
import SeasonTagList from './LogClothingItemform-Components/seasonTag'
import OccasionTagList from './LogClothingItemform-Components/occasionTag'
import MoodTagList from './LogClothingItemform-Components/moodTag'
import FabricSelect from './LogClothingItemform-Components/fabricSelect';
import ThicknessSelect from './LogClothingItemform-Components/thicknessSelect-logItem';
import ColorSelector from './LogClothingItemform-Components/clothingColor';
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
  const [imagePreview, setImagePreview] = React.useState<string | null>(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Form state
  interface ItemFormData {
    name: string;
    note: string;
    category: string;
    color: string[];
    image: string | null;
    styling: {
      tags: string[];
      season: string[];
      occasion: string[];
      mood: string[];
    };
    visibility: string;
    fabric: {
      material: string[];
      thickness: string;
    };
    deleted: boolean;
  }

  const [formData, setFormData] = React.useState<ItemFormData>({
    name: '',
    note: '',
    category: '',
    color: [],
    image: '/public/assets/data/images/default.png',
    styling: {
      tags: [],
      season: [],
      occasion: [],
      mood: []
    },
    visibility: 'shown',
    fabric: {
      material: [],
      thickness: 'medium'
    },
    deleted: false
  });

  // Form field change handlers
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      // Create a URL for the file preview
      const previewUrl = URL.createObjectURL(file);
      
      // Create a FileReader to convert the file to base64 (this is needed to send it as a string)
      const reader = new FileReader();
      
      reader.onloadend = () => {
        // reader.result contains the base64 string representation of the file
        setFormData({
          ...formData,
          image: reader.result as string
        });
      };
      
      // Start reading the file as a data URL (base64)
      reader.readAsDataURL(file);

      // Store the preview URL in a separate state variable
      setImagePreview(previewUrl);
    
      // Remember to revoke the URL when no longer needed to prevent memory leaks
      return () => URL.revokeObjectURL(previewUrl);
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id.replace('uploadItem-', '')]: e.target.value
    });
  };

  const handleCategoryChange = (category: string) => {
    setFormData({
      ...formData,
      category
    });
  };

  const handleColorChange = (colors: string[]) => {
    setFormData({
      ...formData,
      color: colors
    });
  };

  const handleStyleTagsChange = (tags: string[]) => {
    setFormData({
      ...formData,
      styling: {
        ...formData.styling,
        tags
      }
    });
  };

  const handleSeasonChange = (season: string[]) => {
    setFormData({
      ...formData,
      styling: {
        ...formData.styling,
        season
      }
    });
  };

  const handleOccasionChange = (occasion: string[]) => {
    setFormData({
      ...formData,
      styling: {
        ...formData.styling,
        occasion
      }
    });
  };

  const handleMoodChange = (mood: string[]) => {
    setFormData({
      ...formData,
      styling: {
        ...formData.styling,
        mood
      }
    });
  };

  const handleFabricChange = (material: string[]) => {
    setFormData({
      ...formData,
      fabric: {
        ...formData.fabric,
        material
      }
    });
  };

  const handleThicknessChange = (thickness: string) => {
    setFormData({
      ...formData,
      fabric: {
        ...formData.fabric,
        thickness
      }
    });
  };

  // Form submission handler
  const handleSubmit = async () => {
    try {
      console.log('Adding item:', formData);
      const response = await axios.post('/api/add-item', formData);
      console.log('Item added successfully:', response.data);
      
      // Reset form and close modal
      setFormData({
        name: '',
        note: '',
        category: '',
        color: [],
        image: '/public/assets/data/images/default.png',
        styling: {
          tags: [],
          season: [],
          occasion: [],
          mood: []
        },
        visibility: 'shown',
        fabric: {
          material: [],
          thickness: 'medium'
        },
        deleted: false
      });
      handleClose();
    } catch (error) {
      console.error('Error adding item:', error);
      alert('Failed to add item. Please try again.');
    }
  };

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
          <TextField id="uploadItem-name" label="Name of Item" variant="outlined" fullWidth sx={{ my: 2 }} value={formData.name} onChange={handleTextChange}/>
          <TextField id="uploadItem-note" label="Notes" variant="outlined" fullWidth sx={{ my: 2 }} value={formData.note} onChange={handleTextChange}/>
          <TypeSelect onCategoryChange={handleCategoryChange} />
          <ColorSelector onColorChange={handleColorChange}/>
          <p style={{ color: "black" }}>Clothing Styles</p>



          <SelectStyleTagList onTagsChange={handleStyleTagsChange}/>
          <SeasonTagList onSeasonChange={handleSeasonChange}/>
          <OccasionTagList onOccasionChange={handleOccasionChange}/>
          <MoodTagList onMoodChange={handleMoodChange}/>
          <p style={{ color: "black" }}>Fabric </p>
          <FabricSelect onFabricChange={handleFabricChange}/>
          <ThicknessSelect onThicknessChange={handleThicknessChange}/>

          {/* Add Submit Button */}
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
            <Button 
              variant="outlined" 
              color="secondary" 
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleSubmit}
            >
              Save Item
            </Button>
          </Box>

        </Box>
      </Modal>
    </div>
  );
}
