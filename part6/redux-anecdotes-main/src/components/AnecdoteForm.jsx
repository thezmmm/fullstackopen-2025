import {useState} from "react";
import {useDispatch} from "react-redux";

const AnecdoteForm = () => {

    const dispatch = useDispatch()

    const [newAnecdote, setNewAnecdote] = useState('')

    const createNewAnecdote = (e) => {
        e.preventDefault()
        dispatch({type: 'NEW_ANECDOTE', payload: newAnecdote})
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