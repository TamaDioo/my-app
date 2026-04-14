import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import App from "@/pages/_app";
import Document from "@/pages/_document";

jest.mock("next/script", () => ({
  __esModule: true,
  default: (props: { id?: string; children?: React.ReactNode }) => (
    <script data-testid={props.id || "external-script"}>
      {props.children}
    </script>
  ),
}));

jest.mock("next-auth/react", () => ({
  SessionProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="session-provider">{children}</div>
  ),
}));

jest.mock("../../components/layout/Appshell", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="appshell">{children}</div>
  ),
}));

describe("App and Document pages", () => {
  it("renders _app wrapper with providers and scripts", () => {
    const Page = (props: { title?: string }) => <h1>{props.title}</h1>;

    render(
      <App
        Component={Page as any}
        pageProps={{ title: "Test Page", session: null } as any}
        router={{} as any}
      />,
    );

    expect(screen.getByTestId("external-script")).toBeInTheDocument();
    expect(screen.getByTestId("google-analytics")).toBeInTheDocument();
    expect(screen.getByTestId("session-provider")).toBeInTheDocument();
    expect(screen.getByTestId("appshell")).toBeInTheDocument();
    expect(screen.getByText("Test Page")).toBeInTheDocument();
  });

  it("executes _document function", () => {
    const tree = Document();
    expect(tree).toBeTruthy();
  });
});
