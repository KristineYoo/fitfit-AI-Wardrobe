import Paper from '@mui/material/Paper';
import { FitThumbnail } from './FitThumbnail';
import { Fit } from '../types/jsonDataTypes';


export default function FitRecWindow( recs:Fit[] ) {
  return (
      <Paper elevation={1} sx={{p:1}}>
        {                                                       //Code not working starting here
          recs.map((rec:Fit, i:number) => (
            <FitThumbnail rec={rec} key={"fitThumbnail"+i}/>
          ))                                                    //ending here
        }
      </Paper>
  );
}