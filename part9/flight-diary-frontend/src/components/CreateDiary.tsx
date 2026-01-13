import type {NewDiary} from "../types/diary";
import {useState} from "react";
import * as React from "react";
import {useDispatch} from "react-redux";
import {addDiary} from "../slice/diarySlice";

const CreateDiary = () => {
    const [formValues, setFormValues] = useState<NewDiary>({
        date: '',
        weather: 'sunny',
        visibility: 'great',
        comment: ''
    });

    const dispatch = useDispatch();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const {name, value} = event.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    };

    const handleSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();
        dispatch(addDiary(formValues));
    };

    return (
        <div>
            <h2>Create New Diary Entry</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="date">Date:</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={formValues.date}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="weather">Weather:</label>
                    <select
                        id="weather"
                        name="weather"
                        value={formValues.weather}
                        onChange={handleChange}>
                        <option value="sunny">Sunny</option>
                        <option value="rainy">Rainy</option>
                        <option value="cloudy">Cloudy</option>
                        <option value="stormy">Stormy</option>
                        <option value="windy">Windy</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="visibility">Visibility:</label>
                    <select
                        id="visibility"
                        name="visibility"
                        value={formValues.visibility}
                        onChange={handleChange}>
                        <option value="great">Great</option>
                        <option value="good">Good</option>
                        <option value="ok">Ok</option>
                        <option value="poor">Poor</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="comment">Comment:</label>
                    <input
                        id="comment"
                        name="comment"
                        type="text"
                        value={formValues.comment}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Add</button>
            </form>
        </div>
    )
}

export default CreateDiary;