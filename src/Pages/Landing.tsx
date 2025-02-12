import data from '../../data/WardrobeData.json'
import { Container, Typography } from '@mui/material'
import FitRecWindow from '../components/FitRecWindow'

export function Landing(){
    const fit1 = {
        items: [data[0], data[3], data[4]],
        name: "Cute fit",
        tags: ["cute", "pink", "casual"]
    };

    const fit2 = {
        items: [data[2], data[5]],
        name:"Plain and Simple",
        tags:["clean","simple","casual","chill"]
    };

    var fit_recs = [fit1, fit2]
    
    return (
        <Container sx={{height: "50vh"}}>
            <Typography variant="h1">Welcome to Fitfit!</Typography>
            <FitRecWindow recs={fit_recs}/>
        </Container>
    )
}
