// frontend/src/components/ClothingItemLog.tsx
// Last changed by Bao Vuong, 6:28PM 4/26/2025
// Mod by Iain Gore 5/9/25
// Modified by Bao Vuong, 7:05PM 5/10/2025

import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
//import Fab from '@mui/material/Fab';
//import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import Grid from '@mui/material/Grid';

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
  width: '70vw',
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  p: 4,
  maxHeight: '90vh',
  overflowY: 'auto',
  overflow: 'auto',
  borderRadius: '10px',
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
  const [headerText, setHeaderText] = useState<string>('Add New Clothing Item');


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
            setImagePreview(item.imageData);

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

      setHeaderText('Edit Clothing Item');
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
                sessionStorage.setItem("Status", "Update")
                console.log('Item updated successfully');
            } else {
                await axios.post('/api/item/add-item', itemData);
                sessionStorage.setItem("Status", "Add")
                console.log('Item added successfully');
            }
            onClose();
            window.location.reload();
        } catch (error) {
            console.error('Error saving item:', error);
            sessionStorage.setItem("Status", "Error")
            alert('Failed to save item. Please try again.');
        }
    };


    //const handleOpen = () => setIsModalOpen(true);


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
                <Typography id="clothingItemLogModalTitle" variant="h6" component="h2" sx={{ color: 'primary.main', mb: 2 }}>
                {headerText}
                </Typography>
                <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} display="flex" alignItems="center">
                    <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                    <label htmlFor="uploadImage" style={{ color: '#8aa899', fontWeight: 'bold', marginRight: '0.5rem' }}>Image:</label>
                    <Button variant="outlined" component="label" sx={{ mb: 2 }}>
                    Browse
                    <input hidden accept="image/*" type="file" onChange={handleFileChange} />
                    </Button>
                    </div>
                    {imagePreview && (
                    <img src={imagePreview} alt="Preview" style={{ width: '100px', height: '100px', objectFit: 'contain', marginLeft: '1rem' }} />
                    )}
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <TextField id="uploadItem-name" label="Name" variant="outlined" sx={{my:1}} fullWidth value={name} onChange={(e) => setName(e.target.value)} />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <TextField id="uploadItem-note" label="Notes" variant="outlined" sx={{my:1}} fullWidth value={notes} onChange={(e) => setNotes(e.target.value)} />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <TypeSelect value={category} onChange={(cat) => setCategory(cat)} />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <ColorSelector onColorChange={(colors) => setColor(colors)} />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <SelectStyleTagList selectedStyles={styleTags} onChange={(styles) => setStyleTags(styles)} />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <SeasonTagList selectedSeasons={seasonTags} onChange={handleSeasonChange} />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <OccasionTagList selectedOccasions={occasionTags} onChange={(occasions) => setOccasionTags(occasions)} />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <MoodTagList selectedMoods={moodTags} onChange={(moods) => setMoodTags(moods)} />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <FabricSelect selectedFabrics={fabric.material} onFabricChange={handleFabricChange} onChange={handleFabricChange}/>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <ThicknessSelect value={fabric.thickness} onChange={handleThicknessChange} />
                </Grid>
                </Grid>
                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
                <Button variant="outlined" onClick={handleCancel} sx={{ boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)', color: 'secondary.main', borderColor: 'secondary.main',                    transition: 'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;',
                '&:hover': {
                    bgcolor: 'secondary.main',
                    color: 'white',
                    borderColor: 'secondary.main',
                    boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)',
                }}}>
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
