import {useState} from "react";
import {useDispatch} from "react-redux";
import {createAnecdote} from "../reducers/anecdoteSlice.js";

const AnecdoteForm = () => {

    const dispatch = useDispatch()

    const [newAnecdote, setNewAnecdote] = useState('')

    const createNewAnecdote = (e) => {
        e.preventDefault()
        dispatch(createAnecdote(newAnecdote))
        setNewAnecdote('')
    }

    return (
        <div>
            <h2>create new</h2>
            <form>
                <div>
                    <input value={newAnecdote} onChange={e=>setNewAnecdote(e.target.value)}/>
                </div>
                <button onClick={createNewAnecdote}>create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm