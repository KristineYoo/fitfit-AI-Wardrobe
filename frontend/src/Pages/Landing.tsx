import axios from 'axios';
import { useEffect } from "react";
import { useState } from "react";
import { Container, Typography } from '@mui/material'
import FitRecWindow from '../components/FitRecWindow'
import { Fit, Item } from '../types/jsonDataTypes'

export function Landing(){
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);  // loading is true at the beginning until data is fetched from the backend
    
    useEffect(() => {
        axios.get('http://localhost:5000/api/items')
            .then((res) => {
                console.log(res.data);
                setData(res.data.items || []);
                setLoading(false);  // Set loading to false after data is fetched
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);  // Stop loading even if there's an error
            });
    }, []);

    if (loading) {
        return <Typography>Loading...</Typography>; 
    }

    const all_items = data as Item[];
    console.log(all_items[0])
    const fit1: Fit = {
        items: [all_items[0], all_items[3], all_items[4]],
        tags: ["cute", "pink", "casual"]
    };

    const fit2: Fit = {
        items: [all_items[2], all_items[5]],
        tags:["clean","simple","casual","chill"]
    };

    var fit_recs:Fit[] = [fit1, fit2]
    
    return (
        <Container sx={{height: "50vh"}}>
            <Typography variant="h1" sx={{p:2}}>Welcome to Fitfit!</Typography>
            <FitRecWindow recs={fit_recs}/>
        </Container>
    )
}
