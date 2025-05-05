// Most recent mod: Iain Gore 5/5/25

import {Paper, Grid2, Typography, Box, TextField} from '@mui/material';
import { FitThumbnail } from './FitThumbnail';
import { Fit } from '../types/jsonDataTypes';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function FitRecWindow( {recs} : {recs:Fit[]} ) {

  
  return (
    <Box>
        <Typography 
          variant="h3" 
          sx={{
            pb:4,
            color: 'primary.main',
            fontWeight: 'bold',
            letterSpacing: 1.5,
            textAlign: 'center'
          }}
        >
          Recommended Fits
        </Typography>
        <Grid2 
        container spacing={4} >
          {
            recs.map((rec:Fit, i:number) => (
              <Grid2 size={{xs:12, sm:12, md:12, xl:12}} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <FitThumbnail rec={rec} key={"fitThumbnail"+i}/>
              </Grid2>
            ))
          }
        </Grid2>
      </Box>
  );
}