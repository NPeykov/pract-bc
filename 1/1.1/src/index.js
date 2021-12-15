import React from "react";
import ReactDOM from "react-dom";

//content

const title1 = "Half Stack application development";

const parts = [
  {
    name: "Fundamentals of React",
    exercises: 10,
  },
  {
    name: "Using props to pass data",
    exercises: 7,
  },
  {
    name: "State of a component",
    exercises: 14,
  },
];

const Header = ({ title }) => <h1>{title}</h1>;

const Part = ({ parts }) => {
  return parts.map(function (element) {
    return (
      <p>
        {element.name} {element.exercises}
      </p>
    );
  });
};

const Total = ({ parts }) => {
  const total = parts.reduce(function(prevValue, currentValue) {
    return {
      exercises: prevValue.exercises + currentValue.exercises
    }
  });

  return (
    <p>
      <br />
      Number of exercises {total.exercises}
    </p>
  );
};

const App = () => {
  return (
    <div>
      <Header title={title1} />
      <Part parts={parts} />
      <Total parts={parts} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
