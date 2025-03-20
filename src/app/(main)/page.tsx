import ChatCards from "@/components/landingPage/chat-cards";
import OptimizedCards from "@/components/landingPage/FeaturedCard";
import FeedbackComponent from "@/components/landingPage/Feedback";
import Footer from "@/components/landingPage/Footer";
import MagicButton from "@/components/landingPage/GetstartedButton";
import HomeProcess from "@/components/landingPage/HomeProcess";
// import MessageBox from "@/components/landingPage/MessageBox";
import Navbar from "@/components/landingPage/Navbar";
import Testimonials from "@/components/landingPage/Testimonial";
import { FC } from "react";

const Page: FC = () => {
  return (
    <div>
      <Navbar />
      <div className="relative flex flex-col items-center justify-center 2lg:h-[910px] xl:h-[750px] h-[840px] sm:h-[620px]  mt-80 sm:mt-64 lg:mt-96 2lg:mt-[280px] xl:mt-64 text-center bg-cover bg-center" style={{ backgroundImage: "url('https://res.cloudinary.com/da3u4ukxz/image/upload/v1739859927/Group_230_jpbu7w.png') " }}>
        <div className="relative z-10 flex flex-col 2lg:-mt-[800px] xl:-mt-[540px] -mt-[880px] sm:-mt-[590px] lg:-mt-[800px]  items-center justify-center flex-grow">
          <h1 className="text-[28px] 2lg:text-4xl xl:text-3xl font-bold">SKIPPED CLASSES?<br />PANIC MODE: ACTIVATED?</h1>
          <p className="mt-4 max-w-lg text-sm text-gray-700 mb-3 px-5 xl:px-0">
            Are you 10 minutes deep into YouTube tutorials, still trying to decode what your professor covered in just one lecture? 🤯📖
            <br />
            <span className="font-semibold">Chill, bestie. We got you!
            </span>
            With us, you get all the notes, PYQs, and tools you need to catch up, stay ahead, and ace your exams—without the endless scrolling. <br />
            <span className="font-semibold">Tap in below & study smarter!  </span>        </p>
          <MagicButton />
        </div>
        <div className="w-full bg-[#74aa63] rounded-b-3xl 2lg:-mb-[350px] sm:-mb-[500px] -mb-[790px]  xl:-mb-72 z-20 pb-10 " >
          <div className=" text-white font-bold sm:text-4xl text-3xl px-4  ">
            <h1>Welcome to K-Prep — your one-stop shop for </h1>
            <h1 className="">ALL THE THINGS:</h1>
          </div>
          <div className="md:px-16 sm:px-8">
            <OptimizedCards />
          </div>
        </div>

      </div>
      <div className="h-[660px] sm:h-[400px] xl:h-[200px] 2lg:h-[250px] block ">

      </div>
      <div className="mt-10 z-0">
        {/* <MessageBox /> */}
        <ChatCards />

      </div>
      <div className='bg-[#74aa63] rounded-3xl relative -mt-10'>
        <HomeProcess />
      </div>

      <div className="z-0 -mt-10">
      <Testimonials/>

      </div>
<div>
        <FeedbackComponent />
      </div>
      <Footer />
    </div>
  );
};

export default Page;

// "use client";

// import { useEffect, useState } from "react";
// import { FaRocket } from "react-icons/fa";
// import Confetti from "react-confetti";
// import { useWindowSize } from "react-use";

// export default function Home() {
//   const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
//   const [revealedCode, setRevealedCode] = useState<string[]>(Array(4).fill("XXXX"));
//   const [isCelebrating, setIsCelebrating] = useState(false);
//   const { width, height } = useWindowSize();

//   useEffect(() => {
//     const targetTime = new Date();
//     targetTime.setHours(20, 0, 0, 0);

//     const updateCountdown = () => {
//       const now = new Date();
//       const difference = targetTime.getTime() - now.getTime();

//       if (difference <= 0) {
//         setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
//         return;
//       }

//       setTimeLeft({
//         hours: Math.floor(difference / (1000 * 60 * 60)),
//         minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
//         seconds: Math.floor((difference % (1000 * 60)) / 1000),
//       });
//     };

//     updateCountdown();
//     const interval = setInterval(updateCountdown, 1000);
//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     const generateCodeSegments = () => Array(4).fill(null).map(() => Math.floor(1000 + Math.random() * 9000).toString());

//     const revealCodeGradually = () => {
//       const now = new Date();
//       const revealTimes = [17, 18, 19, 20];
//       const revealIndex = revealTimes.findIndex((hour) => now.getHours() < hour);
//       const fullCode = generateCodeSegments();
//       setRevealedCode(fullCode.map((segment, index) => (index < revealIndex ? segment : "XXXX")));
//     };

//     revealCodeGradually();
//     const interval = setInterval(revealCodeGradually, 60 * 60 * 1000);
//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     const checkCelebrationTime = () => {
//       const now = new Date();
//       setIsCelebrating(now.getHours() === 20 && now.getMinutes() < 4);
//     };

//     checkCelebrationTime();
//     const interval = setInterval(checkCelebrationTime, 1000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="flex flex-col h-screen justify-center items-center text-white bg-gradient-to-r from-[#3a4d34] via-[#7a9670] to-[#3f5637] p-4">
//       {isCelebrating && <Confetti width={width} height={height} />}

//       <div className="text-center font-mono">
//         <h1 className="text-4xl md:text-5xl font-bold mb-4">Cool Stuff Coming Soon!</h1>
//         <p className="text-lg md:text-2xl">We&apos;re working hard to bring you a better experience.</p>
//         <p className="text-md md:text-xl mt-4 flex items-center justify-center">
//           Stay tuned! <FaRocket className="ml-2" />
//         </p>
//       </div>

//       {/* Countdown Timer */}
//       <div className="text-center my-6">
//         <h2 className="text-2xl md:text-3xl font-bold tracking-wide">Live in:</h2>
//         <div className="mt-2 flex gap-4 text-4xl md:text-5xl font-mono font-bold">
//           {["hours", "minutes", "seconds"].map((unit, index) => (
//             <span key={index} className="bg-black/50 p-4 rounded-lg shadow-lg">
//               {String(timeLeft[unit as keyof typeof timeLeft]).padStart(2, "0")}
//             </span>
//           ))}
//         </div>
//       </div>

//       {/* Random Code Reveal */}
//       <div className="text-center bottom-5 absolute">
//         <h3 className="text-xl md:text-2xl font-semibold text-gray-300 tracking-wider">Unlock Code:</h3>
//         <p className="text-2xl md:text-4xl font-mono font-bold bg-black/60 p-4 rounded-lg shadow-lg tracking-widest">
//           {revealedCode.join(" ")}
//         </p>
//       </div>
//     </div>
//   );
// }
