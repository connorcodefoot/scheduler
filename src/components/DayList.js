import React from "react";
import DayListItem from "./DayListItem";


export default function DayList(props) {

  const dayListItems = props.days.map((days) => {

    return <DayListItem
      key={days.id}
      name={days.name}
      spots={days.spots}
      onChange={props.onChange}
      value={props.value}
      selected={props.value === days.name}
      />;
  });

  return <ul>{dayListItems}</ul>;
}
