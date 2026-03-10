import { Clock, CreditCard, AlertTriangle, Mail } from "lucide-react"

export default function RefundAndCancellationPolicy() {
  return (
    <div className="min-h-screen bg-white">
      <style>{`
        .text-pblue { color: #017aff; }
        .text-bluegray { color: #4664ac; }
        .bg-pblue { background-color: #017aff; }
        .border-pblue { border-color: #017aff; }
      `}</style>

      {/* Header */}
      <div className="bg-pblue px-6 py-12">
        <div className="max-w-2xl mx-auto">
          <p className="text-blue-200 text-sm font-medium mb-2">Reputation Manage</p>
          <h1 className="text-white text-3xl font-bold">Refund & Cancellation Policy</h1>
          <p className="text-blue-100 mt-2 text-sm">Last updated — March 2026</p>
          <p className="text-blue-100 mt-2 text-sm">At Reputation Manage, we strive to provide high-quality services. Because our reputation management tools and services involve manual labor and digital resources, we adhere to the following policy:</p>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-2xl mx-auto px-6 py-10 flex flex-col gap-10">

        {/* 1. Cancellation Window */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Clock size={18} className="text-pblue" />
            <h2 className="font-semibold text-gray-900">1. Cancellation Window</h2>
          </div>
          <p className="text-gray-500 text-sm mb-4">
            You may request to cancel your order within 12 hours of the initial purchase.
          </p>
          <div className="flex flex-col gap-3">
            <div className="flex gap-3 items-start">
              <span className="text-xs font-semibold bg-blue-50 text-pblue px-2.5 py-1 rounded-full whitespace-nowrap">Within 12 Hours</span>
              <p className="text-sm text-gray-600 leading-relaxed">An automatic refund will be processed to your original payment method.</p>
            </div>
            <div className="flex gap-3 items-start">
              <span className="text-xs font-semibold bg-orange-50 text-orange-500 px-2.5 py-1 rounded-full whitespace-nowrap">After 12 Hours</span>
              <p className="text-sm text-gray-600 leading-relaxed">Cancellation requests will not be accepted as the fulfillment process will have already begun.</p>
            </div>
          </div>
        </div>

        <hr className="border-gray-100" />

        {/* 2. Refund Eligibility */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <CreditCard size={18} className="text-pblue" />
            <h2 className="font-semibold text-gray-900">2. Refund Eligibility</h2>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex gap-3 items-start">
              <span className="text-xs font-semibold bg-blue-50 text-bluegray px-2.5 py-1 rounded-full whitespace-nowrap">Completed Orders</span>
              <p className="text-sm text-gray-600 leading-relaxed">Once an order is marked as complete or the service has been delivered, it is no longer eligible for a refund.</p>
            </div>
            <div className="flex gap-3 items-start">
              <span className="text-xs font-semibold bg-blue-50 text-bluegray px-2.5 py-1 rounded-full whitespace-nowrap">Service Initiation</span>
              <p className="text-sm text-gray-600 leading-relaxed">Refunds are not available for services already in progress after the 12-hour cancellation period.</p>
            </div>
          </div>
        </div>

        <hr className="border-gray-100" />

        {/* 3. Accidental Orders */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle size={18} className="text-pblue" />
            <h2 className="font-semibold text-gray-900">3. Accidental Orders</h2>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            If you have placed an order by mistake, please contact our Support Team immediately. While we cannot guarantee a refund outside of the 12-hour window, we will work with you to rectify the error or apply the credit to the correct service where possible.
          </p>
        </div>

        <hr className="border-gray-100" />

        {/* 4. How to Request */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Mail size={18} className="text-pblue" />
            <h2 className="font-semibold text-gray-900">4. How to Request a Cancellation</h2>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            To cancel an order, submit a request through your user dashboard or email our support team at{" "}
            <span className="text-pblue font-medium">contact.reputationmanage@gmail.com</span>{" "}
            with your order number and the subject line{" "}
            <span className="font-semibold text-gray-800">&quot;Cancellation Request.&quot;</span>
          </p>
        </div>

        {/* Footer note */}
        <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
          <p className="text-sm text-gray-500">
            For further assistance, reach out to us at{" "}
            <a href="mailto:contact.reputationmanage@gmail.com" className="text-pblue font-medium">
              contact.reputationmanage@gmail.com
            </a>
          </p>
        </div>

      </div>
    </div>
  )
}