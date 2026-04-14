import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { setMockRouter } from "../test-utils/router";

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img alt={props.alt} src={props.src} />;
  },
}));

jest.mock("next/dynamic", () => ({
  __esModule: true,
  default: () => {
    return function MockDetailProduk(props: { products?: { name?: string } }) {
      return <div data-testid="detail-produk">{props.products?.name}</div>;
    };
  },
}));

jest.mock("../../views/auth/login", () => ({
  __esModule: true,
  default: () => <div>Mock Login View</div>,
}));

jest.mock("../../views/auth/register", () => ({
  __esModule: true,
  default: () => <div>Mock Register View</div>,
}));

jest.mock("../../views/product", () => ({
  __esModule: true,
  default: ({ products }: { products?: Array<unknown> }) => (
    <div data-testid="product-view">{products?.length ?? 0}</div>
  ),
}));

import HalamanLogin from "@/pages/auth/login";
import HalamanRegister from "@/pages/auth/register";
import BlogIndexPage from "@/pages/blog";
import BlogSlugPage from "@/pages/blog/[slug]";
import HalamanEditor from "@/pages/editor";
import ProfileEditPage from "@/pages/profile/edit";
import AppSettingPage from "@/pages/setting/app";
import UserSettingPage from "@/pages/user";
import UserPasswordPage from "@/pages/user/password";
import HalamanToko from "@/pages/shop/[[...slug]]";
import HalamanProduk, {
  getStaticPaths,
  getStaticProps as getProductStaticProps,
} from "@/pages/produk/[produk]";
import HalamanProdukServer, { getServerSideProps } from "@/pages/produk/server";
import HalamanProdukStatic, {
  getStaticProps as getServerStaticProps,
} from "@/pages/produk/static";

afterEach(() => {
  jest.clearAllMocks();
});

describe("Additional pages", () => {
  it("renders auth pages", () => {
    render(<HalamanLogin />);
    expect(screen.getByText("Mock Login View")).toBeInTheDocument();

    render(<HalamanRegister />);
    expect(screen.getByText("Mock Register View")).toBeInTheDocument();
  });

  it("renders misc simple pages", () => {
    render(<BlogIndexPage />);
    expect(screen.getByText("Slug Page")).toBeInTheDocument();

    render(<HalamanEditor />);
    expect(screen.getByText("Halaman Editor")).toBeInTheDocument();

    render(<ProfileEditPage />);
    expect(screen.getByText("Profile Edit Page")).toBeInTheDocument();

    render(<AppSettingPage />);
    expect(screen.getByText("App Setting Page")).toBeInTheDocument();

    render(<UserSettingPage />);
    expect(screen.getByText("User Setting Page")).toBeInTheDocument();

    render(<UserPasswordPage />);
    expect(screen.getByText("Password User Page")).toBeInTheDocument();
  });

  it("renders dynamic blog and shop pages", () => {
    setMockRouter({ query: { slug: ["sepatu", "pria"] } });

    render(<BlogSlugPage />);
    expect(screen.getByText("Halaman Slug")).toBeInTheDocument();
    expect(screen.getByText(/Slug:/)).toBeInTheDocument();
    expect(screen.getByText(/sepatu/)).toBeInTheDocument();
    expect(screen.getByText(/pria/)).toBeInTheDocument();

    render(<HalamanToko />);
    expect(screen.getByText("Toko: sepatu-pria")).toBeInTheDocument();
    expect(screen.getByText("Kategori: sepatu")).toBeInTheDocument();
  });

  it("renders shop page fallback category when slug is missing", () => {
    setMockRouter({ query: {} });

    render(<HalamanToko />);
    expect(screen.getByText("Toko:")).toBeInTheDocument();
    expect(screen.getByText("Kategori: Semua Kategori")).toBeInTheDocument();
  });

  it("renders product pages and executes data fetching functions", async () => {
    const product = {
      id: "1",
      name: "Sepatu",
      category: "Sport",
      image: "/shoe.jpg",
      price: 100000,
    };

    render(<HalamanProduk product={product as any} />);
    expect(screen.getByTestId("detail-produk")).toHaveTextContent("Sepatu");

    render(<HalamanProdukServer products={[product] as any} />);
    expect(screen.getAllByTestId("product-view")[0]).toHaveTextContent("1");

    render(<HalamanProdukStatic products={[product] as any} />);
    expect(screen.getAllByTestId("product-view")[1]).toHaveTextContent("1");

    (global as any).fetch = jest
      .fn()
      .mockResolvedValueOnce({
        json: jest
          .fn()
          .mockResolvedValue({ data: [{ id: "p1" }, { id: "p2" }] }),
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue({ data: [product] }),
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue({ data: [product] }),
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue({ data: [product] }),
      });

    const pathsResult = await getStaticPaths();
    expect(pathsResult).toEqual({
      paths: [{ params: { produk: "p1" } }, { params: { produk: "p2" } }],
      fallback: false,
    });

    const productStaticProps = await getProductStaticProps({
      params: { produk: "1" },
    });
    expect(productStaticProps).toEqual({
      props: {
        product: [product],
      },
    });

    const serverProps = await getServerSideProps();
    expect(serverProps).toEqual({
      props: {
        products: [product],
      },
    });

    const staticProps = await getServerStaticProps();
    expect(staticProps).toEqual({
      props: {
        products: [product],
      },
      revalidate: 10,
    });
  });
});
