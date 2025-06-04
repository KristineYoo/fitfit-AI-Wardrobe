// frontend/src/Pages/Landing.tsx
// Last changed by Iain Gore, 11:40 AM 5/23/2025


import { Box, Button, Container, Typography } from '@mui/material'

export function Landing(){

    
    return (
      <div>
        <div style={{justifyContent:"left", display:"flex", maxWidth:"100", height:"100%", flexDirection:"column", float:"left"}}>
          <img src={"/img/clotheslineVertical.jpg"} alt="clothesline" width="100"  />
          <img src={"/img/clotheslineVertical.jpg"} alt="clothesline" width="100"  />
          <img src={"/img/clotheslineVertical.jpg"} alt="clothesline" width="100"  />
          <img src={"/img/clotheslineVertical.jpg"} alt="clothesline" width="100"  />
          <img src={"/img/clotheslineVertical.jpg"} alt="clothesline" width="100" height="240" />
          </div>
          <div style={{justifyContent:"left", display:"flex", maxWidth:"100", height:"100%", flexDirection:"column", float:"right"}}>
          <img src={"/img/clotheslineVerticalRight.jpg"} alt="clothesline" width="100"  />
          <img src={"/img/clotheslineVerticalRight.jpg"} alt="clothesline" width="100"  />
          <img src={"/img/clotheslineVerticalRight.jpg"} alt="clothesline" width="100"  />
          <img src={"/img/clotheslineVerticalRight.jpg"} alt="clothesline" width="100"  />
          <img src={"/img/clotheslineVerticalRight.jpg"} alt="clothesline" width="100" height="240" />
          </div>
        <Container sx={{height: "100%", color:"#f5f5f5"}}>
          <Typography variant="h1" sx={{color:"primary.main"}}>Welcome to Fitfit</Typography>
          <img src={"/img/mascot.jpg"} alt="mascot" height="300"/>
          <Typography variant="h3" sx={{color:"primary.main"}} paddingBottom={"15%"}>Discovering a fit that fits, every day!</Typography>
           <Typography  variant="h3" sx={{color:"primary.main"}}>Our Mission</Typography>
          <Typography variant='h5' sx={{color:"primary.main"}}>We aim to revolutionize the typically methods of wardrobe management and help empower everyone <br/> from their very first choice of the day, their outfit</Typography>
           <img
        src="/img/widest_uncropped_outfit_loop.gif"
        alt="Outfit Loop"
        style={{ height: "300px" }}
      />
          { (sessionStorage.getItem("login")!="True") && <Box
          padding={"5%"}>
          <Typography variant="h3" sx={{color:"primary.main"}}>Ready to get started?</Typography>
        <Button href="/#/login" variant='contained'>Login</Button>
        </Box>}
        { (sessionStorage.getItem("login")=="True") && <Box
          padding={"5%"}>
          <Typography variant="h3" sx={{color:"primary.main"}}>First time here?</Typography>
        <Button href="/#/login" variant='contained'>Get started</Button>
        </Box>}
        </Container>
      </div>
    )
}
