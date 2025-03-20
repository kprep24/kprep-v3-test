"use client";

import React, { useState } from "react";

const syllabusData = [
  {
    department: "Computer Science and Engineering",
    semesters: [
      {
        semester: "Semester III",
        theory: [
          { code: "EX20003", title: "Scientific & Technical Writing OR HASS Elective-II", L: 2, T: 0, P: 0, credit: 2 },
          { code: "MA21001", title: "Probability and Statistics", L: 3, T: 1, P: 0, credit: 4 },
          { code: "EX20001", title: "Industry 4.0 Technologies", L: 3, T: 0, P: 0, credit: 3 },
          { code: "CS21001", title: "Data Structures", L: 3, T: 0, P: 0, credit: 3 },
          { code: "EC20005", title: "Digital Systems Design", L: 3, T: 0, P: 0, credit: 3 },
          { code: "CS21003", title: "Automata Theory and Formal Languages", L: 3, T: 1, P: 0, credit: 4 },
        ],
        practical: [
          { code: "CS29001", title: "Data Structures Laboratory", L: 0, T: 0, P: 2, credit: 1 },
          { code: "EC29005", title: "Digital Systems Design Laboratory", L: 0, T: 0, P: 2, credit: 1 },
        ],
      },
      {
        semester: "Semester IV",
        theory: [
          { code: "EX20003", title: "Scientific and Technical Writing OR HASS Elective-II", L: 2, T: 0, P: 0, credit: 2 },
          { code: "MA21002", title: "Discrete Structures", L: 3, T: 1, P: 0, credit: 4 },
          { code: "CS20002", title: "Operating Systems", L: 3, T: 0, P: 0, credit: 3 },
          { code: "CS20004", title: "Object-Oriented Programming using Java", L: 3, T: 0, P: 0, credit: 3 },
          { code: "CS20006", title: "Database Management Systems", L: 3, T: 0, P: 0, credit: 3 },
          { code: "CS21002", title: "Computer Organization and Architecture", L: 3, T: 0, P: 0, credit: 3 },
        ],
        practical: [
          { code: "CS29002", title: "Operating Systems Laboratory", L: 0, T: 0, P: 2, credit: 1 },
          { code: "CS29004", title: "Java Programming Laboratory", L: 0, T: 0, P: 2, credit: 1 },
          { code: "CS29006", title: "Database Management Systems Laboratory", L: 0, T: 0, P: 2, credit: 1 },
        ],
      },
      {
        semester: "Semester V",
        theory: [
          { code: "HS30101", title: "Engineering Economics", L: 3, T: 0, P: 0, credit: 3 },
          { code: "CS30001", title: "Design and Analysis of Algorithms", L: 3, T: 0, P: 0, credit: 3 },
          { code: "CS31001", title: "Software Engineering", L: 3, T: 0, P: 0, credit: 3 },
          { code: "CS30003", title: "Computer Networks", L: 3, T: 0, P: 0, credit: 3 },
          { code: "PE1", title: "Professional Elective-I", L: 3, T: 0, P: 0, credit: 3 },
          { code: "PE2", title: "Professional Elective-II", L: 3, T: 0, P: 0, credit: 3 },
        ],
        practical: [
          { code: "CS39001", title: "Algorithms Laboratory", L: 0, T: 0, P: 2, credit: 1 },
          { code: "CS39003", title: "Computer Networks Laboratory", L: 0, T: 0, P: 2, credit: 1 },
          { code: "KE1", title: "K-Explore Open Elective-I", L: 0, T: 0, P: 2, credit: 1 },
        ],
      },
      {
        semester: "Semester VI",
        theory: [
          { code: "HASS3", title: "HASS Elective-III", L: 3, T: 0, P: 0, credit: 3 },
          { code: "CS31002", title: "Machine Learning", L: 3, T: 0, P: 0, credit: 3 },
          { code: "CS30002", title: "Artificial Intelligence", L: 3, T: 0, P: 0, credit: 3 },
          { code: "PE3", title: "Professional Elective-III", L: 3, T: 0, P: 0, credit: 3 },
          { code: "OE2", title: "Open Elective-II/MI-I", L: 3, T: 0, P: 0, credit: 3 },
          { code: "HS30401", title: "Universal Human Values", L: 3, T: 0, P: 0, credit: 3 },
        ],
        practical: [
          { code: "CS39002", title: "Machine Learning Laboratory", L: 0, T: 0, P: 2, credit: 1 },
          { code: "CS39004", title: "Artificial Intelligence Laboratory", L: 0, T: 0, P: 2, credit: 1 },
          { code: "KE30002", title: "K-Explore Open Elective-II", L: 0, T: 0, P: 2, credit: 1 },
        ],
      },
    ],
  },
  {
    department: "Information Technology",
    semesters: [
      {
        semester: "Semester III",
        theory: [
          { code: "EX20003", title: "Scientific and Technical Writing", L: 2, T: 0, P: 0, credit: 2 },
          { code: "MA21001", title: "Probability & Statistics", L: 3, T: 1, P: 0, credit: 4 },
          { code: "CS21001", title: "Data Structures", L: 3, T: 1, P: 0, credit: 4 },
          { code: "EC20008", title: "Communication Engineering", L: 3, T: 0, P: 0, credit: 3 },
          { code: "CS20004", title: "Object Oriented Programming using Java", L: 3, T: 0, P: 0, credit: 3 },
          { code: "CS21002", title: "Computer Organization and Architecture", L: 3, T: 1, P: 0, credit: 4 },
        ],
        practical: [
          { code: "CS29001", title: "Data Structures Laboratory", L: 0, T: 0, P: 2, credit: 1 },
          { code: "EC29002", title: "Communication Engineering Laboratory", L: 0, T: 0, P: 2, credit: 1 },
          { code: "CS29004", title: "Java Programming Laboratory", L: 0, T: 0, P: 2, credit: 1 },
        ],
      },
      {
        semester: "Semester IV",
        theory: [
          { code: "HS30101", title: "Engineering Economics", L: 3, T: 0, P: 0, credit: 3 },
          { code: "MA21002", title: "Discrete Structures", L: 3, T: 1, P: 0, credit: 4 },
          { code: "EX20001", title: "Industry 4.0 Technologies", L: 2, T: 0, P: 0, credit: 2 },
          { code: "CS20002", title: "Operating Systems", L: 3, T: 0, P: 0, credit: 3 },
          { code: "CS20006", title: "Database Management Systems", L: 3, T: 0, P: 0, credit: 3 },
          { code: "CS20008", title: "Information Theory and Coding", L: 3, T: 0, P: 0, credit: 3 },
        ],
        practical: [
          { code: "CS29002", title: "Operating Systems Laboratory", L: 0, T: 0, P: 2, credit: 1 },
          { code: "CS29004", title: "Database Management Systems Laboratory", L: 0, T: 0, P: 2, credit: 1 },
          { code: "CS28001", title: "Vocational Electives", L: 0, T: 0, P: 2, credit: 1 },
        ],
      },
      {
        semester: "Semester V",
        theory: [
          { code: "HASS2", title: "HASS Elective-II", L: 3, T: 0, P: 0, credit: 3 },
          { code: "CS30001", title: "Design and Analysis of Algorithms", L: 3, T: 0, P: 0, credit: 3 },
          { code: "CS31001", title: "Software Engineering", L: 3, T: 1, P: 0, credit: 4 },
          { code: "CS30003", title: "Computer Networks", L: 3, T: 0, P: 0, credit: 3 },
          { code: "PE1", title: "Professional Elective-I", L: 3, T: 0, P: 0, credit: 3 },
          { code: "PE2", title: "Professional Elective-II", L: 3, T: 0, P: 0, credit: 3 },
        ],
        practical: [
          { code: "CS39001", title: "Algorithms Laboratory", L: 0, T: 0, P: 2, credit: 1 },
          { code: "CS39003", title: "Computer Networks Laboratory", L: 0, T: 0, P: 2, credit: 1 },
          { code: "KE1", title: "K-Explore Open Elective-I", L: 0, T: 0, P: 2, credit: 1 },
        ],
      },
      {
        semester: "Semester VI",
        theory: [
          { code: "HASS3", title: "HASS Elective-III", L: 3, T: 0, P: 0, credit: 3 },
          { code: "CS31002", title: "Machine Learning", L: 3, T: 1, P: 0, credit: 4 },
          { code: "CS30004", title: "Data Science and Analytics", L: 3, T: 0, P: 0, credit: 3 },
          { code: "PE3", title: "Professional Elective-III", L: 3, T: 0, P: 0, credit: 3 },
          { code: "OE2", title: "Open Elective-II/MI-I", L: 3, T: 0, P: 0, credit: 3 },
          { code: "HS30401", title: "Universal Human Values", L: 3, T: 0, P: 0, credit: 3 },
        ],
        practical: [
          { code: "CS39004", title: "Data Analytics Laboratory", L: 0, T: 0, P: 2, credit: 1 },
          { code: "CS39006", title: "Advance Programming Laboratory", L: 2, T: 0, P: 0, credit: 2 },
          { code: "CS37001", title: "Mini Project", L: 0, T: 0, P: 4, credit: 2 },
        ],
      },
    ],
  },
  {
    department: "Computer Science and Communication Engineering",
    semesters: [
      {
        semester: "Semester III",
        theory: [
          { code: "EX20003", title: "Scientific and Technical Writing", L: 2, T: 0, P: 0, credit: 2 },
          { code: "MA21001", title: "Probability & Statistics", L: 3, T: 1, P: 0, credit: 4 },
          { code: "EX20001", title: "Industry 4.0 Technologies", L: 2, T: 0, P: 0, credit: 2 },
          { code: "CS21001", title: "Data Structures", L: 3, T: 1, P: 0, credit: 4 },
          { code: "EC20005", title: "Digital Systems Design", L: 3, T: 0, P: 0, credit: 3 },
          { code: "EC20008", title: "Communication Engineering", L: 3, T: 0, P: 0, credit: 3 },
        ],
        practical: [
          { code: "CS29001", title: "Data Structures Laboratory", L: 0, T: 0, P: 2, credit: 1 },
          { code: "EC29005", title: "Digital Systems Design Laboratory", L: 0, T: 0, P: 2, credit: 1 },
          { code: "EC29002", title: "Communication Engineering Laboratory", L: 0, T: 0, P: 2, credit: 1 },
        ],
      },
      {
        semester: "Semester IV",
        theory: [
          { code: "HS30101", title: "Engineering Economics", L: 3, T: 0, P: 0, credit: 3 },
          { code: "MA21002", title: "Discrete Structures", L: 3, T: 1, P: 0, credit: 4 },
          { code: "CS20002", title: "Operating Systems", L: 3, T: 0, P: 0, credit: 3 },
          { code: "CS20006", title: "Database Management Systems", L: 3, T: 0, P: 0, credit: 3 },
          { code: "CS20004", title: "Object Oriented Programming using Java", L: 3, T: 0, P: 0, credit: 3 },
          { code: "CS20010", title: "Information Security", L: 3, T: 0, P: 0, credit: 3 },
        ],
        practical: [
          { code: "CS29002", title: "Operating Systems Laboratory", L: 0, T: 0, P: 2, credit: 1 },
          { code: "CS29006", title: "Database Management Systems Laboratory", L: 0, T: 0, P: 2, credit: 1 },
          { code: "CS29004", title: "Java Programming Laboratory", L: 0, T: 0, P: 2, credit: 1 },
          { code: "CS28001", title: "Vocational Electives", L: 0, T: 0, P: 2, credit: 1 },
        ],
      },
      {
        semester: "Semester V",
        theory: [
          { code: "HASS2", title: "HASS Elective-II", L: 3, T: 0, P: 0, credit: 3 },
          { code: "CS30001", title: "Design and Analysis of Algorithms", L: 3, T: 0, P: 0, credit: 3 },
          { code: "CS31001", title: "Software Engineering", L: 3, T: 1, P: 0, credit: 4 },
          { code: "CS30003", title: "Computer Networks", L: 3, T: 0, P: 0, credit: 3 },
          { code: "PE1", title: "Professional Elective-I", L: 3, T: 0, P: 0, credit: 3 },
          { code: "PE2", title: "Professional Elective-II", L: 3, T: 0, P: 0, credit: 3 },
        ],
        practical: [
          { code: "CS39001", title: "Algorithms Laboratory", L: 0, T: 0, P: 2, credit: 1 },
          { code: "CS39003", title: "Computer Networks Laboratory", L: 0, T: 0, P: 2, credit: 1 },
          { code: "KE1", title: "K-Explore Open Elective-I", L: 0, T: 0, P: 2, credit: 1 },
        ],
      },
      {
        semester: "Semester VI",
        theory: [
          { code: "HASS3", title: "HASS Elective-III", L: 3, T: 0, P: 0, credit: 3 },
          { code: "CS30010", title: "Cloud Computing", L: 3, T: 0, P: 0, credit: 3 },
          { code: "EC30002", title: "Wireless Mobile Communication", L: 3, T: 0, P: 0, credit: 3 },
          { code: "PE3", title: "Professional Elective-III", L: 3, T: 0, P: 0, credit: 3 },
          { code: "OE2", title: "Open Elective-II/MI-I", L: 3, T: 0, P: 0, credit: 3 },
          { code: "HS30401", title: "Universal Human Values", L: 3, T: 0, P: 0, credit: 3 },
        ],
        practical: [
          { code: "EC39002", title: "Wireless Communication & Networking Lab", L: 0, T: 0, P: 2, credit: 1 },
          { code: "CS39006", title: "Advance Programming Laboratory", L: 2, T: 0, P: 0, credit: 2 },
          { code: "CS37001", title: "Mini Project", L: 0, T: 0, P: 4, credit: 2 },
        ],
      },
    ],
  },
  {
    department: "Computer Science and System Engineering",
    semesters: [
      {
        semester: "Semester III",
        theory: [
          { code: "EX20003", title: "Scientific and Technical Writing", L: 2, T: 0, P: 0, credit: 2 },
          { code: "MA21001", title: "Probability & Statistics", L: 3, T: 1, P: 0, credit: 4 },
          { code: "CS21001", title: "Data Structures", L: 3, T: 1, P: 0, credit: 4 },
          { code: "EC20005", title: "Digital Systems Design", L: 3, T: 0, P: 0, credit: 3 },
          { code: "CS20004", title: "Object Oriented Programming using Java", L: 3, T: 0, P: 0, credit: 3 },
          { code: "CS21002", title: "Computer Organization and Architecture", L: 3, T: 1, P: 0, credit: 4 },
        ],
        practical: [
          { code: "CS29001", title: "Data Structures Laboratory", L: 0, T: 0, P: 2, credit: 1 },
          { code: "EC29005", title: "Digital Systems Design Laboratory", L: 0, T: 0, P: 2, credit: 1 },
          { code: "CS29004", title: "Java Programming Laboratory", L: 0, T: 0, P: 2, credit: 1 },
        ],
      },
      {
        semester: "Semester IV",
        theory: [
          { code: "HS30101", title: "Engineering Economics", L: 3, T: 0, P: 0, credit: 3 },
          { code: "MA21002", title: "Discrete Structures", L: 3, T: 1, P: 0, credit: 4 },
          { code: "EX20001", title: "Industry 4.0 Technologies", L: 2, T: 0, P: 0, credit: 2 },
          { code: "CS20002", title: "Operating Systems", L: 3, T: 0, P: 0, credit: 3 },
          { code: "CS20006", title: "Database Management Systems", L: 3, T: 0, P: 0, credit: 3 },
          { code: "EC20006", title: "Principle of Signals & Systems", L: 3, T: 1, P: 0, credit: 4 },
        ],
        practical: [
          { code: "CS29002", title: "Operating Systems Laboratory", L: 0, T: 0, P: 2, credit: 1 },
          { code: "CS29004", title: "Database Management Systems Laboratory", L: 0, T: 0, P: 2, credit: 1 },
          { code: "CS28001", title: "Vocational Electives", L: 0, T: 0, P: 2, credit: 1 },
        ],
      },
      {
        semester: "Semester V",
        theory: [
          { code: "HASS2", title: "HASS Elective-II", L: 3, T: 0, P: 0, credit: 3 },
          { code: "CS30001", title: "Design and Analysis of Algorithms", L: 3, T: 0, P: 0, credit: 3 },
          { code: "CS31001", title: "Software Engineering", L: 3, T: 1, P: 0, credit: 4 },
          { code: "CS30003", title: "Computer Networks", L: 3, T: 0, P: 0, credit: 3 },
          { code: "PE1", title: "Professional Elective-I", L: 3, T: 0, P: 0, credit: 3 },
          { code: "PE2", title: "Professional Elective-II", L: 3, T: 0, P: 0, credit: 3 },
        ],
        practical: [
          { code: "CS39001", title: "Algorithms Laboratory", L: 0, T: 0, P: 2, credit: 1 },
          { code: "CS39003", title: "Computer Networks Laboratory", L: 0, T: 0, P: 2, credit: 1 },
          { code: "KE1", title: "K-Explore Open Elective-I", L: 0, T: 0, P: 2, credit: 1 },
        ],
      },
      {
        semester: "Semester VI",
        theory: [
          { code: "HASS3", title: "HASS Elective-III", L: 3, T: 0, P: 0, credit: 3 },
          { code: "CS30006", title: "Compilers", L: 3, T: 0, P: 0, credit: 3 },
          { code: "EC30007", title: "ARM and Advanced Microprocessors", L: 3, T: 0, P: 0, credit: 3 },
          { code: "PE3", title: "Professional Elective-III", L: 3, T: 0, P: 0, credit: 3 },
          { code: "OE2", title: "Open Elective-II/MI-I", L: 3, T: 0, P: 0, credit: 3 },
          { code: "HS30401", title: "Universal Human Values", L: 3, T: 0, P: 0, credit: 3 },
        ],
        practical: [
          { code: "EC39006", title: "ARM Laboratory", L: 0, T: 0, P: 2, credit: 1 },
          { code: "CS39006", title: "Advance Programming Laboratory", L: 2, T: 0, P: 0, credit: 2 },
          { code: "CS37001", title: "Mini Project", L: 0, T: 0, P: 4, credit: 2 },
        ],
      },
    ],
  },
];

