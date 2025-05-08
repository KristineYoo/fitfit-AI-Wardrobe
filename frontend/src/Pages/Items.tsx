// frontend/src/Pages/Items.tsx
// Last changed by Bao Vuong, 6:29PM 4/26/2025

// import data from '../../data/WardrobeData.json'
import ItemThumbnail from '../components/ItemThumbnail.tsx'
import FloatingActionButton from '../components/floatingEditButton.tsx';
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import axios from 'axios';
import { useEffect } from "react";
import { useState } from "react";
import { Item } from "../types/jsonDataTypes";
import DeleteItemModal from '../components/ClothingItemDelete.tsx';
import { Snackbar } from '@mui/material';

export function Items() {
  const [data, setData] = useState([]);
  const [del, setDelete] = useState(false);
  const[add, setAdd] = useState(false)

  const handleDelClose= () => {
    setDelete(false)

  }

  const handleAddClose= () => {
    setAdd(false)

  }

  useEffect(() => {
    const stat= sessionStorage.getItem("Status")
    console.log(stat)
    if (stat=="Delete") {
      setDelete(true)
      sessionStorage.setItem("Status", "none")
      console.log("deleted")
    }
    if (stat=="Add") {
      setAdd(true)
      sessionStorage.setItem("Status", "none")
      console.log("added")
    }
  })

  useEffect(() => {
    axios.get("/api/item/")
      .then((res) => {
        console.log(res.data); // Log for debugging
        setData(res.data.items || []); // Assuming the response is like { items: [...] }
      })
      .catch((err) => console.log(err));
  }, []);

  
  return (
    <>
      <h1>Items Page</h1>
      <FloatingActionButton />
      <DeleteItemModal></DeleteItemModal>
      <Box sx={{ m: 4 }}>
        <Grid container spacing={3}>
          {
            data.map((item: Item) => {
              if (item.deleted == false && item.visibility == "shown") {
                return (
                  <Grid size={2} key={item.id}>
                    <ItemThumbnail item={item} />
                  </Grid>

                )


              }
            })
          }
        </Grid>
        <Snackbar
        open={add}
        autoHideDuration={6000}
        onClose={handleAddClose}
        message="Item Added"
      />
      <Snackbar
        open={del}
        autoHideDuration={6000}
        onClose={handleDelClose}
        message="Item deleted"
      />
      </Box>
    </>
  )
}

