import { addDoc, getDocs } from "firebase/firestore"
import Navbar from "../components/navbar"
import { auth, db, itemsRef } from "../utils/firebase"
import { useEffect, useState } from "react"



function Items() {
    const [items, setAllItems] = useState([])
    const handleAddItem = async (e) => {
        e.preventDefault()
        try {
            const itemObj = {
                userEmail: auth.currentUser?.email,
                userUid: auth.currentUser?.uid,
                itemName: e.target[0].value,
                itemDesc: e.target[1].value,
                lostPlace: e.target[2].value,
                lostDate: e.target[3].value,
                lostTime: e.target[4].value,
                itemPrice: e.target[5].value,
            }
            console.log("itemObj=>", itemObj)

            await addDoc(itemsRef, itemObj)
            alert('item added')
        }
        catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getAllItems()
    }, [])

    const getAllItems = async () => {
        const snapshot = await getDocs(itemsRef)
        let arr = []
        snapshot.forEach((obj) => {
            let itemInfo = { ...obj.data(), id: obj.id }
            arr.push(itemInfo)
        })
        setAllItems(arr)
    }

    console.log(items)
    return (
        <div>
            <Navbar />

            <div>
                <form onSubmit={handleAddItem}>
                    <input placeholder="Item Name" name="item_name" />
                    <input placeholder="Item Description" name="item_desc" />
                    <input placeholder="Place" name="item_place" />
                    <input placeholder="Date" type="date" name="item_date" />
                    <input placeholder="Time" type="time" name="item_place" />
                    <input placeholder="Price" type="number" name="item_price" />
                    <input type="submit" value="Add Item" />
                </form>
            </div>
        </div>
    )
}

export default Items