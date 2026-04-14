import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "@/components/layout/navbar";
import { useSession, signIn, signOut } from "next-auth/react";

// Mocking library next-auth/react
jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
  signIn: jest.fn(),
  signOut: jest.fn(),
}));

describe("Navbar Component", () => {
  // Skenario 1: User Belum Login
  it("renders correctly when user is NOT logged in", () => {
    // Memanipulasi useSession agar mengembalikan nilai null (belum login)
    (useSession as jest.Mock).mockReturnValue({
      data: null,
      status: "unauthenticated",
    });
    const view = render(<Navbar />);
    // Memastikan tombol "Sign In" muncul di layar
    expect(screen.getByText("Sign In")).toBeInTheDocument();
    // Snapshot test untuk state unauthenticated
    expect(view).toMatchSnapshot();
  });

  // Skenario 2: User Sudah Login
  it("renders correctly when user IS logged in", () => {
    // Memanipulasi useSession agar mengembalikan data dummy user
    (useSession as jest.Mock).mockReturnValue({
      data: {
        user: {
          fullname: "Tama Dio",
          email: "tamadio@mail.com",
          image: "/test-avatar.png",
        },
      },
      status: "authenticated",
    });
    render(<Navbar />);
    // Memastikan teks sapaan dengan nama user muncul
    expect(screen.getByText(/Welcome, Tama Dio/i)).toBeInTheDocument();
    // Memastikan tombol "Sign Out" muncul menggantikan "Sign In"
    expect(screen.getByText("Sign Out")).toBeInTheDocument();
  });
});
