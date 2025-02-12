import data from '../../data/WardrobeData.json'
import ItemThumbnail from '../Components/ItemThumbnail.js'
import LogItemModal from '../Components/ClothingItemLog.tsx'





export function Items() {

  return (
    <>
      <h1>Items Page</h1>
      <LogItemModal></LogItemModal>
      {
        data.map((item, i) => (
          <ItemThumbnail item={item} key={i} />
        ))
      }
    </>
  )
}

