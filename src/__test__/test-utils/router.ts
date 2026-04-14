const createMockRouter = () => ({
  route: "/",
  pathname: "/",
  query: {},
  asPath: "/",
  basePath: "",
  push: jest.fn(),
  replace: jest.fn(),
  reload: jest.fn(),
  back: jest.fn(),
  prefetch: jest.fn().mockResolvedValue(undefined),
  beforePopState: jest.fn(),
  events: {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
  },
  isFallback: false,
  isReady: true,
  isLocaleDomain: false,
  isPreview: false,
});

export const mockUseRouter = jest.fn(() => createMockRouter());

export const setMockRouter = (overrides: Record<string, unknown> = {}) => {
  mockUseRouter.mockReturnValue({
    ...createMockRouter(),
    ...overrides,
  });
};

export const resetMockRouter = () => {
  mockUseRouter.mockReset();
  mockUseRouter.mockReturnValue(createMockRouter());
};
