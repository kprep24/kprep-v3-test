import React from 'react'

function MessageBox() {
  return (
    <div className="w-full h-full bg-cover bg-center py-32 xl:py-32 xl:pb-40 px-5 xl:px-40 sm:px-10 lg:px-20 z-0 bg-gradient-to-r from-green-400 to-blue-500 flex flex-col justify-center" style={{ backgroundImage: "url('/blueHome.png')" }}>
      {/* Chat Bubble 1 */}
      <div className="flex justify-start animate-bounce-in-right mt-6">
        <div className="bg-blue-100 border-2 border-black p-6 rounded-xl shadow-inner relative before:content-[''] before:absolute before:bottom-full before:left-4 before:border-8 before:border-transparent before:border-b-blue-200 w-96 transform hover:scale-105 transition-transform duration-300">
          <p className="text-base sm:text-lg text-gray-800">
            Your academic glow-up starts here. No stress, no mess—just straight A’s and effortless flexes. Tap in and level up.
          </p>
        </div>
      </div>
      <div className="flex justify-end animate-bounce-in-left mb-4 mt-2">
        <div className="bg-green-100 border-2 border-black p-6 rounded-xl shadow-inner relative before:content-[''] before:absolute before:top-full before:right-4 before:border-8 before:border-transparent before:border-t-green-200 w-96 transform hover:scale-105 transition-transform duration-300">
          <p className="text-base sm:text-lg text-gray-800">
            No cap, just facts. Join us and watch your academic game go from meh to main character energy.
          </p>
        </div>
      </div>
      
      {/* Chat Bubble 2 */}
      <div className="flex justify-start animate-bounce-in-right mt-6">
        <div className="bg-blue-100 border-2 border-black p-6 rounded-xl shadow-inner relative before:content-[''] before:absolute before:bottom-full before:left-4 before:border-8 before:border-transparent before:border-b-blue-200 w-96 transform hover:scale-105 transition-transform duration-300">
          <p className="text-base sm:text-lg text-gray-800">
            We’re like the friend who always has the tea... except our tea gets you top grades. Swipe, tap, prep, ACE.
          </p>
        </div>
      </div>
      <div className="flex justify-end animate-bounce-in-left mb-4 mt-2">
        <div className="bg-green-100 border-2 border-black p-6 rounded-xl shadow-inner relative before:content-[''] before:absolute before:top-full before:right-4 before:border-8 before:border-transparent before:border-t-green-200 w-96 transform hover:scale-105 transition-transform duration-300">
          <p className="text-base sm:text-lg text-gray-800">
            We turned study sessions into a vibe. Notes, quizzes, and brain boosts—all in one place. Because being smart is the new cool.
          </p>
        </div>
      </div>
    </div>
  )
}

export default MessageBox;
