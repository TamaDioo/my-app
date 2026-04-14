describe("firebase config", () => {
  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("initializes firebase app with env configuration", async () => {
    process.env.FIREBASE_API_KEY = "api-key";
    process.env.FIREBASE_AUTH_DOMAIN = "auth-domain";
    process.env.FIREBASE_PROJECT_ID = "project-id";
    process.env.FIREBASE_STORAGE_BUCKET = "storage-bucket";
    process.env.FIREBASE_MESSAGING_SENDER_ID = "sender-id";
    process.env.FIREBASE_APP_ID = "app-id";

    const initializeApp = jest.fn(() => ({ name: "mock-app" }));

    jest.doMock("firebase/app", () => ({
      initializeApp,
    }));

    const module = await import("@/utils/db/firebase");

    expect(initializeApp).toHaveBeenCalledTimes(1);
    expect(initializeApp).toHaveBeenCalledWith({
      apiKey: "api-key",
      authDomain: "auth-domain",
      projectId: "project-id",
      storageBucket: "storage-bucket",
      messagingSenderId: "sender-id",
      appId: "app-id",
    });
    expect(module.default).toEqual({ name: "mock-app" });
  });
});
