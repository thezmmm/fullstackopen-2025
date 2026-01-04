import {useDispatch, useSelector} from "react-redux";
import {setFilter} from "../reducers/filterSlice.js";


const Filter = () => {
    const dispatch = useDispatch()
    const filter = useSelector(state => state.filter)

    const handleChange = (e) => {
        dispatch(setFilter(e.target.value))
    }

    return (
        <div>
        filter <input value={filter} onChange={handleChange}/>
        </div>
    )
}

export default Filter