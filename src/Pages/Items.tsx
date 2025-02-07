import data from '../../data/WardrobeData.json'
import ItemThumbnail from '../Components/ItemThumbnail.jsx'
import BasicModal from '../Components/ClothingItemLog.tsx'





export function Items() {
  
    return (
      <>
        <h1>Items Page</h1>
        <BasicModal></BasicModal>
        {
          data.map((item, i) => (
            <ItemThumbnail item={item} key={i}/>
          ))
        }
      </>
    )
  }

