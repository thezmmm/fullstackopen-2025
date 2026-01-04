import {useDispatch, useSelector} from "react-redux";
import { vote as voteAction } from '../reducers/anecdoteSlice'
import {clearNotification, setNotification} from "../reducers/notificationSlice.js";

const AnecdoteList = () => {

    const dispatch = useDispatch()
    const filter = useSelector(state => state.filter)

    const anecdotes = useSelector(state => state.anecdotes)
        .slice()
        .sort((a, b) => b.votes - a.votes)
        .filter(anecdote =>
            anecdote.content.toLowerCase().includes(filter.toLowerCase())
        )

    const vote = id => {
        console.log('vote', id)
        dispatch(voteAction(id))
        dispatch(setNotification(`you voted '${anecdotes.find(a => a.id === id).content}'`))
        setTimeout(() => {
            dispatch(clearNotification())
        }, 5000)
    }

    return (
        <div>
            {anecdotes.map(anecdote => (
                <div key={anecdote.id}>
                    <div>{anecdote.content}</div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default AnecdoteList