import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Footer from "@/components/layout/footer";

describe("Footer Component", () => {
  it("renders footer correctly", () => {
    const { container } = render(<Footer />);
    expect(screen.getByText("Footer Component")).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
