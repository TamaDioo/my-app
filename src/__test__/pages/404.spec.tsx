import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Custom404 from "@/pages/404";

// Mock font poppins agar test tidak error
jest.mock("next/font/google", () => ({
  Poppins: () => ({ className: "mocked-poppins" }),
}));

describe("404 Page", () => {
  it("renders 404 page correctly", () => {
    render(<Custom404 />);
    expect(screen.getByText("Oops! 404")).toBeInTheDocument();
    expect(screen.getByText("Kembali ke Home")).toBeInTheDocument();
  });
});
