import React from "react";

interface ContactPersonCardProps {
  position: string;
  name: string;
  email: string;
  contact: string;
}

const ContactPersonCard: React.FC<ContactPersonCardProps> = ({ position, name, email, contact }) => {
  return (
    <div className="relative w-full max-w-xs p-6 bg-white dark:bg-gray-900 backdrop-blur-xl shadow-xl rounded-2xl border border-gray-100 dark:border-gray-700 hover:scale-[1.05] transition-all duration-300">
      <div className="flex flex-col items-center">
        {/* Profile Image */}
        <img
          src="https://silvamethod.com/images/testimonials/profile-picture-vector.jpg" // Placeholder image URL
          alt={name}
          className="w-24 h-24 object-cover rounded-full border-4 border-green-500 shadow-lg"
        />

        {/* Position */}
        <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
          {position}
        </h3>

        {/* Name */}
        <p className="mt-2 text-md text-gray-700 dark:text-gray-300">
          {name}
        </p>

        {/* Email */}
        <a
          href={`mailto:${email}`}
          className="mt-2 text-sm text-green-500 dark:text-green-400 hover:underline"
        >
          {email}
        </a>

        {/* Contact */}
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          {contact}
        </p>
      </div>
    </div>
  );
};

export default ContactPersonCard;
