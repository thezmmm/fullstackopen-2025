import {useDispatch, useSelector} from "react-redux"
import {showNotification} from "../reducers/notificationSlice.js"
import {initializeAnecdotes, voteAnecdote} from "../reducers/anecdoteSlice.js"
import {useEffect} from "react"

const AnecdoteList = () => {

    const dispatch = useDispatch()
    const filter = useSelector(state => state.filter)

    const anecdotes = useSelector(state => state.anecdotes)
        .slice()
        .sort((a, b) => b.votes - a.votes)
        .filter(anecdote =>
            anecdote.content.toLowerCase().includes(filter.toLowerCase())
        )

    useEffect(() => {
        dispatch(initializeAnecdotes())
    }, [dispatch])

    const vote = id => {
        console.log('vote', id)
        dispatch(voteAnecdote(id))
        dispatch(showNotification(`you voted '${anecdotes.find(a => a.id === id).content}'`))
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