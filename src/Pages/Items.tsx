import data from '../../data/WardrobeData.json'
<<<<<<< HEAD
import ItemThumbnail from '../Components/ItemThumbnail.jsx'
import LogItemModal from '../Components/ClothingItemLog.tsx'
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
=======
import ItemThumbnail from '../Components/ItemThumbnail.js'
import LogItemModal from '../Components/ClothingItemLog.tsx'





export function Items() {

  return (
    <>
      <h1>Items Page</h1>
      <LogItemModal></LogItemModal>
      {
        data.map((item, i) => (
          <ItemThumbnail item={item} key={i} />
        ))
      }
    </>
  )
}

>>>>>>> dev
