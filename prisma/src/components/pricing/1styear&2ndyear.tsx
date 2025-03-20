import Footer from "@/components/landingPage/Footer";
import Navbar from "@/components/landingPage/Navbar";
import Link from "next/link";


const FirstPricingPlans = () => {
  const features = [


    { text: "Premium Study Notes", available: true },
    { text: "PYQs Collection", available: true },
    { text: "PYQs Solutions", available: true },
    { text: "Exam Pattern Insights", available: true },
    { text: "Student Community Access", available: true },
    { text: "24x7 Support", available: true },
    { text: "Faculty Details", available: true },
    { text: "Course Details", available: true },
    { text: "SGPA Calculator", available: true },
    { text: "Pomodoro Timer", available: true },

  ];

  return (
    <div className="flex-col flex justify-center items-center">
      {/* <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-green-50 to-white p-6">
        <h2 className="text-4xl font-semibold text-gray-900 text-center">
          <span className="text-[#3C652F]">Premium quality </span>without
        </h2>
        <h2 className="text-4xl font-semibold text-gray-900 text-center">
          the premium price
        </h2>
        <p className="text-gray-600 mt-5 text-center max-w-4xl">
          Get the best study materials at an affordable price. Choose a plan that fits your needs.
        </p> */}

        {/* Mid-Sem Plan */}
        <div className="w-full md:w-80 p-6 bg-gradient-to-br from-gray-100 to-green-100 pricing rounded-xl shadow-lg mt-8">
          <h3 className="text-gray-100 font-medium bg-lime-700 py-1.5 text-center rounded-md mb-5">1st Year & 2nd Year</h3>

          <h3 className="text-gray-700 font-medium mb-3">END-SEM PREP PLAN</h3>
          <p className="text-4xl font-bold text-green-700 pricing-text">₹29
            {/* <span className="text-sm text-gray-500">(Discounted from ₹99)</span> */}
          </p>
          <ul className="mt-4 space-y-2">
            {features.map((feature, i) => (
              <li key={i} className={`flex items-center ${feature.available ? 'text-gray-700' : 'text-gray-500'}`}>
                <span className="mr-2">{feature.available ? '✔' : '○'}</span> {feature.text}
              </li>
            ))}
          </ul>
        </div>

        <Link href="/pricing/qr1"  > <button className="mt-6 bg-[#325780] text-white px-6 py-2 rounded-full shadow-md hover:bg-[#1f5fa8] transition">
          ACTIVE NOW        </button>
        </Link>
      </div>
    //   <Footer />
    // </div>
  );
};

export default FirstPricingPlans;
