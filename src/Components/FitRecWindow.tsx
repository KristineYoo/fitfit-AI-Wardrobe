import Paper from '@mui/material/Paper';
import { FitThumbnail } from './FitThumbnail';


export default function SimplePaper( recs:any ) {
  return (
      <Paper elevation={1} sx={{p:1}}>
        {                                                       //Code not working starting here
          recs.map((rec:any, i:number) => (
            <FitThumbnail rec={rec} key={"fitThumbnail"+i}/>
          ))                                                    //ending here
        }
      </Paper>
  );
}