import "./App.ccs";

function VoteEnalce({ value }) {
  return (
    <div className="vote">
      <span className={value >= 1 ? "on" : "off"}>⭐</span>
    </div>
  );
}

export default VoteEnalce;
