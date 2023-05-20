import React, { useState } from "react";

function AddNewsCategory({
  category,
  id,
  selectedCategories,
  setSelectedCategories,
}) {
  const [selected, setSelected] = useState(false);

  const selectOrUnselect = (select) => {
    if (select) {
      setSelected(select);
      setSelectedCategories((oldArray) => [...oldArray, category]);
    } else {
      setSelected(select);
      var array = selectedCategories.filter((e) => e !== category);
      setSelectedCategories(array);
    }
  };
  return (
    <label
      htmlFor={`${category}_${id}`}
      className={selected ? "category category-selected" : "category"}
    >
      {category}
      <input
        type="checkbox"
        id={`${category}_${id}`}
        checked={selected}
        onChange={() => {
          selectOrUnselect(!selected);
        }}
      />
    </label>
  );
}

export default AddNewsCategory;
