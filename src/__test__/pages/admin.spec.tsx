import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import HalamanAdmin from "@/pages/admin";

describe("Admin Page", () => {
  it("renders admin page correctly", () => {
    render(<HalamanAdmin />);
    expect(screen.getByText("Halaman Admin")).toBeInTheDocument();
  });
});
