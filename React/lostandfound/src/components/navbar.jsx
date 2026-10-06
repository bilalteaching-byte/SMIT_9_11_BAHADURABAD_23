import { Link } from "react-router"
import { auth } from "../utils/firebase"

function Navbar() {
    return (
        <div className="flex items-center justify-between p-3 ">
            <h1>Logo</h1>
            {
                auth.currentUser ?
                    <div className="flex gap-2">
                        <span>{auth?.currentUser?.email}</span>
                        <button>Logout</button>
                    </div>
                    :
                    <Link to={'/auth'} >Login </Link>
            }
        </div>
    )
}   

export default Navbar