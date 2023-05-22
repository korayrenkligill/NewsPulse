import React from "react";

function PowersItem({ power, powers, setPowers }) {
  const choosePowers = () => {
    if (powers.some((e) => e === power)) {
      let newList = powers.filter((e) => e !== power);
      setPowers(newList);
    } else {
      setPowers((oldArray) => [...oldArray, power]);
    }
  };

  return (
    <button
      type="button"
      className={powers.some((e) => e === power) ? "selected-power" : "power"}
      onClick={choosePowers}
    >
      {power}
    </button>
  );
}

export default PowersItem;
