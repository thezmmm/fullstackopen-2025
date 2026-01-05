import {useMutation, useQueryClient} from "@tanstack/react-query"
import anecdoteService from "../services/anecdoteService.js"
import {useNotification} from "../context/NotificationContext.jsx";

const AnecdoteForm = () => {

    const queryClient = useQueryClient()

    const {notification, showNotification} = useNotification()

    const anecdoteMutation = useMutation({
        mutationFn: anecdoteService.createNew,
        onSuccess: () => {
            queryClient.invalidateQueries(['anecdotes'])
        }
    })

    const onCreate = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        if (content.length < 5){
            showNotification(`Anecdote must be at least 5 characters long`)
            return
        }
        console.log('new anecdote')
        anecdoteMutation.mutate(content)
    }

    return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
    )
}

export default AnecdoteForm
