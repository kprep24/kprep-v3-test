"use client";
import React, { useState } from "react";
import facultyList from "@/components/UserDashboard/faculty-details/faculty-details-data";
import FacultyCard from "@/components/UserDashboard/faculty-details/faculty-details-card";
import ContactPersonCard from "@/components/UserDashboard/faculty-details/contact-person-card";

const FacultyList = () => {
  const [selectedDept, setSelectedDept] = useState<string>("Computer Science and Engineering");
  const [view, setView] = useState<string>("ALL");

  return (
    <div className="min-h-screen p-6 flex w-full flex-col ">
      {/* Page Heading */}
      <h1 className="lg:text-4xl text-3xl text-center sm:text-start font-bold mb-8">Faculty Details</h1>
      
      {/* Dropdown Filter */}
      <div className="mb-6">
        <select
          title="Select Department"
          value={selectedDept}
          onChange={(e) => setSelectedDept(e.target.value)}
          className="px-4 py-2 bg-white dark:bg-gray-800 border rounded-md shadow-md focus:ring focus:ring-blue-300 dark:focus:ring-blue-600"
        >
          {facultyList.map((dept, index) => (
            <option key={index} value={dept.department}>{dept.department}</option>
          ))}
        </select>
      </div>

      {/* View Navigation */}
      <div className="mb-6 flex justify-center space-x-4">
        <button onClick={() => setView("ALL")} className={`px-4 py-2 ${view === "ALL" ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"} rounded-md`}>ALL</button>
        <button onClick={() => setView("CONTACT_PERSON")} className={`px-4 py-2 ${view === "CONTACT_PERSON" ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"} rounded-md`}>Contact Person</button>
        <button onClick={() => setView("FACULTY")} className={`px-4 py-2 ${view === "FACULTY" ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"} rounded-md`}>Faculty</button>
      </div>

      {/* Content */}
      {view === "ALL" && (
        <>
          {/* Contact Persons */}
          <div className="mb-6">
            {/* <h2 className="text-2xl font-bold mb-4">Contact Persons</h2> */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {facultyList.find(dept => dept.department === selectedDept)?.contactPersons.map((person, index) => (
                <ContactPersonCard
                  key={index}
                  position={person.position}
                  name={person.name}
                  email={person.email}
                  contact={person.contact}
                />
              ))}
            </div>
          </div>

          {/* Faculty Grid */}
          <div className=" w-full flex flex-col items-center ">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {facultyList.find(dept => dept.department === selectedDept)?.faculty.map((faculty, index) => (
                <FacultyCard key={index} name={faculty.name} email={faculty.email} />
              ))}
            </div>
          </div>
        </>
      )}

      {view === "CONTACT_PERSON" && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">Contact Persons</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {facultyList.find(dept => dept.department === selectedDept)?.contactPersons.map((person, index) => (
              <ContactPersonCard
                key={index}
                position={person.position}
                name={person.name}
                email={person.email}
                contact={person.contact}
              />
            ))}
          </div>
        </div>
      )}

      {view === "FACULTY" && (
        <div className=" w-full flex flex-col items-center ">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {facultyList.find(dept => dept.department === selectedDept)?.faculty.map((faculty, index) => (
              <FacultyCard key={index} name={faculty.name} email={faculty.email} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FacultyList;
