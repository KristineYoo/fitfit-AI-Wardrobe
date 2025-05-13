// frontend/src/Pages/Items.tsx
// Last changed by Bao Vuong, 6:29PM 4/26/2025
// last changed by Kristine Yoo, 7:29 5/8/2025
// Mod by Sophia Somers 5/8/25
import ItemThumbnail from '../components/ItemThumbnail.tsx';
import FloatingActionButton from '../components/floatingEditButton.tsx';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Item } from '../types/jsonDataTypes';
import DeleteItemModal from '../components/ClothingItemDelete.tsx';
import ItemSearchBar from '../components/ItemSearchBar.tsx';
import loadingAnimation from "../assets/Primary-Load.svg";

export function Items() {
  const [data, setData] = useState<Item[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Make a 500ms delay between searching db
    const timeout = setTimeout(() => {
      fetchData();
    }, 200);
    return () => clearTimeout(timeout);
  }, [searchTerm]);

  // Make API call
  const fetchData = async () => {
    setLoading(true);
    axios.get('/api/item/', {
      params: { term: searchTerm }
    })
      .then(response => {
        setError("");
        setData(response.data.items || []);
      })
      .catch(error => {
        setError("An error occurred. Please try again later.");
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Box sx={{ backgroundColor: 'white', minHeight: '100vh', marginTop: -1, pb: 8 }}>
      <FloatingActionButton />
      <DeleteItemModal />
      <ItemSearchBar setSearchTerm={setSearchTerm} />

      {loading && <Grid container spacing={2} sx={{justifyContent: "center", alignItems: "center", padding:"10px"}}><Grid size={{xs:4, md:2, lg:1}}><img src={loadingAnimation}/></Grid></Grid>}
      {error && <Box sx={{ m: 3, color: 'error.main' }}>{error}</Box>}

      <Box sx={{ m: 3 }}>
        <Grid container spacing={2}>
          {data.map((item: Item) =>
            (item.deleted === false && item.visibility === "shown") && (
              <Grid size={{xs:12,sm:6,md:6,lg:3}} key={item.id}>
                <ItemThumbnail item={item} />
              </Grid>
            )
          )}
        </Grid>
      </Box>
    </Box>
  );
}