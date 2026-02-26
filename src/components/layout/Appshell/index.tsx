import { useRouter } from "next/router";
import Navbar from "../navbar";
import Footer from "../footer";

const disableNavbar = ["/auth/login", "/auth/register", "/404"];
const disableFooter = ["/auth/login", "/auth/register", "/404"];

type AppshellProps = {
  children: React.ReactNode;
};

const Appshell = (props: AppshellProps) => {
  const { children } = props;
  const { pathname } = useRouter();

  return (
    <main>
      {!disableNavbar.includes(pathname) && <Navbar />}
      {children}
      {!disableFooter.includes(pathname) && <Footer />}
    </main>
  );
};

export default Appshell;
