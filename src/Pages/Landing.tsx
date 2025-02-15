import data from '../../data/WardrobeData.json'
import { Container, Typography } from '@mui/material'
import FitRecWindow from '../components/FitRecWindow'
import { Fit, Item } from '../types/jsonDataTypes'

export function Landing(){
    const all_items = data as Item[];
    console.log(all_items[0])
    const fit1: Fit = {
        items: [all_items[0], all_items[3], all_items[4]],
        name: "Cute fit",
        tags: ["cute", "pink", "casual"]
    };

    const fit2: Fit = {
        items: [all_items[2], all_items[5]],
        name:"Plain and Simple",
        tags:["clean","simple","casual","chill"]
    };

    var fit_recs:Fit[] = [fit1, fit2]
    
    return (
        <Container sx={{height: "50vh"}}>
            <Typography variant="h1">Welcome to Fitfit!</Typography>
            <FitRecWindow recs={fit_recs}/>
        </Container>
    )
}
