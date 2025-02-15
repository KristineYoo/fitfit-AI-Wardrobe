import Paper from '@mui/material/Paper';
import { FitThumbnail } from './FitThumbnail';
import { Fit } from '../types/jsonDataTypes';
import Grid from "@mui/material/Grid2";


export default function FitRecWindow( {recs} : {recs:Fit[]} ) {
  return (
      <Paper elevation={1} sx={{p:1}}>
        <Grid container spacing={4}>
          {
            recs.map((rec:Fit, i:number) => (
              <Grid size={{xs:12, sm:6, md:4, xl:3}}>
                <FitThumbnail rec={rec} key={"fitThumbnail"+i}/>
              </Grid>
            ))
          }
        </Grid>
      </Paper>
  );
}