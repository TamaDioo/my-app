import { useRouter } from "next/router";
import Navbar from "../navbar";
import Footer from "../footer";

const disableNavbar = ["/auth/login", "/auth/register"];

type AppshellProps = {
  children: React.ReactNode;
};

const Appshell = (props: AppshellProps) => {
  const { children } = props;
  const { pathname } = useRouter();
  const router = useRouter();
  console.log(router);
  return (
    <main>
      {!disableNavbar.includes(pathname) && <Navbar />}
      {children}
      <Footer />
    </main>
  );
};

export default Appshell;
