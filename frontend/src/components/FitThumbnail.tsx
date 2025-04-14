import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { Fit } from '../types/jsonDataTypes';
import { ImageList, ImageListItem, ImageListItemBar } from '@mui/material';

export function FitThumbnail({rec} : {rec:Fit}){
    const itemData = rec.items
    console.log(rec)
    console.log(itemData)
    
    return (
    <Card sx={{ maxWidth: 345 }}>
        <CardMedia>
            <ImageList 
                sx={{ 
                    width: '100%',
                    height: 'auto',  // height will adjust based on images inside
                    maxHeight: '100%'
                }}  
                cols={2} 
                gap={8}
            >
                {itemData.map((item) => (
                    <ImageListItem key={item.image} sx={{height: '100% !important'}}>
                    <ImageListItemBar
                        sx={{
                            background: 'linear-gradient(to bottom, rgba(0,0,0,0.7)0%, rgba(0,0,0,0.3)70%, rgba(0,0,0,0)100%',
                            height: 'auto',    // Allow height to adjust to content
                            minHeight: '48px', // Set minimum height
                            '& .MuiImageListItemBar-title': { //Format the title
                                fontSize: '1rem',
                                padding: '8px',
                                lineHeight: 1.2
                            }
                        }}
                        title={item.name}
                    />
                    <div style={{
                            width: 164,
                            height: 164,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#f9f9f9', // optional
                            overflow: 'hidden'
                            }}>
                    <img
                        src={item.imageData ?? undefined}
                        alt={item.name}
                        loading="lazy"
                        style={{
                            objectFit: 'contain',
                            width: '100%',
                            height: '100%'
                        }}
                    />
                    </div>
                    </ImageListItem>
                ))}
            </ImageList>
        </CardMedia>
        <CardContent sx={{px:2}}>
            <Stack 
                direction="row" 
                spacing={1}
                sx={{ 
                    flexWrap: 'wrap', 
                    gap: 1,
                    width: '100%',   // Ensure stack takes full width
                    overflow: 'hidden'  // Contain the content
                }}
                >
                
                {rec.tags.slice(0, 3).map((tag: string, i: number) => ( //only take the first four tags
                    <Chip 
                        label={tag} 
                        color="success" 
                        variant="outlined" 
                        key={"FitStylingTag"+i}
                        sx={{ 
                            mb: 1,
                            maxWidth: '100%',  // Ensure chips don't overflow
                            '& .MuiChip-label': { //format label text
                                whiteSpace: 'normal',  // Allow text wrapping if needed
                            }
                        }}
                    />
                ))}
                {rec.tags.length > 3 && ( //for more than four tags, put a '...'
                    <Chip 
                        label="..."
                        key="more-tags"
                        sx={{ mb: 1 }}
                    />
                )}
                
            </Stack>
        </CardContent>
    </Card>
    );
}