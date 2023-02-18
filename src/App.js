import "./App.css";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Dice from "./Dice";
import Confetti from "react-confetti";
function App() {
  const [dice, setDice] = useState(allNewArray());
  const [tenzies, setTenzies] = useState(false);
  function allNewArray() {
    const newArray = [];
    for (let i = 0; i < 10; i++) {
      newArray.push({
        randomNo: Math.trunc(Math.random() * 6) + 1,
        isHeld: false,
        id: nanoid(),
      });
    }
    return newArray;
  }
  useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstItem = dice[0].randomNo;
    const allSame = dice.every((die) => firstItem === die.randomNo);
    if (allHeld && allSame) setTenzies(true);
  }, [dice]);

  function rollDice() {
    if (!tenzies) {
      setDice(
        dice.map((die) =>
          die.isHeld
            ? die
            : {
                randomNo: Math.trunc(Math.random() * 6) + 1,
                isHeld: false,
                id: nanoid(),
              }
        )
      );
    } else {
      setDice(allNewArray());
      setTenzies(false);
    }
  }

  function holdDice(id) {
    setDice(
      dice.map((die) => (die.id === id ? { ...die, isHeld: !die.isHeld } : die))
    );
  }

  const diceElement = dice.map((die) => (
    <Dice
      value={die.randomNo}
      isHeld={die.isHeld}
      key={die.id}
      id={die.id}
      holdDice={() => holdDice(die.id)}
    />
  ));

  return (
    <div className="container">
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">{diceElement}</div>
      <button className="btn-roll" onClick={rollDice}>
        {tenzies ? "New Game" : "Roll"}
      </button>
    </div>
  );
}

export default App;
