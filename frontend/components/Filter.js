import React, { useRef, useState } from "react";

const Filter = ({ categories, setCategoryName }) => {
  const categoryRef = useRef({});
  const [currentFilter, setCurrentFilter] = useState(0);

  const toggleFilterButton = (i) => {
    setCurrentFilter(i);
    setCategoryName(categoryRef.current[i]);
    {
      categories.map(({ name }, l) =>
        l === i
          ? (categoryRef.current[i].style.textDecoration = "underline")
          : (categoryRef.current[l].style.textDecoration = "none")
      );
    }
    categoryRef.current[i].style.textDecoration = "underline";
  };

  const filterMouseOver = (i) => {
    categoryRef.current[i].style.textDecoration = "underline";
  };

  const filterMouseLeave = (i) => {
    categoryRef.current[i].style.textDecoration = "none";
    categoryRef.current[currentFilter].style.textDecoration = "underline";
  };

  return (
    <div className="p-md mb-lg flex bg-primary w-full border border-secondary">
      <div className="flex flex-wrap">
        {categories &&
          categories.map(({ _id, name }, i) => (
            <div
              key={_id}
              className="group/item flex font-sans text-sm text-secondary"
            >
              <div
                className="group-first/item:underline cursor-pointer"
                ref={(element) => (categoryRef.current[i] = element)}
                onClick={() => {
                  toggleFilterButton(i);
                }}
                onMouseEnter={() => {
                  filterMouseOver(i);
                }}
                onMouseLeave={() => {
                  filterMouseLeave(i);
                }}
              >
                {name}
              </div>
              <div className="group-last/item:hidden">,&nbsp;</div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Filter;
