import React, { useState } from "react";
import ReactDOM from "react-dom";

const INITIAL_STATS = {
  good: 0,
  neutral: 0,
  bad: 0,
};

const Stats = ({ values }) => {
  let good = values.good;
  let neutral = values.neutral;
  let bad = values.bad;
  let total = good + neutral + bad;

  return (
    <>
      <h2>stats</h2>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>total {total}</p>
      <br/>
      <p>positive average {total === 0 ? 'No feedback given' : good/total}</p>
    </>
  );
};

const App = () => {
  const [stats, setStats] = useState(INITIAL_STATS);

  function addFeedback(type) {
    if (type === "GOOD") {
      setStats({
        ...stats,
        good: stats.good + 1,
      });
    } else if (type === "NEUTRAL") {
      setStats({
        ...stats,
        neutral: stats.neutral + 1,
      });
    } else {
      setStats({
        ...stats,
        bad: stats.bad + 1,
      });
    }
  }

  return (
    <div>
      <h2>give us feedback!</h2>
      <button onClick={() => addFeedback("GOOD")}> good :) </button>
      <button onClick={() => addFeedback("NEUTRAL")}> neutral :| </button>
      <button onClick={() => addFeedback("BAD")}> bad :( </button>
      <br />
      <button onClick={() => setStats(INITIAL_STATS)}>reset</button>

      <Stats values={stats} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
