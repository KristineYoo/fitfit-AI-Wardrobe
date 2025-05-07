import { Box, TextField } from '@mui/material'
import { useState, ChangeEvent, useEffect } from 'react'
import { Item } from '../types/jsonDataTypes';
import axios from "axios";


export default function ItemSearchBar(): JSX.Element {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [results, setResults] = useState<Item[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        //don't query db for empty searches
        if(!searchTerm.trim()){
            setResults([]);
            return;
        }

        //make a 500ms delay between searching db
        const timeout = setTimeout(() => {
            fetchData();
        }, 500);

        return (() => clearTimeout(timeout))

    }, [searchTerm]);

    //make API call
    const fetchData = async () => {
        setLoading(true);
        axios.get('/api/item/', {
            params: {term: searchTerm}
        })
        .then(response => {
            //set info here
            setResults(response.data)
            console.log(response.data)
        })
        .catch(error => {
            setError("An error occured. Please try again later.");
            console.log(error.response.data);
        })
        .finally(() => {
            setLoading(false)
        });
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setSearchTerm(event.target.value)
    };

    return (
        <>
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
                mt: { xs: 3, sm: 5, md: 7 }, // responsive margin-top
                mb: 4, // optional space below if needed
            }}
            >
            <Box
                sx={{
                boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.12)',
                borderRadius: 2,
                width: '100%',
                maxWidth: { xs: 320, sm: 480, md: 600 }, // responsive width
                p: { xs: 1, sm: 2, md: 3 }, // responsive padding
                backgroundColor: 'white',
                }}
            >
            <TextField
                id="itemSearchField"
                label="Search"
                variant="standard"
                onChange={handleChange}
                sx={{
                width: '100%',
                maxWidth: 500,
                input: {
                    color: 'primary.dark'
                },
                color: 'primary.dark',
                '& .MuiInput-underline:before': {
                    borderBottomColor: 'primary.dark',
                },
                '& .MuiInput-underline:hover:before': {
                    borderBottomColor: 'primary.darker',
                },
                '& .MuiInput-underline:after': {
                    borderBottomColor: 'primary.darker',
                },
                }}
            />
            </Box>
        </Box>
        </>
    );
};