// Created by Sophia Somers 5/8/25
import { Box, TextField } from '@mui/material'
import { ChangeEvent } from 'react'

export default function ItemSearchBar({setSearchTerm }:{setSearchTerm:(value: string) => void}): JSX.Element {

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setSearchTerm(event.target.value)
    };

    return (
        <>
        {// CREDIT: Styling by ChatGPT, 5/7/25
        }
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