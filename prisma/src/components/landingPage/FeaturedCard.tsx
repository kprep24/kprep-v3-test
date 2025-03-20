import Link from 'next/link';

const cardData = [
  {
    imageUrl: "https://res.cloudinary.com/da3u4ukxz/image/upload/v1739859928/61_rq0tc5.png",
    title: "CLASS NOTES",
    description: "Get well-structured, university-specific notes.",
    link: "/userboard/userresources"
  },
  {
    imageUrl: "https://res.cloudinary.com/da3u4ukxz/image/upload/v1739859926/8_tqxdar.png",
    title: "DATE SHEET",
    description: "Your exam schedule, sorted and clear.",
    link: "/userboard"
  },
  {
    imageUrl: "https://res.cloudinary.com/da3u4ukxz/image/upload/v1739859927/7_eahl3z.png",
    title: "PYQs",
    description: "Practice with previous year papers.",
    link: "/userboard/userpyqs"
  },
  {
    imageUrl: "https://res.cloudinary.com/da3u4ukxz/image/upload/v1739859927/9_fuibsu.png",
    title: "STUDY TIPS",
    description: "Smart hacks to study effortlessly.",
    link: "/userboard"
  },
  {
    imageUrl: "https://res.cloudinary.com/da3u4ukxz/image/upload/v1739859927/10_zjkiwa.png",
    title: "SENIOR-JUNIOR INTERACTIONS",
    description: "Guidance, career advice, and banter.",
    link: "/userboard"
  },
  {
    imageUrl: "https://res.cloudinary.com/da3u4ukxz/image/upload/v1739859926/11_gat8qp.png",
    title: "EXAM PREP",
    description: "Plan and ace your exams.",
    link: "/userboard"
  }
];

export default function OptimizedCards() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 sm:gap-6 gap-4 sm:p-6 sm:px-10 rounded-lg p-4 pt-10 xm:pt-0">
      {cardData.map((card, index) => (
        <Link href={card.link} key={index}>
          <div className="bg-white lg:p-6 p-4 cursor-pointer rounded-lg shadow-lg flex flex-col items-center text-center transition-transform duration-300 hover:scale-105 w-full h-full">
            <img src={card.imageUrl} alt={card.title} className="mb-4 w-20 h-20" />
            <h3 className="lg:text-lg sm:text-[17px] text-base font-semibold text-gray-800">{card.title}</h3>
            <p className="text-gray-600 lg:text-base text-[15px] mt-2">{card.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}