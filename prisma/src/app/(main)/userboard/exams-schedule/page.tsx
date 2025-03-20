'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';

const PdfLinks = [
  { name: 'A Scheme', link: '/examschedule2nd.pdf' },
  { name: 'B Scheme', link: '/examschedule2nd.pdf' },
  { name: '4th Sem', link: '/examschedule4th.pdf' },
  { name: '6th Sem', link: '/examschedule4th.pdf' }
];

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-6 text-gray-900 dark:text-gray-100">
      {/* Heading */}
      <motion.h1 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-bold text-center mb-4"
      >
        🔥 Level Up Your Studies!
      </motion.h1>
      
      {/* Description */}
      <motion.p 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 0.7 }}
        className="text-center text-lg max-w-lg mb-6 text-gray-600 dark:text-gray-300"
      >
        Download the latest syllabus and study materials to stay ahead in your game. Select your scheme and semester below!
      </motion.p>

      {/* PDF Buttons */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {PdfLinks.map((pdf, index) => (
          <Button
            key={index}
            asChild
            variant="outline"
            className="px-6 py-3 text-lg font-medium flex items-center gap-2 border-gray-500 hover:bg-gray-200 dark:hover:bg-gray-800 transition-all"
          >
            <a href={pdf.link} target="_blank" rel="noopener noreferrer">
              <FileText size={18} /> {pdf.name}
            </a>
          </Button>
        ))}
      </motion.div>
    </div>
  );
}
