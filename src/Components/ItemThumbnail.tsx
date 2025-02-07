import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export default function ItemThumbnail({ item }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt={item.title}
        height="140"
        image="/static/images/cards/contemplative-reptile.jpg"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {item.name}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {item.note}
        </Typography>
      </CardContent>
      <Stack direction="row" spacing={1}>
        
        {
          item.styling.tags.map((tag: string, i: number) => (
            <Chip label={tag} color="success" variant="outlined" key={"stylingTag"+i}/>
          ))
        }
        
      </Stack>
    </Card>
  );
}
