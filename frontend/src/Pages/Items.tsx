// import data from '../../data/WardrobeData.json'
import ItemThumbnail from '../components/ItemThumbnail.tsx'
import LogItemModal from '../components/ClothingItemLog.tsx'
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import axios from 'axios';
import { useEffect } from "react";
import { useState } from "react";
import { Item } from "../types/jsonDataTypes";
import DeleteItemModal from '../components/ClothingItemDelete.tsx';

export function Items() {
    const [data, setData] = useState([]);
    
    useEffect(() => {
      axios.get("/api/items")
        .then((res) => {
          console.log(res.data); // Log for debugging
          setData(res.data.items || []); // Assuming the response is like { items: [...] }
        })
        .catch((err) => console.log(err));
    }, []);
    
    return (
      <>
        <h1>Items Page</h1>
        <LogItemModal></LogItemModal>
        <DeleteItemModal></DeleteItemModal>
        <Box sx={{ m: 4 }}>
          <Grid container spacing={3}>
                {
                data.map((item: Item) => (
                  <Grid size={2} key={item.id}>
                  <ItemThumbnail item={item} />
                  </Grid>
                ))
                }
            </Grid>
        </Box>
      </>
    )
  }

