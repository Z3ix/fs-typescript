import type { CoursePart } from "../types";
import { assertNever } from "../utils/helper";

const partStyle ={
    border:"1px solid white",
    padding:"2px",
    marginBottom: "5px"
}

export const Part = ({part}:{part: CoursePart}) => {
    switch(part.kind){
        case "basic":{
            return (
                <div style={partStyle}>{part.name} {part.exerciseCount}<br/>{part.description}</div>
            )
        }
        case "group":{
            return <div style={partStyle}>{part.name} {part.exerciseCount}<br/> group project count {part.groupProjectCount}</div>
        }
        case "background":{
            return <div style={partStyle}>{part.name} {part.exerciseCount}<br/>{part.description}<br/>{part.backgroundMaterial}</div>
        }
        case "special":{
            return <div style={partStyle}>{part.name} {part.exerciseCount}<br/>{part.description}<br/>
            requiremets: {part.requirements.map(item => `${item} `)}</div>
        }
        default:{
            return assertNever(part)
        }
    }

}