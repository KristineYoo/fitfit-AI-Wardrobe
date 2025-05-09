// frontend/src/Pages/Items.tsx
// Last changed by Bao Vuong, 6:29PM 4/26/2025
// last changed by Kristine Yoo, 7:29 5/8/2025
// Mod by Sophia Somers 5/8/25
import ItemThumbnail from '../components/ItemThumbnail.tsx';
import FloatingActionButton from '../components/floatingEditButton.tsx';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Item } from '../types/jsonDataTypes';
import DeleteItemModal from '../components/ClothingItemDelete.tsx';
import ItemSearchBar from '../components/ItemSearchBar.tsx';
import { Alert, Snackbar } from '@mui/material';

export function Items() {
  const [data, setData] = useState<Item[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState(false);
  const [del, setDelete] = useState(false);
  const [add, setAdd] = useState(false)
  const [up, setUp] = useState(false)

  const handleDelClose= () => {
    setDelete(false)

  }

  const handleErrorClose= () => {
    setError(false)

  }

  const handleAddClose= () => {
    setAdd(false)

  }

  const handleUpClose= () => {
    setUp(false)

  }

  useEffect(() => {
    const stat= sessionStorage.getItem("Status")
    console.log(stat)
    if (stat=="Delete") {
      setDelete(true)
      sessionStorage.setItem("Status", "none")
      console.log("deleted")
    }
    if (stat=="Error") {
      setError(true)
      sessionStorage.setItem("Status", "none")
      console.log("error")
    }
    if (stat=="Update") {
      setUp(true)
      sessionStorage.setItem("Status", "none")
      console.log("updated")
    }
    if (stat=="Add") {
      setAdd(true)
      sessionStorage.setItem("Status", "none")
      console.log("added")
    }
  })

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
        setData(response.data.items || []);
      })
      .catch(error => {
        setError(true);
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

      {loading && <Box sx={{ m: 3 }}>Loading items...</Box>}
      {error && <Box sx={{ m: 3, color: 'error.main' }}>{error}</Box>}

      <Box sx={{ m: 3 }}>
        <Grid container spacing={2}>
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
        <Snackbar
        open={add}
        autoHideDuration={6000}
        onClose={handleAddClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleAddClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Item Added
        </Alert>
      </Snackbar>
      <Snackbar
        open={up}
        autoHideDuration={6000}
        onClose={handleUpClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      
      >
      <Alert
          onClose={handleUpClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Item Updated
        </Alert>
      </Snackbar>
      <Snackbar
        open={error}
        autoHideDuration={6000}
        onClose={handleErrorClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleErrorClose}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Error has occured please try again
        </Alert>
      </Snackbar>
      <Snackbar
        open={del}
        autoHideDuration={6000}
        onClose={handleDelClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleDelClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Item deleted
        </Alert>
      </Snackbar>
      </Box>
    </Box>
  );
}