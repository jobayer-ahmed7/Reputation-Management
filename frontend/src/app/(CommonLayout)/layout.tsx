import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import TawkMessenger from "@/components/tawk/TawkMessenger";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />

      {children}
      {/*floating tawk messenger */}
      <TawkMessenger />
      <Footer />
    </div>
  );
};

export default CommonLayout;