const total = (parts) => {
    const total = parts.parts.reduce((sum, part) => sum + part.exercises, 0);
    return (
        <p>total of {total} exercises</p>
    )
}

export default total;