import * as firestore from "firebase/firestore";
import bcrypt from "bcrypt";
import {
  retrieveProducts,
  retrieveDataById,
  signIn,
  signUp,
  loginWithProvider,
} from "@/utils/db/servicefirebase";

jest.mock("firebase/firestore", () => ({
  getFirestore: jest.fn(() => ({ db: true })),
  collection: jest.fn((db, collectionName: string) => ({ db, collectionName })),
  getDocs: jest.fn(),
  getDoc: jest.fn(),
  doc: jest.fn((db, collectionName: string, id: string) => ({
    db,
    collectionName,
    id,
  })),
  query: jest.fn((...args: unknown[]) => ({ args })),
  where: jest.fn((...args: unknown[]) => ({ args })),
  addDoc: jest.fn(),
  updateDoc: jest.fn(),
}));

jest.mock("../../utils/db/firebase", () => ({
  __esModule: true,
  default: { app: true },
}));

jest.mock("bcrypt", () => ({
  __esModule: true,
  default: {
    hash: jest.fn(),
  },
}));

const mockedFirestore = firestore as jest.Mocked<typeof firestore>;
const bcryptHash = bcrypt.hash as jest.Mock;

describe("servicefirebase utility", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("retrieves product collection data", async () => {
    mockedFirestore.getDocs.mockResolvedValue({
      docs: [
        { id: "1", data: () => ({ name: "Produk 1" }) },
        { id: "2", data: () => ({ name: "Produk 2" }) },
      ],
    } as never);

    const result = await retrieveProducts("products");

    expect(mockedFirestore.collection).toHaveBeenCalledWith(
      { db: true },
      "products",
    );
    expect(result).toEqual([
      { id: "1", name: "Produk 1" },
      { id: "2", name: "Produk 2" },
    ]);
  });

  it("retrieves a document by id", async () => {
    mockedFirestore.getDoc.mockResolvedValue({
      data: () => ({ id: "abc", name: "Produk" }),
    } as never);

    const result = await retrieveDataById("products", "abc");

    expect(mockedFirestore.doc).toHaveBeenCalledWith(
      { db: true },
      "products",
      "abc",
    );
    expect(result).toEqual({ id: "abc", name: "Produk" });
  });

  it("signIn returns first user match", async () => {
    mockedFirestore.getDocs.mockResolvedValue({
      docs: [
        { id: "u1", data: () => ({ email: "a@mail.com", role: "member" }) },
      ],
    } as never);

    const result = await signIn("a@mail.com");

    expect(mockedFirestore.where).toHaveBeenCalledWith(
      "email",
      "==",
      "a@mail.com",
    );
    expect(result).toEqual({ id: "u1", email: "a@mail.com", role: "member" });
  });

  it("signIn returns undefined when no user found", async () => {
    mockedFirestore.getDocs.mockResolvedValue({ docs: [] } as never);

    const result = await signIn("none@mail.com");

    expect(result).toBeUndefined();
  });

  it("signUp returns error callback when email exists", async () => {
    mockedFirestore.getDocs.mockResolvedValue({
      docs: [{ id: "u1", data: () => ({ email: "exists@mail.com" }) }],
    } as never);
    const callback = jest.fn();

    await signUp(
      {
        email: "exists@mail.com",
        fullname: "User Exists",
        password: "password",
      },
      callback,
    );

    expect(callback).toHaveBeenCalledWith({
      status: "error",
      message: "Email already exists",
    });
    expect(mockedFirestore.addDoc).not.toHaveBeenCalled();
  });

  it("signUp hashes password, stores user, and returns success callback", async () => {
    mockedFirestore.getDocs.mockResolvedValue({ docs: [] } as never);
    bcryptHash.mockResolvedValue("hashed-password");
    mockedFirestore.addDoc.mockResolvedValue({ id: "new-user" } as never);
    const callback = jest.fn();

    const userData = {
      email: "new@mail.com",
      fullname: "New User",
      password: "password",
    };

    await signUp(userData, callback);

    expect(bcryptHash).toHaveBeenCalledWith("password", 10);
    expect(mockedFirestore.addDoc).toHaveBeenCalledWith(
      expect.objectContaining({ collectionName: "users" }),
      {
        email: "new@mail.com",
        fullname: "New User",
        password: "hashed-password",
        role: "member",
      },
    );
    expect(callback).toHaveBeenCalledWith({
      status: "success",
      message: "User registered successfully",
    });
  });

  it("signUp returns error callback when addDoc fails", async () => {
    mockedFirestore.getDocs.mockResolvedValue({ docs: [] } as never);
    bcryptHash.mockResolvedValue("hashed-password");
    mockedFirestore.addDoc.mockRejectedValue(new Error("db error"));
    const callback = jest.fn();

    await signUp(
      {
        email: "fail@mail.com",
        fullname: "Fail User",
        password: "password",
      },
      callback,
    );

    expect(callback).toHaveBeenCalledWith({
      status: "error",
      message: "db error",
    });
  });

  it("loginWithProvider updates existing user and calls callback", async () => {
    mockedFirestore.getDocs.mockResolvedValue({
      docs: [{ id: "u2", data: () => ({ role: "admin" }) }],
    } as never);
    mockedFirestore.updateDoc.mockResolvedValue({} as never);
    const callback = jest.fn();

    const userData = { email: "admin@mail.com", type: "google" };
    await loginWithProvider(userData, callback);

    expect(mockedFirestore.updateDoc).toHaveBeenCalledWith(
      expect.objectContaining({ collectionName: "users", id: "u2" }),
      { email: "admin@mail.com", type: "google", role: "admin" },
    );
    expect(callback).toHaveBeenCalledWith({
      status: true,
      message: "User registered and logged in with google",
      data: { email: "admin@mail.com", type: "google", role: "admin" },
    });
  });

  it("loginWithProvider inserts new user with default role", async () => {
    mockedFirestore.getDocs.mockResolvedValue({ docs: [] } as never);
    mockedFirestore.addDoc.mockResolvedValue({ id: "u3" } as never);
    const callback = jest.fn();

    const userData = { email: "new-provider@mail.com" };
    await loginWithProvider(userData, callback);

    expect(mockedFirestore.addDoc).toHaveBeenCalledWith(
      expect.objectContaining({ collectionName: "users" }),
      { email: "new-provider@mail.com", role: "member" },
    );
    expect(callback).toHaveBeenCalledWith({
      status: true,
      message: "User registered and logged in with Provider",
      data: { email: "new-provider@mail.com", role: "member" },
    });
  });

  it("loginWithProvider handles unexpected errors", async () => {
    mockedFirestore.getDocs.mockRejectedValue(new Error("query failed"));
    const callback = jest.fn();

    await loginWithProvider(
      { email: "oops@mail.com", type: "github" },
      callback,
    );

    expect(callback).toHaveBeenCalledWith({
      status: false,
      message: "query failed",
    });
  });
});
