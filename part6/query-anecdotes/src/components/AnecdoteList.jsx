import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import anecdoteService from "../services/anecdoteService.js";

const AnecdoteList = () => {
    const queryClient = useQueryClient()

    const { data: anecdotes, isLoading, isError, error, refetch } =
        useQuery({
            queryKey: ['anecdotes'],
            queryFn: anecdoteService.getAll,
            retry: 1
        })

    const voteAnecdote = useMutation({
        mutationFn: anecdoteService.voteAnecdote,
        onSuccess: () => {
            queryClient.invalidateQueries(['anecdotes'])
        }
    })

    const handleVote = async (id) => {
        voteAnecdote.mutate(id)
    }

    if (isLoading) {
        return <div>Loading...</div>
    }
    if (isError) {
        return <div>Error: {error.message}</div>
    }
    return (
        <div>
            {anecdotes.map((anecdote) => (
                <div key={anecdote.id}>
                    <div>{anecdote.content}</div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => handleVote(anecdote.id)}>vote</button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default AnecdoteList