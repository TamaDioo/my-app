import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Home from "@/pages/index";

jest.mock("next/font/google", () => ({
  Inter: () => ({ className: "mocked-inter" }),
}));

describe("Home Page", () => {
  it("renders home page correctly", () => {
    render(<Home />);
    expect(
      screen.getByText("Praktikum Next.js Pages Router"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Mahasiswa D4 Pengembangan Web TI"),
    ).toBeInTheDocument();
  });
});
