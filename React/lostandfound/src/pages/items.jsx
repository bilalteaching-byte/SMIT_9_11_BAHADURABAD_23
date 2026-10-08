import { addDoc, getDocs } from "firebase/firestore"
import { useEffect, useState } from "react"
import Navbar from "../components/navbar"
import { auth, itemsRef } from "../utils/firebase"

function Items() {
  const [items, setAllItems] = useState([])

  const handleAddItem = async (event) => {
    event.preventDefault()

    try {
      const item = {
        userEmail: auth.currentUser?.email,
        userUid: auth.currentUser?.uid,
        itemName: event.target[0].value,
        itemDesc: event.target[1].value,
        lostPlace: event.target[2].value,
        lostDate: event.target[3].value,
        lostTime: event.target[4].value,
        itemPrice: event.target[5].value,
      }

      await addDoc(itemsRef, item)
      alert("Item added")
    } catch (error) {
      console.error("Failed to add item:", error)
    }
  }

  useEffect(() => {
    const getAllItems = async () => {
      const snapshot = await getDocs(itemsRef)
      const allItems = snapshot.docs.map((document) => ({
        ...document.data(),
        id: document.id,
      }))

      setAllItems(allItems)
    }

    getAllItems()
  }, [])

  return (
    <div>
      <Navbar />

      <div>
        <form onSubmit={handleAddItem}>
          <input placeholder="Item Name" name="item_name" />
          <input placeholder="Item Description" name="item_desc" />
          <input placeholder="Place" name="item_place" />
          <input placeholder="Date" type="date" name="item_date" />
          <input placeholder="Time" type="time" name="item_time" />
          <input placeholder="Price" type="number" name="item_price" />
          <input type="submit" value="Add Item" />
        </form>
      </div>
    </div>
  )
}

export default Items
