import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import HalamanProfile from "@/pages/profile";
import { useSession } from "next-auth/react";

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));

describe("Profile Page", () => {
  it("renders profile page with user data", () => {
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { fullname: "John Doe", email: "john@example.com" } },
    });
    render(<HalamanProfile />);
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("john@example.com")).toBeInTheDocument();
  });

  it("renders profile page with default data if user is null", () => {
    (useSession as jest.Mock).mockReturnValue({ data: null });
    render(<HalamanProfile />);
    expect(screen.getByText("Pengguna")).toBeInTheDocument();
  });
});
