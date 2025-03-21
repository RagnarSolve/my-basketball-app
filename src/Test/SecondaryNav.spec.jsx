import React from "react";
import { screen } from "@testing-library/react"; 
import { describe, it, expect, vi, beforeEach } from "vitest"; 
import SecondaryNav from "../components/SecondaryNav"; 
import { render } from "@testing-library/react"; 

// Mock the setPage function
const mockSetPage = vi.fn();

describe("SecondaryNav Component", () => {
  beforeEach(() => {

    render(<SecondaryNav setPage={mockSetPage} />);
  });

  it("renders all navigation links correctly", () => {
    // Check if all navigation links are rendered
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Players")).toBeInTheDocument();
    expect(screen.getByText("Table")).toBeInTheDocument();
    expect(screen.getByText("Games")).toBeInTheDocument();
    expect(screen.getByText("News")).toBeInTheDocument();
    expect(screen.getByText("Transactions")).toBeInTheDocument();
  });

 
});
// import React from "react";
// // import { screen, fireEvent } from "@testing-library/react";
// import { screen } from "@testing-library/react"; // Import screen
// import { describe, it, expect, vi, beforeEach } from "vitest"; // Use Vitest's globals
// import SecondaryNav from "../components/SecondaryNav"; // Update the path as needed
// import { render } from "vitest-browser-react";

// // Mock the setPage function
// const mockSetPage = vi.fn();

// describe("SecondaryNav Component", () => {
//   beforeEach(() => {
//     // Render the component before each test
//     render(<SecondaryNav setPage={mockSetPage} />);
//   });

//   it("renders all navigation links correctly", () => {
//     // Check if all navigation links are rendered
//     expect(screen.getByText("Home")).toBeInTheDocument();
//     expect(screen.getByText("Players")).toBeInTheDocument();
//     expect(screen.getByText("Table")).toBeInTheDocument();
//     expect(screen.getByText("Games")).toBeInTheDocument();
//     expect(screen.getByText("News")).toBeInTheDocument();
//     expect(screen.getByText("Transactions")).toBeInTheDocument();
//   });

  // it("calls setPage with the correct page name when a link is clicked", () => {
  //   fireEvent.click(screen.getByText("Home"));
  //   expect(mockSetPage).toHaveBeenCalledWith("home");

  //   fireEvent.click(screen.getByText("Players"));
  //   expect(mockSetPage).toHaveBeenCalledWith("players");

  //   fireEvent.click(screen.getByText("Table"));
  //   expect(mockSetPage).toHaveBeenCalledWith("standings");

  //   fireEvent.click(screen.getByText("Games"));
  //   expect(mockSetPage).toHaveBeenCalledWith("games");

  //   fireEvent.click(screen.getByText("News"));
  //   expect(mockSetPage).toHaveBeenCalledWith("news");

  //   fireEvent.click(screen.getByText("Transactions"));
  //   expect(mockSetPage).toHaveBeenCalledWith("transactions");
  // });

  // it("prevents default navigation behavior when a link is clicked", () => {
  //   // Mock the preventDefault function
  //   const preventDefault = vi.fn();

  //   // Simulate clicking the "Home" link
  //   fireEvent.click(screen.getByText("Home"), { preventDefault });
  //   expect(preventDefault).toHaveBeenCalled();
  // });
//});