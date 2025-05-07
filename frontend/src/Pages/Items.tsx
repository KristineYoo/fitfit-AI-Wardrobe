// frontend/src/Pages/Items.tsx
// Last changed by Bao Vuong, 6:29PM 4/26/2025

import ItemThumbnail from '../components/ItemThumbnail.tsx';
import FloatingActionButton from '../components/floatingEditButton.tsx';
import Grid from '@mui/material/Grid'; // Use standard Grid
import Box from '@mui/material/Box';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Item } from '../types/jsonDataTypes';
import DeleteItemModal from '../components/ClothingItemDelete.tsx';

export function Items() {
  const [data, setData] = useState<Item[]>([]);

  useEffect(() => {
    axios.get("/api/item/")
      .then((res) => {
        setData(res.data.items || []);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Box sx={{ backgroundColor: 'white' }}>
      <FloatingActionButton />
      <DeleteItemModal />
      <Box sx={{ m: 3 }}>
        <Grid container spacing={1}>
          {data.map((item: Item) =>
            (item.deleted === false && item.visibility === "shown") && (
              <Grid
                item
                xs={12}
                sm={6}
                md={6}
                lg={3}
                key={item.id}
              >
                <ItemThumbnail item={item} />
              </Grid>
            )
          )}
        </Grid>
      </Box>
    </Box>
  );
}