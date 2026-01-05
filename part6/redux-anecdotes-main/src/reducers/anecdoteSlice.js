import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdoteService.js"

export const initializeAnecdotes = createAsyncThunk(
    'anecdotes/initialize',
    async () => {
        const anecdotes = await anecdoteService.getAll()
        return anecdotes
    }
)

export const createAnecdote = createAsyncThunk(
    'anecdotes/create',
    async (content) => {
        const newAnecdote = await anecdoteService.createNew(content)
        return newAnecdote
    }
)

export const voteAnecdote = createAsyncThunk(
    'anecdotes/vote',
    async (id) => {
        const updatedAnecdote = await anecdoteService.voteAnecdote(id)
        return updatedAnecdote
    }
)

const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState: [],
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(initializeAnecdotes.fulfilled, (state, action) => {
                return action.payload
            })
            .addCase(createAnecdote.fulfilled, (state, action) => {
                state.push(action.payload)
            })
            .addCase(voteAnecdote.fulfilled, (state, action) => {
                const updatedAnecdote = action.payload
                const index = state.findIndex(a => a.id === updatedAnecdote.id)
                if (index !== -1) {
                    state[index] = updatedAnecdote
                }
            })
    }
})

export default anecdoteSlice.reducer
