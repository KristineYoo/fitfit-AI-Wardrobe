import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export function FitThumbnail(rec:any){
    return (
    <Card sx={{ maxWidth: 345 }}>
        <Typography gutterBottom variant="h5" component="div">
                {rec.name}
        </Typography>
        <CardMedia
            component="img"
            alt={rec.name}
            height="140"
            image="/static/images/cards/contemplative-reptile.jpg"
        />
        <CardContent>
            <Stack direction="row" spacing={1}>
                
                {
                rec.tags.map((tag: string, i: number) => (
                    <Chip label={tag} color="success" variant="outlined" key={"FitStylingTag"+i}/>
                ))
                }
                
            </Stack>
        </CardContent>
    </Card>
    );
}