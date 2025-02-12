import data from '../../data/WardrobeData.json'
import ItemThumbnail from '../components/ItemThumbnail.jsx'

export function Items() {
  
    return (
      <>
        <h1>Items Page</h1>
        {
          data.map((item, i) => (
            <ItemThumbnail item={item} key={i}/>
          ))
        }
      </>
    )
  }