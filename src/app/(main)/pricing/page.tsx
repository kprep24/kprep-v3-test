import Footer from "@/components/landingPage/Footer";
import Navbar from "@/components/landingPage/Navbar";
import FirstPricingPlans from "@/components/pricing/1styear&2ndyear";
import ThirdPricingPlans from "@/components/pricing/3rdYearPricing";
// import Link from "next/link";


const PricingPlans = () => {

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-green-50 to-white p-6">
        <h2 className="text-4xl font-semibold text-gray-900 text-center">
          <span className="text-[#3C652F]">Premium quality </span>without
        </h2>
        <h2 className="text-4xl font-semibold text-gray-900 text-center">
          the premium price
        </h2>
        <p className="text-gray-600 mt-5 text-center max-w-4xl">
          Get the best study materials at an affordable price. Choose a plan that fits your needs.
        </p>

       <div className="flex flex-col sm:flex-row justify-center gap-10">
        <FirstPricingPlans/>
        <ThirdPricingPlans/>
       </div>
      </div>
      <Footer />
    </div>
  );
};

export default PricingPlans;
