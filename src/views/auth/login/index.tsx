import Link from "next/link";
import style from "../../auth/login/login.module.scss";
import { useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

const TampilanLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { push, query } = useRouter();
  const callbackUrl: any = query.callbackUrl || "/";
  const [error, setError] = useState("");
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);
    // const form = event.currentTarget;
    // const formData = new FormData(event.currentTarget);
    // const email = formData.get("email") as string;
    // const fullname = formData.get("Fullname") as string;
    // const password = formData.get("password") as string;

    // // Validasi email wajib
    // if (!email || email.trim() === "") {
    //   setError("Email wajib diisi");
    //   setIsLoading(false);
    //   return;
    // }

    // // Validasi password minimal 6 karakter
    // if (!password || password.length < 6) {
    //   setError("Password minimal 6 karakter");
    //   setIsLoading(false);
    //   return;
    // }

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: event.target.email.value,
        password: event.target.password.value,
        callbackUrl,
      });

      if (!res?.error) {
        setIsLoading(false);
        push(callbackUrl);
      } else {
        setIsLoading(false);
        setError(res?.error || "Login failed");
      }
    } catch (error) {
      setIsLoading(false);
      setError("wrong email or password");
    }
  };

  return (
    <>
      <div className={style.login}>
        {error && <p className={style.login__error}>{error}</p>}
        <h1 className={style.login__title}>Halaman Login</h1>
        <div className={style.login__form}>
          <form onSubmit={handleSubmit}>
            <div className={style.login__form__item}>
              <label htmlFor="email" className={style.login__form__item__label}>
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                className={style.login__form__item__input}
              />
            </div>

            <div className={style.login__form__item}>
              <label
                htmlFor="password"
                className={style.login__form__item__label}
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                className={style.login__form__item__input}
              />
            </div>
            <button
              type="submit"
              className={style.login__form__item__button}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Login"}
            </button>
          </form>
          <br />
          <p className={style.login__form__item__text}>
            tidak punya {"'"} akun?{" "}
            <Link href="/auth/register">Ke Halaman Register</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default TampilanLogin;