const commonSemesters = [
  {
    semester: "Semester I",
    theory: [
      { code: "PH10001", title: "Physics", L: 3, T: 0, P: 0, credit: 3 },
      { code: "MA11001", title: "Differential Equations and Linear Algebra", L: 3, T: 1, P: 0, credit: 4 },
      { code: "Science Elective", title: "Science Elective", L: 2, T: 0, P: 0, credit: 2 },
      { code: "Engineering Elective II", title: "Engineering Elective II", L: 2, T: 0, P: 0, credit: 2 },
      { code: "LS10001", title: "Science of Living Systems", L: 2, T: 0, P: 0, credit: 2 },
      { code: "CH10003", title: "Environmental Science", L: 2, T: 0, P: 0, credit: 2 },
    ],
    practical: [
      { code: "PH19001", title: "Physics Lab", L: 0, T: 0, P: 2, credit: 1 },
      { code: "CS13001", title: "Programming Lab", L: 0, T: 2, P: 4, credit: 4 },
    ],
    sessional: [
      { code: "CE18001", title: "Engineering Drawing & Graphics", L: 0, T: 0, P: 2, credit: 1 },
    ],
  },
  {
    semester: "Semester II",
    theory: [
      { code: "CH10001", title: "Chemistry", L: 3, T: 0, P: 0, credit: 3 },
      { code: "MA11002", title: "Transform Calculus and Numerical Analysis", L: 3, T: 1, P: 0, credit: 4 },
      { code: "HS10001", title: "English", L: 2, T: 0, P: 0, credit: 2 },
      { code: "EC10001", title: "Basic Electronics", L: 2, T: 0, P: 0, credit: 2 },
      { code: "Engineering Elective I", title: "Engineering Elective I", L: 2, T: 0, P: 0, credit: 2 },
      { code: "HASS Elective I", title: "HASS Elective I", L: 2, T: 0, P: 0, credit: 2 },
    ],
    practical: [
      { code: "CH19001", title: "Chemistry Lab", L: 0, T: 0, P: 2, credit: 1 },
      { code: "EX19001", title: "Engineering Lab", L: 0, T: 0, P: 2, credit: 1 },
    ],
    sessional: [
      { code: "ME18001", title: "Workshop", L: 0, T: 0, P: 2, credit: 1 },
      { code: "YG18001", title: "Yoga", L: 0, T: 0, P: 2, credit: 1 },
      { code: "HS18001", title: "Communication Lab", L: 0, T: 0, P: 2, credit: 1 },
    ],
  },
];

