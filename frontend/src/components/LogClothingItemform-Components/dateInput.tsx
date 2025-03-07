import * as React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export default function SelectDate() {
    const [date, setDate] = React.useState({ day: '', month: '', year: '' });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDate({ ...date, [event.target.name]: event.target.value });
    };

    const handleToday = () => {
        const today = new Date();
        setDate({
            day: String(today.getDate()).padStart(2, '0'),
            month: String(today.getMonth() + 1).padStart(2, '0'),
            year: String(today.getFullYear()),
        });
    };

    const handleClear = () => {
        setDate({ day: '', month: '', year: '' });
    };



    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                    label="Day"
                    type="number"
                    name="day"
                    value={date.day}
                    onChange={handleChange}
                    inputProps={{ min: 1, max: 31 }}
                    sx={{ width: '30%' }}
                />
                <TextField
                    label="Month"
                    type="number"
                    name="month"
                    value={date.month}
                    onChange={handleChange}
                    inputProps={{ min: 1, max: 12 }}
                    sx={{ width: '30%' }}
                />
                <TextField
                    label="Year"
                    type="number"
                    name="year"
                    value={date.year}
                    onChange={handleChange}
                    inputProps={{ min: 1900, max: new Date().getFullYear() }}
                    sx={{ width: '40%' }}
                />
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant="outlined" onClick={handleToday}>Today</Button>
                <Button variant="outlined" onClick={handleClear}>Clear</Button>

            </Box>
        </Box>
    );
}
