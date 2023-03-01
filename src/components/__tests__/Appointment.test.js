import React from "react";

import { render, cleanup, waitForElement, fireEvent, getByText, prettyDOM, getAllByTestId, getByPlaceholderText, getByAltText, queryByText } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("index", () => {

  it("renders without crashing", () => {
    render(<Application />);
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {

  // 1. Render the Application.
  const { container } = render(<Application />);

  // 2. Wait until the text "Archie Cohen" is displayed.
  await waitForElement(() => getByText(container, "Archie Cohen"));

  // 3. Click the "Delete" button on the booked appointment.
  const appointments = getAllByTestId(container, "appointment");
  const appointment = appointments[1];
  fireEvent.click(getByAltText(appointment, "Delete"));
    
  // 4. Check that the confirmation message is shown.
  await waitForElement(() => getByText(appointment, "Confirm"));
  
  // 5. Click the "Confirm" button on the confirmation.
  fireEvent.click(getByText(appointment, "Confirm"))

  // 6. Check that the element with the text "Deleting" is displayed.
  expect(getByText(appointment, "Deleting")).toBeInTheDocument()

  
  // 7. Wait until the element with the "Add" button is displayed.
  await waitForElement(() => getByAltText(appointment, "Add"));

  // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
  const day = getAllByTestId(container, "day").find(day =>
    queryByText(day, "Monday"))

  expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
  });





  // it("loads data, edits an interview and keeps the spots remaining for Monday the same")

  // it("shows the save error when failing to save an appointment")

  // it("shows the delete error when failing to delete an existing appointment")





})



