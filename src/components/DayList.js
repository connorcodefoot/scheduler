import React from "react";
import DayListItem from "./DayListItem";


// Represents the list of of days within the siderbar on the front end
export default function DayList(props) {

  const dayListItems = props.days.map((days) => {

    return <DayListItem
      key={days.id}
      name={days.name}
      spots={days.spots}
      onChange={props.onChange}
      selected={props.day === days.name}
      />;
  });

  return <ul data-testid="day">{dayListItems}</ul>;
}