const Syllabus = () => {
  const [selectedDepartment, setSelectedDepartment] = useState("Computer Science and Engineering");
  const [selectedCourseType, setSelectedCourseType] = useState("All");
  const [selectedSemester, setSelectedSemester] = useState("All");

  const handleDepartmentChange = (event:any) => {
    setSelectedDepartment(event.target.value);
  };

  const handleCourseTypeChange = (event:any) => {
    setSelectedCourseType(event.target.value);
  };

  const handleSemesterChange = (event:any) => {
    setSelectedSemester(event.target.value);
  };

  const filteredSyllabusData = syllabusData.filter(
    (department) => department.department === selectedDepartment
  );

  return (
    <div className="p-6 text-black dark:text-white">
      <h1 className="text-4xl font-extrabold text-start text-black dark:text-white mb-8">Course Structure</h1>

      <div className="sticky top-16 bg-gray-100 dark:bg-gray-900 z-10 p-4 mb-6 rounded-md">
        <div className="flex flex-col md:flex-row justify-start items-center space-y-4 md:space-y-0 md:space-x-4">
          <select
           
            value={selectedDepartment}
            onChange={handleDepartmentChange}
            className="p-2 border border-gray-300 rounded-md bg-white dark:bg-gray-800 dark:text-white"
          >
            <option value="Computer Science and Engineering">Computer Science and Engineering</option>
            <option value="Information Technology">Information Technology</option>
            <option value="Computer Science and Communication Engineering">Computer Science and Communication Engineering</option>
            <option value="Computer Science and System Engineering">Computer Science and System Engineering</option>
          </select>

          <select
            value={selectedSemester}
            onChange={handleSemesterChange}
            className="p-2 border border-gray-300 rounded-md bg-white dark:bg-gray-800 dark:text-white"
          >
            <option value="All">All Semesters</option>
            <option value="Semester I">Semester I</option>
            <option value="Semester II">Semester II</option>
            <option value="Semester III">Semester III</option>
            <option value="Semester IV">Semester IV</option>
            <option value="Semester V">Semester V</option>
            <option value="Semester VI">Semester VI</option>
          </select>

          <select
            value={selectedCourseType}
            onChange={handleCourseTypeChange}
            className="p-2 border border-gray-300 rounded-md bg-white dark:bg-gray-800 dark:text-white"
          >
            <option value="All">All</option>
            <option value="Theory">Theory</option>
            <option value="Practical">Practical</option>
             <option value="Sessional">Sessional</option>
          </select>
        </div>
      </div>

      {commonSemesters
        .filter((semester) => selectedSemester === "All" || semester.semester === selectedSemester)
        .map((semester, semIndex) => (
          <div key={semIndex} className="mb-12 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">{semester.semester}</h2>

            {(selectedCourseType === "All" || selectedCourseType === "Theory") && (
              <>
                <h3 className="text-xl font-semibold text-blue-500 dark:text-blue-400 mb-3">📖 Theory</h3>
                <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                  <thead className="bg-gray-200 dark:bg-gray-600">
                    <tr>
                      <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-600 text-left">Code</th>
                      <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-600 text-left">Title</th>
                      <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-600 text-left">Credits</th>
                    </tr>
                  </thead>
                  <tbody>
                    {semester.theory.map((course, idx) => (
                      <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-600">{course.code}</td>
                        <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-600">{course.title}</td>
                        <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-600">
                          <span className="bg-blue-100 dark:bg-blue-600 text-blue-600 dark:text-white px-3 py-1 rounded-full font-semibold">
                            {course.credit} Credits
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}

            {(selectedCourseType === "All" || selectedCourseType === "Practical") && semester.practical.length > 0 && (
              <>
                <h3 className="text-xl font-semibold text-green-500 dark:text-green-400 mt-6 mb-3">🔬 Practical</h3>
                <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                  <thead className="bg-gray-200 dark:bg-gray-600">
                    <tr>
                      <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-600 text-left">Code</th>
                      <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-600 text-left">Title</th>
                      <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-600 text-left">Credits</th>
                    </tr>
                  </thead>
                  <tbody>
                    {semester.practical.map((course, idx) => (
                      <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-600">{course.code}</td>
                        <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-600">{course.title}</td>
                        <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-600">
                          <span className="bg-green-100 dark:bg-green-600 text-green-600 dark:text-white px-3 py-1 rounded-full font-semibold">
                            {course.credit} Credits
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}

{(selectedCourseType === "All" || selectedCourseType === "Sessional") && semester.sessional.length > 0 && (
              <>
                <h3 className="text-xl font-semibold text-purple-500 dark:text-purple-400 mt-6 mb-3">🛠️ Sessional</h3>
                <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                  <thead className="bg-gray-200 dark:bg-gray-600">
                    <tr>
                      <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-600 text-left">Code</th>
                      <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-600 text-left">Title</th>
                      <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-600 text-left">Credits</th>
                    </tr>
                  </thead>
                  <tbody>
                    {semester.sessional.map((course, idx) => (
                      <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-600">{course.code}</td>
                        <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-600">{course.title}</td>
                        <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-600">
                          <span className="bg-purple-100 dark:bg-purple-600 text-purple-600 dark:text-white px-3 py-1 rounded-full font-semibold">
                            {course.credit} Credits
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
          </div>
        ))}

      {filteredSyllabusData.map((department, deptIndex) => (
        <div key={deptIndex}>
          {/* <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-200 mb-6">{department.department}</h2> */}
          {department.semesters
            .filter((semester) => selectedSemester === "All" || semester.semester === selectedSemester)
            .map((semester, semIndex) => (
              <div key={semIndex} className="mb-12 rounded-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">{semester.semester}</h2>

                {(selectedCourseType === "All" || selectedCourseType === "Theory") && (
                  <>
                    <h3 className="text-xl font-semibold text-blue-500 dark:text-blue-400 mb-3">📖 Theory</h3>
                    <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                      <thead className="bg-gray-200 dark:bg-gray-600">
                        <tr>
                          <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-600 text-left">Code</th>
                          <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-600 text-left">Title</th>
                          <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-600 text-left">Credits</th>
                        </tr>
                      </thead>
                      <tbody>
                        {semester.theory.map((course, idx) => (
                          <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                            <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-600">{course.code}</td>
                            <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-600">{course.title}</td>
                            <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-600">
                              <span className="bg-blue-100 dark:bg-blue-600 text-blue-600 dark:text-white px-3 py-1 rounded-full font-semibold">
                                {course.credit} Credits
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </>
                )}

                {(selectedCourseType === "All" || selectedCourseType === "Practical") && semester.practical.length > 0 && (
                  <>
                    <h3 className="text-xl font-semibold text-green-500 dark:text-green-400 mt-6 mb-3">🔬 Practical</h3>
                    <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                      <thead className="bg-gray-200 dark:bg-gray-600">
                        <tr>
                          <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-600 text-left">Code</th>
                          <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-600 text-left">Title</th>
                          <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-600 text-left">Credits</th>
                        </tr>
                      </thead>
                      <tbody>
                        {semester.practical.map((course, idx) => (
                          <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                            <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-600">{course.code}</td>
                            <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-600">{course.title}</td>
                            <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-600">
                              <span className="bg-green-100 dark:bg-green-600 text-green-600 dark:text-white px-3 py-1 rounded-full font-semibold">
                                {course.credit} Credits
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </>
                )}
              </div>
            ))}
        </div>
      ))}
    </div>
  );
};

export default Syllabus;
