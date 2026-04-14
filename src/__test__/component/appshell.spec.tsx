import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Appshell from "@/components/layout/Appshell";
import { setMockRouter } from "../test-utils/router";

// Mock next/font
jest.mock("next/font/google", () => ({
  Roboto: () => ({ className: "mocked-roboto" }),
}));

// Mock next-auth
jest.mock("next-auth/react", () => ({
  useSession: jest.fn(() => ({ data: null, status: "unauthenticated" })),
  signIn: jest.fn(),
  signOut: jest.fn(),
}));

describe("Appshell Component", () => {
  it("renders children, navbar, and footer correctly on standard route", () => {
    setMockRouter({ pathname: "/" });
    render(
      <Appshell>
        <div data-testid="child-content">Konten Halaman</div>
      </Appshell>,
    );
    expect(screen.getByTestId("child-content")).toBeInTheDocument();
    expect(screen.getByText("Footer Component")).toBeInTheDocument();
  });

  it("hides navbar and footer on disabled routes (e.g., /auth/login)", () => {
    setMockRouter({ pathname: "/auth/login" });
    render(
      <Appshell>
        <div data-testid="child-content">Konten Login</div>
      </Appshell>,
    );
    expect(screen.getByTestId("child-content")).toBeInTheDocument();
    // Footer harusnya hilang
    expect(screen.queryByText("Footer Component")).not.toBeInTheDocument();
  });
});
