import { useState } from 'react'

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <div>
            <h1>give feedback</h1>
            <button onClick={() => setGood(good + 1)}>good</button>
            <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
            <button onClick={() => setBad(bad + 1)}>bad</button>
            <h1>statistics</h1>
            {totalNumber(good, neutral, bad) === 0 ? <p>No feedback given</p> :
                <div>
                    <StatisticLine text="good" value={good} />
                    <StatisticLine text="neutral" value={neutral} />
                    <StatisticLine text="bad" value={bad} />
                    <StatisticLine text="all" value={totalNumber(good, neutral, bad)} />
                    <StatisticLine text="average" value={average(good, neutral, bad)} />
                    <StatisticLine text="positive" value={positivePercentage(good, neutral, bad)} />
                </div>
            }
        </div>
    )
}

const StatisticLine = ({ text, value }) => {
    return(
        <div>
            {text} {value}
        </div>
    )
}

const totalNumber = (good, neutral, bad) => {
    return good + neutral + bad

}

const average = (good, neutral, bad) => {
    if(good + neutral + bad === 0) return 0
    return (good - bad) / (good + neutral + bad)
}

const positivePercentage = (good, neutral, bad) => {
    if (good + neutral + bad === 0) return '0 %'
    return (good / (good + neutral + bad)) * 100 + ' %'
}
export default App