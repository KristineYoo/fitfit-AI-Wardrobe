import { Container, Typography } from '@mui/material'
import pink from "@mui/material/colors/pink";

//using mui example

export function Landing(){
    return (
        <Container sx={{backgroundColor:pink[100], height: "50vh"}}>
            <Typography variant="h1">Landing Page</Typography>
        </Container>
    )
}
