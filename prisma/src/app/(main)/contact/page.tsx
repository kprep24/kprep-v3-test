import Footer from "@/components/landingPage/Footer";
import Navbar from "@/components/landingPage/Navbar";
import React from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const ContactPage: React.FC = () => {
  return (
<div >
<Navbar/>
    <div className="bg-[#fffef7] text-gray-800 py-10 pb-20  flex flex-col items-center">
      {/* Header Section */}
      <div className="text-center py-8 px-4">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#1d3557]">
          We’re Here to Help You!
        </h1>
        <p className="text-gray-600 font-semibold mt-2">
       lprem ipsum dolor sit amet, consectetur adipiscing elit.   lorem ipsum dolor sit amet <br/> exploring our platform or need
          assistance, our team is here to help.
        </p>
      </div>

      {/* Contact Section */}
      <div className="flex flex-col lg:flex-row gap-8 max-w-7xl w-full px-6">
  {/* Contact Information */}
  <div className="flex-1 bg-[#74AA63] text-charcoal p-6 rounded-md shadow-md">
    <h2 className="text-4xl sm:text-5xl font-extrabold mb-4 text-secondary-bg">
      Contact <br /> Us
    </h2>
    <p className="flex items-center gap-2 mb-6 mt-16">
      <FaPhoneAlt /> <span>+91 9641208005</span>
    </p>
    <p className="flex items-center gap-2 mb-6">
      <FaEnvelope />
      <a
        href="mailto:kprep.contact@gmail.com"
        className="underline hover:text-gray-200"
      >
        kprep.contact@gmail.com
      </a>
    </p>
    <p className="flex items-start gap-2">
      <FaMapMarkerAlt />
      <span>
        K-Prep <br /> 
        Patia, Bhubaneswar <br /> 
        Odisha, India
      </span>
    </p>
  </div>


        {/* Contact Form */}
        <div className="flex-1 p-6 ">
          <form className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Name"
              className="p-3 border rounded-md bg-[#889db2] placeholder-[#fff] focus:outline-none focus:ring-2 focus:ring-[#171818]"
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="p-3 border rounded-md bg-[#889db2] placeholder-[#fff] focus:outline-none focus:ring-2 focus:ring-[#171818]"
              required
            />
            <div className="flex md:flex-row flex-col gap-4">
              <input
                type="tel"
                placeholder="Phone No."
                className="flex-1 p-3 border rounded-md bg-[#889db2] placeholder-[#fff] focus:outline-none focus:ring-2 focus:ring-[#171818]"
                required
              />
              <input
                type="text"
                placeholder="Subject"
                className="flex-1 p-3 border rounded-md bg-[#889db2] placeholder-[#fff] focus:outline-none focus:ring-2 focus:ring-[#171818]"
                required
              />
            </div>
            <textarea
              placeholder="Message"
              className="p-3 border rounded-md bg-[#889db2] placeholder-[#fff] focus:outline-none focus:ring-2 focus:ring-[#171818] resize-none h-24"
              required
            ></textarea>
            <button
              type="submit"
              className="bg-[#74AA63] text-white py-2 px-4 rounded-md hover:bg-[#8fce7b] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6e4e41]"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
    <Footer/>
    </div>

  );
};

export default ContactPage;
