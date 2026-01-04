import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import { Phone } from "lucide-react";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />

      {children}
            {/*floating WhatsApp Contact */}
          <div className="fixed bottom-5 right-5">
       
            <a
              href="https://wa.me/8801722291667"
              className="flex items-center gap-2 text-gray-700 hover:text-[#25D366] transition-colors"
            >
              <div className="w-10 h-10 bg-[#25D366] rounded-full flex items-center justify-center">
                <Phone className="w-5 h-5 text-white" />
              </div>
            </a>
          </div>
      <Footer />
    </div>
  );
};

export default CommonLayout;
