import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { useState } from "react"
import { auth } from "../utils/firebase"
import { useNavigate } from "react-router"



function Auth() {
    const navigate = useNavigate()
    const [mode, setMode] = useState("login")

    const handleRegister = async (e) => {
        e.preventDefault()
        console.log(e)
        try {
            const obj = {
                name: e.target[0].value,
                email: e.target[1].value,
                password: e.target[2].value,
            }

            const user = await createUserWithEmailAndPassword(auth, obj.email, obj.password)
            console.log("user=>", user)
            navigate('/')
        }
        catch (e) {
            alert(e.message)
        }


    }

    const handleLogin = async (e) => {
        e.preventDefault()
        console.log(e)
        try {
            const obj = {
                email: e.target[0].value,
                password: e.target[1].value,
            }

            const user = await signInWithEmailAndPassword(auth, obj.email, obj.password)
            console.log("user=>", user)
            navigate('/')
        }
        catch (e) {
            alert(e.message)
        }

    }

    return (
        <div>
            {
                mode == "login" ?
                    <div className="flex flex-col gap-3 w-1/2 mx-auto">
                        <h1>Login</h1>
                        <form onSubmit={handleLogin} className="flex flex-col gap-3">
                            <input name="email" type="text" required placeholder="Email" />
                            <input name="password" type="password" placeholder="Password" required />
                            <input type="submit" value={"Submit"} />
                        </form>
                        <span>New to Platform <button onClick={() => setMode("register")}>Register</button></span>
                    </div>
                    :
                    <div className="flex flex-col gap-3 w-1/2 mx-auto">
                        <h1>Sign up</h1>
                        <form onSubmit={handleRegister} className="flex flex-col gap-3">
                            <input name="username" type="text" placeholder="Username" required />
                            <input name="email" type="email" required placeholder="Email" />
                            <input name="password" required type="password" placeholder="Password" />
                            <input type="submit" value={"Submit"} />
                        </form>

                        <span>Already have an account? <button onClick={() => setMode("login")}>Login</button></span>
                    </div>
            }



        </div>
    )
}

export default Auth