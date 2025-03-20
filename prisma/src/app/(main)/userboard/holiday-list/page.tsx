import React from "react";

const events = [
  { date: "26.02.2025", day: "Wednesday", event: "MAHA SHIVRATRI" },
  { date: "05.03.2025", day: "Wednesday", event: "PANCHAYATIRAJ DIWAS" },
  { date: "31.03.2025", day: "Monday", event: "ID-UL-FITRE" },
  { date: "01.04.2025", day: "Tuesday", event: "UTKAL DIVAS" },
  { date: "14.04.2025", day: "Monday", event: "MAHA VISHUBHA SANKRANTI" },
  { date: "18.04.2025", day: "Friday", event: "GOOD FRIDAY" },
  { date: "27.06.2025", day: "Friday", event: "RATH YATRA" },
  { date: "15.08.2025", day: "Friday", event: "INDEPENDENCE DAY & JANAMASTAMI" },
  { date: "27.08.2025", day: "Wednesday", event: "GANESH PUJA" },
  { date: "28.08.2025", day: "Thursday", event: "NUAKHAI" },
  { date: "05.09.2025", day: "Friday", event: "BIRTHDAY OF PROPHET MOHAMMAD" },
  { date: "29.09.2025 – 07.10.2025", day: "Monday – Tuesday", event: "DURGA PUJA – KUMAR PURNIMA" },
  { date: "20.10.2025 – 21.10.2025", day: "Monday – Tuesday", event: "KALIPUJA & DIWALI" },
  { date: "05.11.2025", day: "Wednesday", event: "KARTIKA PURNIMA/ GURU NANAK’S BIRTHDAY" },
  { date: "25.12.2025", day: "Thursday", event: "CHRISTMAS" }
];

const weekendEvents = [
  { date: "26.01.2025", day: "Sunday", event: "REPUBLIC DAY" },
  { date: "02.02.2025", day: "Sunday", event: "BASANTA PANCHAMI" },
  { date: "15.03.2025", day: "Saturday", event: "HOLI" },
  { date: "06.04.2025", day: "Sunday", event: "RAM NAVAMI" },
  { date: "07.06.2025", day: "Saturday", event: "ID-UL-JUHA" },
  { date: "15.06.2025", day: "Sunday", event: "RAJA SANKRANTI" },
  { date: "06.07.2025", day: "Sunday", event: "MUHARRAM" }
];

const FestivalTable = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Festival List 2025</h2>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 shadow-md rounded-lg overflow-hidden text-sm sm:text-base">
          <thead>
            <tr className="bg-[#647b5c] text-white dark:bg-gray-200 dark:text-black">
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Day</th>
              <th className="p-3 text-left">Event</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event, index) => (
              <tr key={index} className="odd:bg-gray-100 even:bg-white dark:odd:bg-gray-700 dark:even:bg-gray-800 border-b border-gray-300 dark:border-gray-600">
                <td className="p-3 whitespace-nowrap">{event.date}</td>
                <td className="p-3 whitespace-nowrap">{event.day}</td>
                <td className="p-3">{event.event}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <h2 className="text-2xl font-bold mt-8 mb-4 text-center">Festivals on Weekends</h2>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 shadow-md rounded-lg overflow-hidden text-sm sm:text-base">
          <thead>
            <tr className="bg-[#647b5c] text-white dark:bg-gray-200 dark:text-black">
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Day</th>
              <th className="p-3 text-left">Event</th>
            </tr>
          </thead>
          <tbody>
            {weekendEvents.map((event, index) => (
              <tr key={index} className="odd:bg-gray-100 even:bg-white dark:odd:bg-gray-700 dark:even:bg-gray-800 border-b border-gray-300 dark:border-gray-600">
                <td className="p-3 whitespace-nowrap">{event.date}</td>
                <td className="p-3 whitespace-nowrap">{event.day}</td>
                <td className="p-3">{event.event}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FestivalTable;
