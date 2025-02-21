import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function TypeSelect() {
    const [age, setAge] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value as string);
    };

    return (
        <Box sx={{ minWidth: 400, my: 2 }}>
            <FormControl fullWidth>
                <InputLabel id="selectType-logClothing-Input">Select Type</InputLabel>
                <Select
                    labelId="selectType-logClothing-label"
                    id="selectType-logClothing"
                    value={age}
                    label="Age"
                    onChange={handleChange}
                >
                    <MenuItem value={1}>T-shirt</MenuItem>
                    <MenuItem value={2}>Tank top</MenuItem>
                    <MenuItem value={3}>Blouse</MenuItem>
                    <MenuItem value={4}>Button-up shirt</MenuItem>
                    <MenuItem value={5}>Polo shirt</MenuItem>
                    <MenuItem value={6}>Sweater</MenuItem>
                    <MenuItem value={7}>Hoodie</MenuItem>
                    <MenuItem value={8}>Sweatshirt</MenuItem>
                    <MenuItem value={9}>Crop top</MenuItem>
                    <MenuItem value={10}>Tunic</MenuItem>
                    <MenuItem value={11}>Camisole</MenuItem>
                    <MenuItem value={12}>Vest</MenuItem>
                    <MenuItem value={13}>Henley shirt</MenuItem>
                    <MenuItem value={14}>Jeans</MenuItem>
                    <MenuItem value={15}>Leggings</MenuItem>
                    <MenuItem value={16}>Shorts</MenuItem>
                    <MenuItem value={17}>Sweatpants</MenuItem>
                    <MenuItem value={18}>Skirt</MenuItem>
                    <MenuItem value={19}>Trousers</MenuItem>
                    <MenuItem value={20}>Joggers</MenuItem>
                    <MenuItem value={21}>Capris</MenuItem>
                    <MenuItem value={22}>Cargo pants</MenuItem>
                    <MenuItem value={23}>Chinos</MenuItem>
                    <MenuItem value={24}>Overalls (pants)</MenuItem>
                    <MenuItem value={25}>Culottes</MenuItem>
                    <MenuItem value={26}>Harem pants</MenuItem>
                    <MenuItem value={27}>Palazzo pants</MenuItem>
                    <MenuItem value={28}>Jacket</MenuItem>
                    <MenuItem value={29}>Coat</MenuItem>
                    <MenuItem value={30}>Blazer</MenuItem>
                    <MenuItem value={31}>Cardigan</MenuItem>
                    <MenuItem value={32}>Trench coat</MenuItem>
                    <MenuItem value={33}>Windbreaker</MenuItem>
                    <MenuItem value={34}>Puffer jacket</MenuItem>
                    <MenuItem value={35}>Parka</MenuItem>
                    <MenuItem value={36}>Peacoat</MenuItem>
                    <MenuItem value={37}>Poncho</MenuItem>
                    <MenuItem value={38}>Cloak</MenuItem>
                    <MenuItem value={39}>Cape</MenuItem>
                    <MenuItem value={40}>Bomber jacket</MenuItem>
                    <MenuItem value={41}>Duster coat</MenuItem>
                    <MenuItem value={42}>Dress</MenuItem>
                    <MenuItem value={43}>Jumpsuit</MenuItem>
                    <MenuItem value={44}>Romper</MenuItem>
                    <MenuItem value={45}>Overalls</MenuItem>
                    <MenuItem value={46}>Ball gown</MenuItem>
                    <MenuItem value={47}>Maxi dress</MenuItem>
                    <MenuItem value={48}>Sundress</MenuItem>
                    <MenuItem value={49}>Slip dress</MenuItem>
                    <MenuItem value={50}>Wrap dress</MenuItem>
                    <MenuItem value={51}>Tuxedo dress</MenuItem>
                    <MenuItem value={52}>Pajamas</MenuItem>
                    <MenuItem value={53}>Nightgown</MenuItem>
                    <MenuItem value={54}>Slip</MenuItem>
                    <MenuItem value={55}>Robe</MenuItem>
                    <MenuItem value={56}>Thermal underwear</MenuItem>
                    <MenuItem value={57}>Kimono (Japan)</MenuItem>
                    <MenuItem value={58}>Hanbok (Korea)</MenuItem>
                    <MenuItem value={59}>Sari (India)</MenuItem>
                    <MenuItem value={60}>Dhoti (India)</MenuItem>
                    <MenuItem value={61}>Kurta (South Asia)</MenuItem>
                    <MenuItem value={62}>Dirndl (Germany)</MenuItem>
                    <MenuItem value={63}>Lederhosen (Germany)</MenuItem>
                    <MenuItem value={64}>Kilt (Scotland)</MenuItem>
                    <MenuItem value={65}>Abaya (Middle East)</MenuItem>
                    <MenuItem value={66}>Thobe (Middle East)</MenuItem>
                    <MenuItem value={67}>Dashiki (West Africa)</MenuItem>
                    <MenuItem value={68}>Poncho (Latin America)</MenuItem>
                    <MenuItem value={69}>Barong Tagalog (Philippines)</MenuItem>
                    <MenuItem value={70}>Boubou (West Africa)</MenuItem>
                    <MenuItem value={71}>Scrubs (medical)</MenuItem>
                    <MenuItem value={72}>Lab coat</MenuItem>
                    <MenuItem value={73}>Chef’s uniform</MenuItem>
                    <MenuItem value={74}>Business suit</MenuItem>
                    <MenuItem value={75}>Coveralls</MenuItem>
                    <MenuItem value={76}>Flight suit</MenuItem>
                    <MenuItem value={77}>Military uniform</MenuItem>
                    <MenuItem value={78}>Police uniform</MenuItem>
                    <MenuItem value={79}>Firefighter uniform</MenuItem>
                    <MenuItem value={80}>Sports jersey</MenuItem>
                    <MenuItem value={81}>Compression shirt</MenuItem>
                    <MenuItem value={82}>Compression leggings</MenuItem>
                    <MenuItem value={83}>Yoga pants</MenuItem>
                    <MenuItem value={84}>Gym shorts</MenuItem>
                    <MenuItem value={85}>Rash guard</MenuItem>
                    <MenuItem value={86}>Cycling shorts</MenuItem>
                    <MenuItem value={87}>Ski jacket</MenuItem>
                    <MenuItem value={88}>Tracksuit</MenuItem>
                    <MenuItem value={89}>Scarf</MenuItem>
                    <MenuItem value={90}>Hat</MenuItem>
                    <MenuItem value={91}>Gloves</MenuItem>
                    <MenuItem value={92}>Belt</MenuItem>
                    <MenuItem value={93}>Tights</MenuItem>
                    <MenuItem value={94}>Stockings</MenuItem>
                    <MenuItem value={95}>Arm warmers</MenuItem>
                    <MenuItem value={96}>Leg warmers</MenuItem>
                    <MenuItem value={97}>Headband</MenuItem>
                    <MenuItem value={98}>Bandana</MenuItem>

                </Select>
            </FormControl>
        </Box>
    );
}
