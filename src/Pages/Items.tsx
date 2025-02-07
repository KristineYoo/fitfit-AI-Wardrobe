import data from '../../data/WardrobeData.json'
import ItemThumbnail from '../Components/ItemThumbnail.jsx'

export function Items() {
  //import JSON file
  //const data = require('../../data/WardrobeData.json');
  
  
    return (
      <>
        <h1>Items Page</h1>
        {
          data.map((data, i) => (
            <div key={i}>{data.name}</div>
          ))
        }
      </>
    )
  }