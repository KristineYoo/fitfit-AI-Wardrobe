import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import RemoveIcon from '@mui/icons-material/Remove';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { Item } from '../types/jsonDataTypes.ts'
import Button from '@mui/material/Button';
import axios from 'axios';
import Box from '@mui/material/Box';



export default function ItemThumbnail({ item }:{ item:Item}) {
  const deleted = () => {
    axios.delete("/api/delete-item/"+String(item.id));
    window.location.reload();
  }
  if (item.deleted==false && item.visibility=="shown")
    return (
        <Card sx={{ maxWidth: 300 }}>
          <Box textAlign='right'>
            <Button onClick={deleted} startIcon={<RemoveIcon/>} variant='contained' style={{height: '30px', width : '20px'}}></Button>
          </Box>
          <CardMedia
            component="img"
            alt={item.name}
            height="140"
            image={item.image}
            //This is what should be sizing the photos
            sx={{p:1, objectFit:"contain", mx:"auto"}}
          />
          <CardContent sx={{ mt: 2}}>
            <Typography gutterBottom variant="h5" component="div">
              {item.name}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {item.note}
            </Typography>
          </CardContent>
          <Stack direction="row" spacing={1} sx={{p:1}}>
            
            {
              item.styling.tags.map((tag: string, i: number) => (
                <Chip label={tag} color="success" variant="outlined" key={"stylingTag"+i}/>
              ))
            }
            
          </Stack>
        </Card>
    );
}
