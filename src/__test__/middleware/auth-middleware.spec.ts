import withAuth from "@/middleware/withAuth";
import middleware, { config } from "@/middleware";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

jest.mock("next-auth/jwt", () => ({
  getToken: jest.fn(),
}));

jest.mock("next/server", () => ({
  NextResponse: {
    next: jest.fn(() => ({ type: "next" })),
    redirect: jest.fn((url: URL) => ({
      type: "redirect",
      destination: url.toString(),
    })),
  },
}));

const mockedGetToken = getToken as jest.Mock;
const mockedNext = NextResponse.next as jest.Mock;
const mockedRedirect = NextResponse.redirect as jest.Mock;

const createRequest = (
  pathname: string,
  url = `http://localhost${pathname}`,
) => {
  return {
    nextUrl: { pathname },
    url,
  } as any;
};

describe("Auth middleware", () => {
  beforeEach(() => {
    mockedGetToken.mockReset();
    mockedNext.mockClear();
    mockedRedirect.mockClear();
  });

  it("redirects to login when token is missing", async () => {
    mockedGetToken.mockResolvedValue(null);
    const middlewareFn = jest.fn(() => ({ type: "middleware" }));

    const wrapped = withAuth(middlewareFn as any, ["/profile"]);
    const result = await wrapped(createRequest("/profile"), {} as any);

    expect(result.type).toBe("redirect");
    expect(result.destination).toContain("/auth/login");
    expect(result.destination).toContain(
      "callbackUrl=http%3A%2F%2Flocalhost%2Fprofile",
    );
    expect(middlewareFn).not.toHaveBeenCalled();
  });

  it("blocks non-admin on admin page", async () => {
    mockedGetToken.mockResolvedValue({ role: "member" });
    const middlewareFn = jest.fn(() => ({ type: "middleware" }));

    const wrapped = withAuth(middlewareFn as any, ["/admin"]);
    const result = await wrapped(createRequest("/admin"), {} as any);

    expect(result.type).toBe("redirect");
    expect(result.destination).toBe("http://localhost/");
    expect(middlewareFn).not.toHaveBeenCalled();
  });

  it("blocks non-editor on editor page", async () => {
    mockedGetToken.mockResolvedValue({ role: "admin" });
    const middlewareFn = jest.fn(() => ({ type: "middleware" }));

    const wrapped = withAuth(middlewareFn as any, ["/editor"]);
    const result = await wrapped(createRequest("/editor"), {} as any);

    expect(result.type).toBe("redirect");
    expect(result.destination).toBe("http://localhost/");
    expect(middlewareFn).not.toHaveBeenCalled();
  });

  it("allows protected route when role is correct", async () => {
    mockedGetToken.mockResolvedValue({ role: "editor" });
    const middlewareFn = jest.fn(() => ({ type: "middleware" }));

    const wrapped = withAuth(middlewareFn as any, ["/editor"]);
    const result = await wrapped(createRequest("/editor"), {} as any);

    expect(result).toEqual({ type: "middleware" });
    expect(middlewareFn).toHaveBeenCalledTimes(1);
  });

  it("passes through unprotected route", async () => {
    const middlewareFn = jest.fn(() => ({ type: "middleware" }));

    const wrapped = withAuth(middlewareFn as any, ["/profile"]);
    const result = await wrapped(createRequest("/public"), {} as any);

    expect(result).toEqual({ type: "middleware" });
    expect(mockedGetToken).not.toHaveBeenCalled();
  });

  it("exports middleware config and executes base middleware", async () => {
    mockedGetToken.mockResolvedValue({ role: "admin" });

    const result = await middleware(createRequest("/admin"), {} as any);

    expect(result).toEqual({ type: "next" });
    expect(mockedNext).toHaveBeenCalledTimes(1);
    expect(config.matcher).toEqual([
      "/produk",
      "/about",
      "/profile",
      "/admin",
      "/editor",
    ]);
  });
});
