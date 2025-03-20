import React from "react";

interface FacultyCardProps {
  name: string;
  email: string;
}

const FacultyCard: React.FC<FacultyCardProps> = ({ name, email }) => {
  return (
    <div className="relative w-full max-w-xs p-6 bg-white dark:bg-gray-900 backdrop-blur-xl shadow-xl rounded-2xl border border-gray-100 dark:border-gray-700 hover:scale-[1.05] transition-all duration-300">
      <div className="flex flex-col items-center">
        {/* Profile Image */}
        <img
          src="https://silvamethod.com/images/testimonials/profile-picture-vector.jpg" // Placeholder image URL
          alt={name}
          className="w-24 h-24 object-cover rounded-full border-4 border-blue-500 shadow-lg"
        />

        {/* Faculty Name */}
        <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
          {name}
        </h3>

        {/* Email */}
        <a
          href={`mailto:${email}`}
          className="mt-2 text-sm text-blue-500 dark:text-blue-400 hover:underline"
        >
          {email}
        </a>
      </div>
    </div>
  );
};

export default FacultyCard;
