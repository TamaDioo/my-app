import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import TampilanProduk from "@/pages/produk";
import { setMockRouter } from "../test-utils/router";

// Mocking library swr
jest.mock("swr", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    data: { data: [] },
    error: undefined,
    isLoading: false,
  })),
}));

// Mocking library next/dynamic
jest.mock("next/dynamic", () => ({
  __esModule: true,
  default: jest.fn(() => {
    return function MockComponent() {
      return <div data-testid="tampilan-produk">Tampilan Produk</div>;
    };
  }),
}));

describe("Product Page", () => {
  beforeEach(() => {
    setMockRouter({ route: "/produk", pathname: "/produk" });
  });

  // Verifikasi component ter-render dan element dengan testid ditemukan
  it("should render product page", () => {
    render(<TampilanProduk />);
    expect(screen.getByTestId("tampilan-produk")).toBeInTheDocument();
  });

  // Verifikasi container ada (basic rendering check)
  it("should display TampilanProduk component with empty products", () => {
    const { container } = render(<TampilanProduk />);
    expect(container).toBeInTheDocument();
  });

  it("renders product page correctly", () => {
    const page = render(<TampilanProduk />);
    // expect(screen.getByTestId("title").textContent).toBe("Product Page");
    expect(page).toMatchSnapshot();
  });
});
