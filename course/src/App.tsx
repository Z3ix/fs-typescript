import type { CoursePart } from "./types";
import { Part } from "./components/Part";

const App = () => {
  const courseName = "Half Stack application development";



const courseParts: CoursePart[] = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is an awesome course part",
    kind: "basic"
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3,
    kind: "group"
  },
  {
    name: "Basics of type Narrowing",
    exerciseCount: 7,
    description: "How to go from unknown to string",
    kind: "basic"
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
    kind: "background"
  },
  {
    name: "TypeScript in frontend",
    exerciseCount: 10,
    description: "a hard part",
    kind: "basic",
  },
  {
    name: "Backend development",
    exerciseCount: 21,
    description: "Typing the backend",
    requirements: ["nodejs", "jest"],
    kind: "special"
  }
];


  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  const Header = ({courseName}:{courseName: string}) => {
    return <h1>{courseName}</h1>
  }

  const Content = ({courseParts}: {courseParts: CoursePart[]}) => {
    return(<>
    {courseParts.map(part => <Part part={part} key={part.name}/>)
    }
    </>)
  }

  const Footer = ({totalExercises}: {totalExercises: number}) => {
    return <p>Number of exercises {totalExercises}</p>
  }

  return (
    <div>
      <Header courseName={courseName}/>
      <Content courseParts= {courseParts} />
      <Footer totalExercises={totalExercises} />
    </div>
  );
};

export default App;