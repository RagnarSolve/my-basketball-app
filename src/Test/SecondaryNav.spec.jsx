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
