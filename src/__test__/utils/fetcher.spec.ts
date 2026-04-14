import fetcher from "@/utils/swr/fetcher";

describe("fetcher utility", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("calls fetch and returns json payload", async () => {
    const payload = { data: [{ id: 1 }] };
    const json = jest.fn().mockResolvedValue(payload);
    const fetchMock = jest.fn().mockResolvedValue({ json });

    global.fetch = fetchMock as any;

    const result = await fetcher("/api/produk");

    expect(fetchMock).toHaveBeenCalledWith("/api/produk");
    expect(json).toHaveBeenCalledTimes(1);
    expect(result).toEqual(payload);
  });
});
