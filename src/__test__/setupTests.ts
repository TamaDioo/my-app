import "@testing-library/jest-dom";
import { mockUseRouter, resetMockRouter } from "./test-utils/router";

jest.mock("next/router", () => ({
  useRouter: () => mockUseRouter(),
}));

beforeEach(() => {
  resetMockRouter();
});
