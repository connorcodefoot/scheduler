import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";


// Represents each day found within the sidebar on the front end
export default function DayListItem(props) {


  const formatSpots = (props) => {
    if (props.spots === 0) {
      return "no spots remaining";
    } else if (props.spots === 1) {
      return "1 spot remaining";
    } else {
      return `${props.spots} spots remaining`;
    }
  };

  // Add class based on selection and spots available. This function will change the colour of the dayListItem selected or show the spots remaining depending on the logic
  const dayClass = classNames("day-list__item", {
    " day-list__item--selected": (props.selected),
    " day-list__item--full": props.spots === 0
  });

  const selectedDay = function () {
    return props.onChange(props.name);
  };

  return (
    <li
      onClick={selectedDay}
      className={dayClass}
      selected={props.selected}
      data-testid="day">
      <h2 className="text--regular ">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props)}</h3>
    </li>
  );
}

