"use client"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/free-mode"
import { Pagination, FreeMode, Autoplay } from "swiper/modules"
import { Quote } from "lucide-react"

const testimonials = [
  // {
  //   quote:
  //     "K-Prep has been a game-changer for my studies! The class notes and previous year papers helped me ace my exams effortlessly.",
  //   name: "Soumyadip Malty",
  //   title: "CSE 3rd Year",
  // },
  {
    quote:
      "I love how K-Prep provides everything in one place. The notes are well-structured and make revision super easy!",
    name: "Aisha Patel",
    title: "CSE 2nd Year",
  },
  {
    quote:
      "Thanks to K-Prep, I no longer stress about exam prep. The platform is intuitive, and the resources are top-notch!",
    name: "Rahul Kumar",
    title: "CSE 1st Year",
  },
  {
    quote:
      "K-Prep has made academic life so much easier! The class notes and previous year papers are incredibly useful.",
    name: "Priya Singh",
    title: "CSE 3rd Year",
  },
  {
    quote:
      "The best study website I've ever used. The resources are comprehensive and easy to understand.",
    name: "Anjali Verma",
    title: "CSE 2nd Year",
  },
  {
    quote:
      "K-Prep is a lifesaver! The previous year papers helped me prepare effectively for my exams.",
    name: "Rohit Sharma",
    title: "CSE 1st Year",
  },
  {
    quote:
      "I highly recommend K-Prep to all students. It's a one-stop solution for all your study needs.",
    name: "Sneha Gupta",
    title: "CSE 4th Year",
  },
  {
    quote:
      "K-Prep has everything you need to succeed in your studies. The notes and PYQs are top-notch.",
    name: "Vikas Yadav",
    title: "CSE 3rd Year",
  },
];

export default function Testimonials() {
  return (
    <div className="py-16 pt-28 px-4 md:px-8 lg:px-12 ">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-start gap-4 mb-12">
      
          <h2 className="text-3xl sm:text-4xl xl:text-5xl font-bold tracking-tight text-[#2C3B2D]">
            See what all the talk
            <br />
            is about
          </h2>
        </div>

        <Swiper
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1.5, spaceBetween: 20 },
            768: { slidesPerView: 2.5, spaceBetween: 24 },
            1024: { slidesPerView: 3, spaceBetween: 32 },
          }}
          freeMode={true}
          pagination={{ clickable: true, dynamicBullets: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          modules={[Pagination, FreeMode, Autoplay]}
          className="w-full pb-14"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className="group relative">
                {/* Subtle Gradient Background Effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-20 -z-10`}
                />

                {/* Card */}
                <div
                  className="bg-[#e8f0e8] rounded-2xl p-8 h-full
                  border border-[#d1ddd2]
                  transition-all duration-300 hover:scale-[1.02] hover:shadow-lg
                  relative overflow-hidden"
                >
                  {/* Quote Icon */}
                  <Quote className="w-6 h-6 text-[#9EB3A0] mb-6" />


                  {/* Quote Text */}
                  <div className="mb-8">
                    <p
                      className="text-lg md:text-xl font-medium leading-relaxed 
                      text-[#2C3B2D]"
                    >
                      {testimonial.quote}
                    </p>
                  </div>

                  {/* Author Info */}
                  <div className="text-right">
                    <div className="font-semibold text-[#2C3B2D]">{testimonial.name}</div>
                    <div className="text-sm text-[#4A634C]">{testimonial.title}</div>
                  </div>

                  {/* Decorative Element */}
                  <div
                    className="absolute -bottom-8 -right-8 w-32 h-32 bg-gradient-to-r from-transparent 
                    to-[#9EB3A0]/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

