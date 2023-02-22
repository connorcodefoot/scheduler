import React from "react";
import DayListItem from "./DayListItem";


export default function DayList(props) {

const dayListItems = props.days.map((days) => {

  return <DayListItem key={days.id} name={days.name} spots={days.spots} selected={days.name === days.day} setDay={days.setDay} />;
  })

  return <ul>{dayListItems}</ul>
}
