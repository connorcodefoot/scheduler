import React from "react";

import { render, cleanup } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("index", () => {

  it("renders without crashing", () => {
    render(<Application />);
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {


    





  })



  it("loads data, edits an interview and keeps the spots remaining for Monday the same")

  it("shows the save error when failing to save an appointment")

  it("shows the delete error when failing to delete an existing appointment")





})



