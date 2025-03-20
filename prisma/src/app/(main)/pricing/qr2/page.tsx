'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Navbar from '@/components/landingPage/Navbar';
import Footer from '@/components/landingPage/Footer';

export default function QRPage() {
  const [rollNumber, setRollNumber] = useState('');

  const sendWhatsApp = () => {
    if (!rollNumber) return alert('Please enter your KIIT Roll Number');
    const phoneNumber = '+919641208005'; // Change this to the desired number
    const message = encodeURIComponent(`My KIIT Roll Number: ${rollNumber}. Here is my screenshot for K-Prep.`);
    const url = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(url, '_blank');
  };

  return (
    <>
        <Navbar/>

    <div className="flex min-h-screen items-center justify-center  dark:bg-gray-900 p-6">
      <div
        id="qr-section"
        className="max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 text-center transition duration-300"
      >
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4">Join K-Prep 🚀</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-4 text-lg">
          The ultimate hub for KIIT students 📚. Get notes, past papers & exam hacks. Scan the QR & dive in! 🔥
        </p>
        <div className="flex justify-center mb-4">
          <Image
            src="/qr2.jpg"
            alt="K-Prep QR Code"
            width={200}
            height={200}
            className="rounded-lg border dark:border-gray-700 shadow-md hover:scale-105 transition-transform"
          />
        </div>
        <div className="mt-4">
          <Input
            type="text"
            placeholder="Enter your KIIT Roll Number"
            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={rollNumber}
            onChange={(e) => setRollNumber(e.target.value)}
          />
        </div>
        <Button
          className="w-full mt-4 bg-green-500 hover:bg-green-600 dark:bg-green-400 dark:hover:bg-green-500 text-lg font-semibold"
          onClick={sendWhatsApp}
        >
          Send Screenshot via WhatsApp 📩
        </Button>
      </div>
    </div>
    <Footer/>


    </>
  );
}
