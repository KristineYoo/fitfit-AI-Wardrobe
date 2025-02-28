import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import data from '../../data/logItemsFormData.json';

interface ClothingType {
    value: number;
    label: string;
}

export default function SelectCurrency() {
    return (
        <Box
            component="form"
            sx={{ '& .MuiTextField-root': { my: 2, width: 400 } }}
            noValidate
            autoComplete="off"
        >
            <div>
                <TextField
                    id="outlined-select-currency"
                    select
                    label="Select Currency"
                >
                    {data.clothingTypes.map((option: ClothingType) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </div>
        </Box>
    );
}
