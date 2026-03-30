import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const aboutLinks = [
    { name: "About Us", href: "about-us" },
    { name: "Blogs", href: "#" },
    { name: "Contact Us", href: "#" },
  ];

  const policyLinks = [
    { name: "Privacy Policy", href: "privacy-policy" },
    { name: "Terms and Conditions", href: "terms-condition" },
    { name: "Return and Refund Policy", href: "return-and-refund" },
  ];

  const socialLinks = [
    {
      name: "Facebook",
      href: "https://www.facebook.com/reputationmanage.org",
      color: "hover:bg-[#1877F2] hover:border-[#1877F2]",
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z" />
        </svg>
      ),
    },
    {
      name: "YouTube",
      href: "https://www.youtube.com/@Reputation-manage",
      color: "hover:bg-[#FF0000] hover:border-[#FF0000]",
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/reputation_manage/",
      color: "hover:bg-gradient-to-tr hover:from-[#f9ce34] hover:via-[#ee2a7b] hover:to-[#6228d7] hover:border-transparent",
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="bg-[#1a252f] text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="bg-white p-4 rounded-lg inline-block shadow-lg">
              <Image alt="Logo" width={150} height={40} src={"/logo.webp"} />
            </div>

            <p className="text-gray-400 leading-relaxed max-w-sm">
              Explore top quick tasks and your gateway to professional online presence management.
            </p>

            {/* IMPROVED SOCIAL ICONS */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative w-11 h-11 rounded-xl border border-gray-700 flex items-center justify-center transition-all duration-500 ease-out ${social.color} hover:-translate-y-1.5 hover:shadow-[0_10px_20px_rgba(0,0,0,0.3)]`}
                  aria-label={social.name}
                >
                  <span className="text-gray-400 group-hover:text-white transition-colors duration-300">
                    {social.icon}
                  </span>
                  
                  {/* Tooltip */}
                  <span className="absolute -top-10 scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100 font-medium">
                    {social.name}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Links Sections (Same as your code but cleaned up) */}
          {[
            { title: "About Company", links: aboutLinks },
            { title: "Policy Pages", links: policyLinks },
          ].map((section) => (
            <div key={section.title}>
              <h3 className="text-xl font-semibold text-white mb-6 relative inline-block group">
                {section.title}
                <span className="absolute -bottom-2 left-0 w-10 h-1 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
              </h3>
              <ul className="space-y-3 mt-8">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-blue-400 hover:translate-x-2 transition-all duration-300 inline-block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t-4 border-gray-800 py-6 text-center">
        <p className="text-xs text-gray-500 mb-2">
          © 2026 Reputation Manage. All rights reserved.
        </p>
        <Link
          className="text-xs text-blue-400/70 hover:text-blue-400 transition-colors"
          target="_blank"
          href="https://jobayerahmed.com"
        >
          Developed by Jobayer Ahmed
        </Link>
      </div>
    </footer>
  );
};

export default Footer;