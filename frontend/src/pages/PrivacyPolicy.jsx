import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="h-[300px] bg-green-600 text-white flex items-center justify-center">
        <h1 className="text-4xl font-bold">Privacy Policy</h1>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-6">Introduction</h2>
        <p className="text-gray-700 mb-4">
          At Agrimitra, we value your privacy and are committed to protecting
          your personal information. This Privacy Policy outlines how we
          collect, use, and safeguard your data when you use our services.
        </p>

        <h2 className="text-3xl font-bold mb-6">Information We Collect</h2>
        <p className="text-gray-700 mb-4">
          We may collect the following types of information:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li>
            <strong>Personal Information:</strong> Name, email address, phone
            number, and other contact details.
          </li>
          <li>
            <strong>Usage Data:</strong> Information about how you use our
            website, including pages visited, time spent, and interactions.
          </li>
          <li>
            <strong>Location Data:</strong> Approximate location based on your
            IP address.
          </li>
          <li>
            <strong>Uploaded Data:</strong> Images or files you upload for
            services like crop or disease prediction.
          </li>
        </ul>

        <h2 className="text-3xl font-bold mb-6">How We Use Your Information</h2>
        <p className="text-gray-700 mb-4">
          We use your information for the following purposes:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li>To provide and improve our services.</li>
          <li>To communicate with you regarding your inquiries or requests.</li>
          <li>To personalize your experience on our platform.</li>
          <li>To analyze usage patterns and improve our website.</li>
          <li>To comply with legal obligations.</li>
        </ul>

        <h2 className="text-3xl font-bold mb-6">How We Protect Your Data</h2>
        <p className="text-gray-700 mb-4">
          We implement industry-standard security measures to protect your
          personal information, including:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li>Encryption of sensitive data.</li>
          <li>Secure servers and firewalls.</li>
          <li>Regular security audits and updates.</li>
        </ul>

        <h2 className="text-3xl font-bold mb-6">Sharing Your Information</h2>
        <p className="text-gray-700 mb-4">
          We do not sell or rent your personal information to third parties.
          However, we may share your data with:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li>
            <strong>Service Providers:</strong> Third-party vendors who assist
            us in providing our services.
          </li>
          <li>
            <strong>Legal Authorities:</strong> When required by law or to
            protect our rights.
          </li>
        </ul>

        <h2 className="text-3xl font-bold mb-6">Your Rights</h2>
        <p className="text-gray-700 mb-4">
          You have the following rights regarding your personal information:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li>Access your data and request a copy.</li>
          <li>Request corrections to inaccurate information.</li>
          <li>Request deletion of your data.</li>
          <li>Opt-out of marketing communications.</li>
        </ul>

        <h2 className="text-3xl font-bold mb-6">Cookies</h2>
        <p className="text-gray-700 mb-4">
          We use cookies to enhance your experience on our website. Cookies are
          small files stored on your device that help us analyze usage patterns
          and improve our services. You can manage your cookie preferences
          through your browser settings.
        </p>

        <h2 className="text-3xl font-bold mb-6">Third-Party Links</h2>
        <p className="text-gray-700 mb-4">
          Our website may contain links to third-party websites. We are not
          responsible for the privacy practices or content of these websites. We
          encourage you to review their privacy policies before providing any
          personal information.
        </p>

        <h2 className="text-3xl font-bold mb-6">Changes to This Policy</h2>
        <p className="text-gray-700 mb-4">
          We may update this Privacy Policy from time to time. Any changes will
          be posted on this page with the updated date. We encourage you to
          review this policy periodically to stay informed about how we protect
          your information.
        </p>

        <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
        <p className="text-gray-700 mb-4">
          If you have any questions or concerns about this Privacy Policy,
          please contact us at:
        </p>
        <p className="text-gray-700">
          <strong>Email:</strong>{" "}
          <a
            href="mailto:agrimitraofficial@gmail.com"
            className="text-green-600 hover:underline"
          >
            agrimitraofficial@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
