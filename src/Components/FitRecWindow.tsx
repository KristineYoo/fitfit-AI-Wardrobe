import {Paper, Grid2, Typography} from '@mui/material';
import { FitThumbnail } from './FitThumbnail';
import { Fit } from '../types/jsonDataTypes';


export default function FitRecWindow( {recs} : {recs:Fit[]} ) {
  return (
      <Paper 
        elevation={5} 
        sx={{pl:3, pr:3, pt:1, pb:1, m:2, width:'100%'}}
      >
        <Typography 
          variant="h3" 
          sx={{
            p:2,
            pb:4,
            color: 'primary',
            fontWeight: 'bold',
            letterSpacing: 1.5,
            textAlign: 'center'
          }}
        >
          Recommended Fits
        </Typography>
        <Grid2 container spacing={4}>
          {
            recs.map((rec:Fit, i:number) => (
              <Grid2 size={{xs:12, sm:6, md:4, xl:3}}>
                <FitThumbnail rec={rec} key={"fitThumbnail"+i}/>
              </Grid2>
            ))
          }
        </Grid2>
      </Paper>
  );
}