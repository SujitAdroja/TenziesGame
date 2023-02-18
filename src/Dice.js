import "./Dice.css";

export default function Dice(props) {
  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "#ffff",
  };
  return (
    <div className="dice" style={styles} onClick={props.holdDice}>
      <h2 className="dice-no">{props.value}</h2>
    </div>
  );
}
