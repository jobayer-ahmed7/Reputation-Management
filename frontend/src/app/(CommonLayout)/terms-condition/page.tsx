
const sections = [
  {
    id: 1,
    title: "Acceptance of Terms and Conditions",
    content:
      "By using our reputation management services, you agree to comply with and be legally bound by these Terms and Conditions. If you do not agree to these Terms and Conditions, you may not access or use the services.",
  },
  {
    id: 2,
    title: "Services Provided",
    content:
      "Reputation Manage provides online reputation management services, which may include, but are not limited to, review monitoring, review generation tools, social media reputation tracking, and related consulting. We will make commercially reasonable efforts to provide the services as described. Our role is to provide you with the tools and expertise to manage your online presence effectively.",
  },
  {
    id: 3,
    title: "User Obligations",
    bullets: [
      { label: "Provide Accurate Information", text: "Ensure that all information you provide to us (including business details and billing information) is accurate, current, and complete." },
      { label: "Lawful Use", text: "Use our services only for lawful purposes and in a way that does not infringe the rights of, restrict, or inhibit anyone else's use and enjoyment of the services." },
      { label: "Ownership of Content", text: "You are solely responsible for the content you generate, upload, or transmit using our services. You must have the necessary rights and permissions to use any content you provide to us." },
      { label: "No Misrepresentation", text: "You will not use our services to post, promote, or encourage fraudulent, deceptive, or misleading content, including but not limited to, paying for or submitting fake reviews." },
    ],
  },
  {
    id: 4,
    title: "Billing and Payment",
    bullets: [
      { label: "Fees", text: "You agree to pay all applicable fees for the services you select, as detailed on our pricing page or in a separate agreement." },
      { label: "Billing", text: "Services are billed in advance on a recurring basis (e.g., monthly or annually), as specified in your service plan." },
    ],
  },
  {
    id: 5,
    title: "Intellectual Property",
    bullets: [
      { label: "Our Content", text: "All content on our website and provided as part of our services, including text, graphics, logos, and software, is the property of Reputation Manage and is protected by intellectual property laws." },
      { label: "Your Content", text: "You retain all ownership rights to the data, text, files, and other materials you submit to the service. By submitting content, you grant us a non-exclusive, worldwide, royalty-free license to use, reproduce, and display that content as necessary to provide the services." },
    ],
  },
  {
    id: 6,
    title: "Governing Law",
    content:
      "These Terms and Conditions shall be governed and construed in accordance with the laws of [Insert Governing Jurisdiction, e.g., the State of California], without regard to its conflict of law provisions.",
  },
  {
    id: 7,
    title: "Changes to Terms and Conditions",
    content:
      "We reserve the right, at our sole discretion, to modify or replace these Terms and Conditions at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect. By continuing to access or use our services after those revisions become effective, you agree to be bound by the revised Terms and Conditions.",
  },
];

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-6 py-10">
          <p className="text-sm text-pblue font-medium mb-2">Legal</p>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Terms &amp; Conditions
          </h1>
          <p className="text-gray-500 text-sm">
            Last updated: March 5, 2026 &nbsp;·&nbsp; Reputation Manage
          </p>
          <p className="mt-4 text-gray-600 text-sm leading-relaxed max-w-2xl">
            Welcome to Reputation Manage! These Terms and Conditions govern your
            access to and use of the services, website, and products offered by
            Reputation Manage. By accessing or using our services, you agree to
            be bound by these Terms and Conditions.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-10 space-y-8">
        {sections.map((s) => (
          <div key={s.id} className="bg-white rounded-xl border border-gray-200 p-6">
            {/* Section Title */}
            <div className="flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-linear-to-r from-pblue to-bluegray text-white text-xs font-semibold shrink-0">
                {s.id}
              </span>
              <h2 className="text-base font-semibold text-gray-800">{s.title}</h2>
            </div>

            {/* Paragraph */}
            {"content" in s && s.content && (
              <p className="text-sm text-gray-600 leading-relaxed">{s.content}</p>
            )}

            {/* Bullets */}
            {"bullets" in s && s.bullets && (
              <ul className="space-y-3">
                {s.bullets.map((b, i) => (
                  <li key={i} className="flex gap-3 text-sm text-gray-600 leading-relaxed">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-pblue shrink-0" />
                    <span>
                      <span className="font-medium text-gray-800">{b.label}: </span>
                      {b.text}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}


      </div>
    </div>
  );
};

export default TermsAndConditions;