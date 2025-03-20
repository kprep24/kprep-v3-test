import React, { useState } from "react";

interface FeedbackModalProps {
  rating: number;
  onClose: () => void;
}

const FeedbackModal = ({ rating, onClose }: FeedbackModalProps) => {
  const [name, setName] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    // Handle form submission logic here
    console.log({ name, rollNumber, message, rating });
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white bg-opacity-30 backdrop-blur-md p-6 rounded-lg shadow-lg w-80 sm:w-96">
        <h2 className="text-2xl font-semibold mb-4">Feedback</h2>
        <p className="text-gray-600 mb-4">Rating: {rating} stars</p>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="text"
          placeholder="Roll Number"
          value={rollNumber}
          onChange={(e) => setRollNumber(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <textarea
          placeholder="Message/Feedback"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="mr-2 px-4 py-2 border-2 border-black rounded-full text-black hover:bg-black hover:text-white transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 border-2 border-black rounded-full text-black hover:bg-black hover:text-white transition-all"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;
