import type {CoursePart} from "../types/course";
import Part from "./Part";

type ContentProps = {
    courseParts: CoursePart[];
}

const Content = ({courseParts}:ContentProps) => {
    return (
        <div>
            {courseParts.map((part,index) => (
                <Part key={index} part={part} />
            ))}
        </div>
    );
}

export default Content;