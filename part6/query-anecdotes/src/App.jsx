import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import AnecdoteList from './components/AnecdoteList'
import {NotificationProvider} from "./context/NotificationContext.jsx"

const App = () => {

    return (
        <div>
            <h3>Anecdote app</h3>
            <NotificationProvider>
                <Notification />
                <AnecdoteForm />
                <AnecdoteList />
            </NotificationProvider>
        </div>
    )
}

export default App
