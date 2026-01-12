import type {CoursePart} from "../types/course";
import assertNever from "../utils/assertNever";

type PartProps = {
    part: CoursePart;
    index: number;
}

const Part = ({part}: PartProps) => {
    switch (part.kind) {
        case "basic":
            return (
                <div>
                    <h3>{part.name} {part.exerciseCount}</h3>
                    <p>{part.description}</p>
                </div>
            );
        case "group":
            return (
                <div>
                    <h3>{part.name} {part.exerciseCount}</h3>
                    <p>Group projects: {part.groupProjectCount}</p>
                </div>
            );
        case "background":
            return (
                <div>
                    <h3>{part.name} {part.exerciseCount}</h3>
                    <p>{part.description}</p>
                    <p>Background material: <a href={part.backgroundMaterial}>{part.backgroundMaterial}</a></p>
                </div>
            );
        case "special":
            return (
                <div>
                    <h3>{part.name} {part.exerciseCount}</h3>
                    <p>{part.description}</p>
                    <p>Requirements: {part.requirements.join(", ")}</p>
                </div>
            )
        default:
            return assertNever(part);
    }
}

export default Part;