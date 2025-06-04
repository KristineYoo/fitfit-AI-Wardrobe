import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

const marks = [
    {
        value: 0,
        label: 'Destroyed',
    },
    {
        value: 25,
        label: 'Damaged',
    },
    {
        value: 50,
        label: 'Light Damage',
    },

    {
        value: 75,
        label: 'Near Perfect ',
    },
    {
        value: 100,
        label: 'Perfect',
    },
];

function valuetext(value: number) {
    return `${value}°C`;
}

export default function DamageScale() {
    return (
        <Box sx={{ width: 350, mx: 2 }}>
            <Slider
                aria-label="DamageScale-logclothing"
                defaultValue={20}
                getAriaValueText={valuetext}
                step={null}
                valueLabelDisplay="auto"
                marks={marks}
            />
        </Box>
    );
}
