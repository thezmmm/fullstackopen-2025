import {useState} from "react";
import loginService from "../services/loginService.js";
import blogService from "../services/blogService.js";
const LoginForm = ({setUser,setNotification}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')


    const handleLogin = async (event) => {
        event.preventDefault()
        try{
            const user = await loginService.login({
                username, password,
            })
            setUser(user)
            blogService.setToken(user.token)
            console.log('logging in with', username, password)
            window.localStorage.setItem(
                'user', JSON.stringify(user)
            )
            setUsername('')
            setPassword('')
        }catch (exception){
            console.log(exception)
            const message = {
                message: 'wrong username or password',
                type: 'error'
            }
            setNotification(message)
        }
    }

    return (
        <div>
            <h2>Log in to application</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>
                        username
                        <input type="text" name="username" value={username}
                               onChange={({ target }) => setUsername(target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        password
                        <input type="password" name="password" value={password}
                               onChange={({ target }) => setPassword(target.value)}
                        />
                    </label>
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )
}

export default LoginForm