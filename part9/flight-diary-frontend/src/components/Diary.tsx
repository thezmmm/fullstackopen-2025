import type {Diary} from "../types/diary";

type DiaryProps = {
    diary: Diary
}

const DiaryComponent = ({diary}:DiaryProps) => {
    return (
        <div>
            <h3>{diary.date}</h3>
            <p>{diary.comment}</p>
            <p>Visibility: {diary.visibility}</p>
            <p>Weather: {diary.weather}</p>
        </div>
    )
}

export default DiaryComponent;