import Footer from "@/components/landingPage/Footer";
import Navbar from "@/components/landingPage/Navbar";
import React from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaLock, FaShieldAlt, FaUserShield, FaCookieBite, FaExternalLinkAlt } from "react-icons/fa";

const PrivacyPolicy = () => (
    <div>
        <Navbar/>
  <div className=" text-gray-900 px-6 py-12 rounded-md max-w-5xl mx-auto">
    <h1 className="text-4xl font-bold text-[#3D7A3D] text-center mb-8">Privacy Policy</h1>
    
    <div className="text-gray-700 space-y-2 text-justify ">
      <p className="text-lg"><strong>Effective Date:</strong> 20th February, 2025 </p>
      <p className="text-lg mb-5"><strong>Last Updated:</strong> 20th February, 2025</p>
      <p className="leading-relaxed ">
        At <strong>K-Prep</strong>, accessible at <a href="https://www.kprep.in" className="text-[#3D7A3D] font-semibold underline">https://www.kprep.in</a>, protecting your privacy is a top priority. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information when you visit our website. By accessing or using our services, you agree to the practices described in this policy. If you do not agree, please discontinue use of our services.
      </p>
    </div>
    
    {/* Information Collection */}
    <section className="mt-8 text-justify">
      <h2 className="text-2xl font-semibold flex items-center gap-2 text-[#3D7A3D]"><FaUserShield /> Information We Collect</h2>
      <p className="mt-2">We collect both personal and non-personal information to improve our services and enhance user experience.</p>
      
      <div className=" p-4 rounded-md">
        <p className="font-semibold">Personal Information:</p>
        <ul className="list-disc ml-6 space-y-1">
          <li>Full name</li>
          <li>Email address</li>
          <li>Phone number</li>
          <li>Company name (if applicable)</li>
          <li>Mailing address</li>
        </ul>
        <p className="mt-2">This data is collected when you register, contact us, subscribe to newsletters, or engage with interactive features.</p>
      </div>

      <div className=" pb-4 px-4 rounded-md ">
        <p className="font-semibold">Non-Personal Information:</p>
        <ul className="list-disc ml-6 space-y-1">
          <li>IP address</li>
          <li>Device and browser type</li>
          <li>Usage data (pages visited, time spent, referral sources)</li>
          <li>Cookies and tracking technologies</li>
        </ul>
        <p className="mt-2">This data helps us analyze trends, optimize performance, and improve security.</p>
      </div>
    </section>
    
    {/* Data Usage */}
    <section className="mt-8 text-justify">
      <h2 className="text-2xl font-semibold flex items-center gap-2 text-[#3D7A3D]"><FaShieldAlt /> How We Use Your Information</h2>
      <ul className="list-disc ml-6 mt-2 space-y-1">
        <li>Provide and enhance website functionality</li>
        <li>Improve user experience</li>
        <li>Communicate updates, promotions, and support responses</li>
        <li>Prevent fraud and enhance security</li>
        <li>Comply with legal and regulatory requirements</li>
      </ul>
      <p className="mt-2">We do <strong>not</strong> sell, trade, or rent your personal data to third parties.</p>
    </section>
    
    {/* Security */}
    <section className="mt-8 text-justify">
      <h2 className="text-2xl font-semibold flex items-center gap-2 text-[#3D7A3D]"><FaLock /> Data Protection & Security</h2>
      <p className="mt-2">We implement industry-standard security measures, including:</p>
      <ul className="list-disc ml-6 space-y-1">
        <li><strong>Data Encryption:</strong> Sensitive information is encrypted using secure protocols.</li>
        <li><strong>Access Controls:</strong> Restricted data access is granted only to authorized personnel.</li>
        <li><strong>Secure Storage:</strong> Information is safeguarded against unauthorized access and cyber threats.</li>
      </ul>
      <p className="mt-2">While we take every precaution, no system is completely secure. Users should take steps to protect their personal data.</p>
    </section>
    
    {/* Data Sharing */}
    <section className="mt-8 text-justify">
      <h2 className="text-2xl font-semibold flex items-center gap-2 text-[#3D7A3D]"><FaShieldAlt /> Data Sharing & Third-Party Disclosure</h2>
      <p className="mt-2">We may share your information in the following circumstances:</p>
      <ul className="list-disc ml-6 space-y-1">
        <li><strong>Legal Compliance:</strong> If required by law, regulatory authorities, or law enforcement.</li>
        <li><strong>Business Operations:</strong> Third-party service providers (hosting, analytics, payment processing) may access data strictly for operational purposes.</li>
        <li><strong>Business Transfers:</strong> In case of a merger, acquisition, or asset sale, data may be transferred to the new entity.</li>
      </ul>
      <p className="mt-2">All third-party partners are required to adhere to strict data protection standards.</p>
    </section>
    
    {/* Cookies */}
    <section className="mt-8 text-justify">
      <h2 className="text-2xl font-semibold flex items-center gap-2 text-[#3D7A3D]"><FaCookieBite /> Cookies & Tracking Technologies</h2>
      <p className="mt-2">We use <strong>cookies</strong> and similar tracking technologies to enhance website functionality and analyze user interactions.</p>
      <p className="mt-2"><strong>Managing Cookies:</strong> Users can modify browser settings to disable cookies, but this may affect website performance.</p>
      {/* <p className="mt-2">For more details, refer to our <strong>[Cookie Policy]</strong> (if applicable).</p> */}
    </section>
    
    {/* Data Retention */}
    <section className="mt-8 text-justify">
      <h2 className="text-2xl font-semibold flex items-center gap-2 text-[#3D7A3D]"><FaLock /> Data Retention</h2>
      <p className="mt-2">Personal data is retained only as long as necessary to fulfill its purpose or comply with legal obligations. When no longer needed, data is securely deleted or anonymized.</p>
    </section>
    
    {/* User Rights */}
    <section className="mt-8 text-justify">
      <h2 className="text-2xl font-semibold flex items-center gap-2 text-[#3D7A3D]"><FaUserShield /> Your Rights & Choices</h2>
      <p className="mt-2">Users have the right to:</p>
      <ul className="list-disc ml-6 space-y-1">
        <li>Access, update, or correct personal data</li>
        <li>Request deletion of personal information, subject to legal limitations</li>
        <li>Opt-out of marketing communications</li>
        <li>Restrict or object to certain data processing activities</li>
      </ul>
      <p className="mt-2">To exercise your rights, contact us at <strong>kprep.contact@gmail.com</strong>.</p>
    </section>
    
    {/* Third-Party Links */}
    <section className="mt-8 text-justify">
      <h2 className="text-2xl font-semibold flex items-center gap-2 text-[#3D7A3D]"><FaExternalLinkAlt /> Third-Party Links</h2>
      <p className="mt-2">Our website may contain links to external sites. We are not responsible for their privacy practices and encourage users to review their policies before providing any personal information.</p>
    </section>
    
    {/* Policy Changes */}
    <section className="mt-8 text-justify">
      <h2 className="text-2xl font-semibold flex items-center gap-2 text-[#3D7A3D]"><FaShieldAlt /> Changes to This Privacy Policy</h2>
      <p className="mt-2">This Privacy Policy may be updated periodically. Any changes will be posted on this page, and continued use of our services constitutes acceptance of the revised policy.</p>
    </section>
    
    {/* Contact */}
    <section className="mt-8 text-justify">
      <h2 className="text-2xl font-semibold text-[#3D7A3D] text-start">Contact Us</h2>
      <div className="mt-4  p-4 rounded-md">
        <p className="flex items-center gap-2"><FaEnvelope className="text-[#3D7A3D]" /> <a href="mailto:kprep.contact@gmail.com" className="underline text-[#3D7A3D]">kprep.contact@gmail.com</a></p>
        <p className="flex items-center gap-2 mt-2"><FaMapMarkerAlt className="text-[#3D7A3D]" /> K-Prep, Patia, Bhubaneswar, India</p>
      </div>
    </section>
  </div>
  <Footer/>
  </div>
);

export default PrivacyPolicy;
