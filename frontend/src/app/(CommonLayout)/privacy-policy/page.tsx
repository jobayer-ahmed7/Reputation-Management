"use client";

import Image from "next/image";

const PrivacyPolicyPage = () => {
  return (
    <main className="bg-linear-to-b from-white via-slate-50 to-slate-100">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* Header */}
        <div className="grid gap-10 lg:grid-cols-[3fr_2fr] items-start mb-12">
          <div className="space-y-4">
            <p className="inline-flex items-center text-xs font-semibold tracking-widest text-pblue uppercase bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              Privacy &amp; Policy
            </p>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
              Your privacy, security, and trust come first.
            </h1>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl">
              At Reputation Manage, we are committed to protecting your personal
              information and being transparent about how we collect, use, and
              safeguard your data when you interact with our website and services.
            </p>
          </div>

          {/* Hero Image / Card */}
          <div className="w-full max-w-md lg:ml-auto">
            <div className="relative rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-lg">
              <div className="absolute inset-0 bg-linear-to-tr from-pblue/10 via-transparent to-bluegray/10 pointer-events-none" />
              <Image
                src="/reputationmanage3.webp"
                alt="Secure data protection and privacy illustration"
                width={640}
                height={480}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="mx-auto max-w-3xl space-y-10 text-slate-700">
          {/* Who We Are */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-slate-900">
              Who We Are
            </h2>
            <p className="leading-relaxed">
              At Reputationmanage.org, located on the World Wide Web, we are committed
              to protecting your privacy. We understand that as a visitor to our
              website, you want to control how your information is used. To that end,
              we may ask you to provide personal information and preferences when you
              use our services or subscribe to our communications. The personal
              information you share with us is secured to ensure that our content and
              services are always tailored to your specific needs and choices.
            </p>
            <p className="leading-relaxed">
              When you provide Reputation Manage with personal information like your
              name, email address, company details, or phone number and do not
              opt-out, we may use this information to reach out to you to understand
              your requirements and discuss how our services can help. You will always
              have the flexibility to opt out of these communications at any time.
            </p>
          </section>

          {/* What Personal Data We Collect & Why */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-slate-900">
              What Personal Data We Collect &amp; Why
            </h2>
            <p className="leading-relaxed">
              Primarily, we do not collect personal information when you browse our
              site, not even your email address. However, your browser automatically
              provides us with information such as your IP address, browser type, and
              operating system.
            </p>
            <p className="leading-relaxed">
              Reputation Manage uses standard log files to collect non-personally
              identifiable information. As you navigate our website, a cookie may
              track your movements and collect data including internet protocol (IP)
              addresses, browser type, internet service provider (ISP), date and time
              stamps, referring/exit pages, and the number of clicks. This information
              is not linked to any personally identifiable information. The purpose of
              this data is to analyze trends, administer the site, track user
              movement, and gather demographic insights.
            </p>
          </section>

          {/* How We Protect Your Personal Information */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-slate-900">
              How We Protect Your Personal Information
            </h2>
            <p className="leading-relaxed">
              Our privacy policy applies only to our website and does not cover other
              advertisers or third-party sites.
            </p>
            <p className="leading-relaxed">
              When you enter sensitive information (such as credit card numbers) on
              our forms, we encrypt that data using Secure Socket Layer (SSL)
              technology. We adhere to generally accepted industry standards to
              protect the sensitive information submitted to us, both during
              transmission and once we receive it. However, it&apos;s important to note
              that no method of transmission over the Internet or electronic storage
              is 100% secure. While we strive to protect your personal information, we
              cannot guarantee its absolute security.
            </p>
          </section>

          {/* We Value Your Personal Information */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-slate-900">
              We Value Your Personal Information
            </h2>
            <p className="leading-relaxed">
              If Reputation Manage requests general demographic information, this data
              is used for reporting purposes only, and users remain anonymous. Phone
              numbers, email addresses, and physical addresses are never shared with
              outside parties for demographic reports.
            </p>
            <p className="leading-relaxed">
              We take every action to protect user privacy. We may be required to
              disclose personal information if compelled by law, such as in response
              to a court order or legal process, when we believe in good faith that
              such action is necessary to comply with legal obligations or to protect
              the rights, property, or safety of our company or others.
            </p>
          </section>

          {/* Notification of Changes */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-slate-900">
              Notification of Changes
            </h2>
            <p className="leading-relaxed">
              Should Reputation Manage decide to alter its Privacy Policy, we will
              post those changes to this privacy statement and other places we deem
              appropriate. This ensures our users are always aware of what information
              we collect, how we use it, and under what circumstances, if any, we
              disclose it.
            </p>
          </section>
        </div>
      </section>
    </main>
  );
};

export default PrivacyPolicyPage;