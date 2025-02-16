import data from '../../data/WardrobeData.json'
import ItemThumbnail from '../components/ItemThumbnail.tsx'
import LogItemModal from '../components/ClothingItemLog.tsx'
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";

export function Items() {
  
    return (
      <>
        <h1>Items Page</h1>
        <LogItemModal></LogItemModal>
        <Box sx={{ m: 4 }}>
          <Grid container spacing={3}>
              {
                data.map((item, i) => (
                  <Grid size={2}>
                    <ItemThumbnail item={item} key={i}/>
                  </Grid>
                ))
              }
            </Grid>
        </Box>
      </>
    )
  }

