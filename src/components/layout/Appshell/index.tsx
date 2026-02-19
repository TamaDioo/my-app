import Navbar from "../navbar";
import Footer from "../footer";

type AppshellProps = {
  children: React.ReactNode;
};

const Appshell = (props: AppshellProps) => {
  const { children } = props;
  return (
    <main>
      <Navbar />
      {children}
      <Footer />
    </main>
  );
};

export default Appshell;
