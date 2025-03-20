"use client"
import React, { useState, ChangeEvent } from "react";
import { FaTrash, FaBullseye, FaStar, FaChartLine, FaDumbbell, FaExclamationCircle } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Course {
    subject: string;
    credits: number;
    marks: string;
}

const marksOptions: string[] = [
    "90 - 100",
    "80 - 89",
    "70 - 79",
    "60 - 69",
    "50 - 59",
    "40 - 49",
    "Below 40",
];

const semesterWiseCredits: { [key: number]: Course[] } = {
    1: [
        { subject: "Math(DE & LA)", credits: 4, marks: "" },
        { subject: "Physics", credits: 3, marks: "" },
        { subject: "Science Elective ", credits: 2, marks: "" },
        { subject: "Engineering Elective", credits: 2, marks: "" },
        { subject: "Science of Living Systems", credits: 2, marks: "" },
        { subject: "Environmental Science", credits: 2, marks: "" },
        { subject: "Physics Lab", credits: 1, marks: "" },
        { subject: "Programming Lab ", credits: 4, marks: "" },
        { subject: "Engineering Drawing & Graphics", credits: 1, marks: "" },
    ],
    2: [
        { subject: "Chemistry", credits: 3, marks: "" },
        { subject: "Math(T & NA)", credits: 4, marks: "" },
        { subject: "English", credits: 2, marks: "" },
        { subject: "Basic Electronics", credits: 2, marks: "" },
        { subject: "Basic Electrical Engineering ", credits: 2, marks: "" },
        { subject: "HASS Elective I", credits: 2, marks: "" },
        { subject: "Chemistry Lab", credits: 1, marks: "" },
        { subject: "Engineering Lab(BEE) ", credits: 1, marks: "" },
        { subject: "Workshop", credits: 1, marks: "" },
        { subject: "Sports & Yoga", credits: 1, marks: "" },
        { subject: "Communication Lab", credits: 1, marks: "" },
    ],
    3: [
        { subject: "Scientific and Technical Writing", credits: 2, marks: "" },
        { subject: "Probability and Statistics", credits: 4, marks: "" },
        { subject: "Industry 4.0 Technologies", credits: 2, marks: "" },
        { subject: "Data Structures", credits: 4, marks: "" },
        { subject: "Digital Systems Design", credits: 3, marks: "" },
        { subject: "Automata Theory and Formal Languages", credits: 4, marks: "" },
        { subject: "Data Structures Lab", credits: 1, marks: "" },
        { subject: "Digital Systems Design Lab", credits: 1, marks: "" },
    ],
    4: [
        { subject: "HASS Elective II", credits: 2, marks: "" },
        { subject: "Discrete Mathematics", credits: 4, marks: "" },
        { subject: "Operating Systems", credits: 3, marks: "" },
        { subject: "Object Oriented Programming using Java", credits: 3, marks: "" },
        { subject: "Database Management Systems", credits: 3, marks: "" },
        { subject: "Computer Organization and Architecture", credits: 4, marks: "" },
        { subject: "Operating Systems Lab", credits: 1, marks: "" },
        { subject: "Object Oriented Programming using Java Lab", credits: 1, marks: "" },
        { subject: "Database Management Systems Lab", credits: 1, marks: "" },
        { subject: "Vocational Electives", credits: 1, marks: "" },
    ],
    5: [
        { subject: "Engineering Economics & Costing", credits: 3, marks: "" },
        { subject: "Design and Analysis of Algorithms", credits: 3, marks: "" },
        { subject: "Software Engineering", credits: 4, marks: "" },
        { subject: "Computer Networks", credits: 3, marks: "" },
        { subject: "Professional Elective-I", credits: 3, marks: "" },
        { subject: "Professional Elective-II", credits: 3, marks: "" },
        { subject: "Algorithms Laboratory", credits: 1, marks: "" },
        { subject: "Computer Networks Laboratory", credits: 1, marks: "" },
        { subject: "K-Explore Open Elective-I", credits: 1, marks: "" },
    ],
    6: [
        { subject: "HASS Elective-III", credits: 3, marks: "" },
        { subject: "Machine Learning", credits: 4, marks: "" },
        { subject: "Artificial Intelligence", credits: 3, marks: "" },
        { subject: "Professional Elective-III", credits: 3, marks: "" },
        { subject: "Open Elective-II/MI-1", credits: 3, marks: "" },
        { subject: "Universal Human Values", credits: 3, marks: "" },
        { subject: "Artificial Intelligence Laboratory", credits: 1, marks: "" },
        { subject: "Applications Development Laboratory", credits: 2, marks: "" },
        { subject: "Mini Project", credits: 2, marks: "" },
    ],
    7: [
        { subject: "Professional Elective-IV", credits: 3, marks: "" },
        { subject: "Engineering Professional Practice", credits: 2, marks: "" },
        { subject: "Open Elective-III/ (MI-II)", credits: 3, marks: "" },
        { subject: "Minor-III(Optional)", credits: 3, marks: "" },
        { subject: "Minor-IV(Optional)", credits: 3, marks: "" },
        { subject: "Project-I", credits: 5, marks: "" },
        { subject: "Internship", credits: 2, marks: "" },
        { subject: "MI-(Computing Laboratory)", credits: 2, marks: "" },
    ],
    8: [
        { subject: "Professional Elective-V", credits: 3, marks: "" },
        { subject: "Open Elective-IV/Minor-V (Optional)", credits: 3, marks: "" },
        { subject: "Minor-VI", credits: 3, marks: "" },
        { subject: "Project-II", credits: 9, marks: "" },
    ],
};

const gradePointsMap: { [key: string]: number } = {
    "90 - 100": 10,
    "80 - 89": 9,
    "70 - 79": 8,
    "60 - 69": 7,
    "50 - 59": 6,
    "40 - 49": 5,
    "Below 40": 4,
};

export default function App() {
    const [branch, setBranch] = useState<string>("CSE");
    const [semester, setSemester] = useState<number | null>(null);
    const [courses, setCourses] = useState<Course[]>([]);
    const [sgpa, setSGPA] = useState<string | null>(null);
    const [isCoursesLoaded, setIsCoursesLoaded] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [year, setYear] = useState<number | null>(null);

    const populateCourses = () => {
        if (branch === "Other") {
            // Display a single blank row for adding custom courses
            setCourses([{ subject: "", credits: 0, marks: "" }]);
            setIsCoursesLoaded(true); // Mark courses as loaded
        } else if (branch === "CSE" && semester) {
            // Load predefined courses for CSE
            setCourses(semesterWiseCredits[semester] || []);
            setIsCoursesLoaded(true); // Mark courses as loaded
        } else {
            // Reset courses if branch or semester is invalid
            setCourses([]);
            setIsCoursesLoaded(false);
        }
    };

    const getMotivationalMessage = (sgpa: number) => {
        if (sgpa >= 9) return {
            icon: <FaBullseye />,
            title: 'Exceptional Performance!',
            message: 'You are among the top performers. Keep maintaining this excellence!'
        };
        if (sgpa >= 8) return {
            icon: <FaStar />,
            title: 'Outstanding Work!',
            message: 'Your hard work is clearly showing. Keep this momentum!'
        };
        if (sgpa >= 7) return {
            icon: <FaChartLine />,
            title: 'Good Progress!',
            message: 'You\'re doing well! Push a little more for excellence.'
        };
        if (sgpa >= 6) return {
            icon: <FaDumbbell />,
            title: 'Steady Progress!',
            message: 'Keep working hard, you\'re on the right path!'
        };
        return {
            icon: <FaExclamationCircle />,
            title: 'Time to Focus',
            message: 'Every challenge is an opportunity to improve!'
        };
    };

    const handleInputChange = (index: number, field: keyof Course, value: string | number) => {
        setCourses((prevCourses) => {
            const updatedCourses = [...prevCourses];
            if (field === 'credits') {
                updatedCourses[index][field] = value as number;
            } else {
                updatedCourses[index][field] = value as string;
            }
            return updatedCourses;
        });
    };

    const addSubject = () => {
        setCourses((prevCourses) => [
            ...prevCourses,
            { subject: "", credits: 0, marks: "" },
        ]);
    };

    const deleteSubject = (index: number) => {
        setCourses((prevCourses) => prevCourses.filter((_, i) => i !== index));
    };

    const calculateSGPA = () => {
        if (courses.length === 0) {
            toast.warn('Please add at least one subject to calculate SGPA!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        }

        let totalPoints = 0;
        let totalCredits = 0;

        // Check if all marks are filled
        for (const course of courses) {
            if (!course.marks) {
                toast.info('Please add marks for all subjects!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                return;
            }

            const gradePoint = gradePointsMap[course.marks] || 0;
            totalPoints += gradePoint * course.credits;
            totalCredits += course.credits;
        }

        const sgpa = totalCredits > 0 ? totalPoints / totalCredits : 0;
        setSGPA(sgpa.toFixed(2));
    };

    return (
        <div className="min-h-screen flex flex-col justify-start sm:items-start items-center  text-black dark:text-white p-4 sm:p-6 md:p-8">
            <ToastContainer />
            <h1 className="xl:text-4xl sm:text-3xl text-3xl font-semibold mb-10 ">SGPA Calculator</h1>

            <div className="mb-2 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
                <div className="sm:mb-4 mb-0 flex flex-col  justify-center sm:justify-start">
                    <label className="mb-2 font-medium flex  justify-center sm:justify-center">Branch</label>
                    <select
                    title="Branch"
                        value={branch}
                        onChange={(e: ChangeEvent<HTMLSelectElement>) => setBranch(e.target.value)}
                        className="border border-black bg-white dark:bg-black dark:border-white  px-5 rounded-full py-2"
                    >
                        <option value="CSE">CSE</option>
                        <option value="Other">Other</option>
                    </select>
                </div>


                <div className="mb-2 flex flex-col  justify-center sm:justify-start">
                    <label className=" mb-2 font-medium flex justify-center sm:justify-center">Year</label>
                    <select
                    title="Year"
                        value={year ?? ""}
                        onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                            setYear(parseInt(e.target.value));
                            setSemester(null);
                        }}
                        className="border border-black bg-white dark:bg-black dark:border-white rounded-full px-5 py-2"
                    >
                        <option value="">Select Year</option>
                        {[1, 2, 3, 4].map((y) => (
                            <option key={y} value={y}>
                                Year {y}
                            </option>
                        ))}
                    </select>
                </div>


                <div className="mb-2">
                    <label className=" mb-2 font-medium flex justify-center sm:justify-center ">Semester</label>
                    <select
                    title="Semester"
                        value={semester ?? ""}
                        onChange={(e: ChangeEvent<HTMLSelectElement>) => setSemester(parseInt(e.target.value))}
                        className="border border-black bg-white dark:bg-black dark:border-white rounded-full px-5 py-2"
                        disabled={!year} // Disable the dropdown if no year is selected
                    >
                        <option value="">Select Semester</option>
                        {year &&
                            Array.from({ length: 2 }, (_, i) => (year - 1) * 2 + i + 1).map((sem) => (
                                <option key={sem} value={sem}>
                                    Semester {sem}
                                </option>
                            ))}
                    </select>
                </div>
            </div>

            <button
                onClick={populateCourses}
                className="bg-[#E9E5C9] dark:bg-[#E9E5C9]/50 mt-4 dark:text-white px-4 py-2 w-full sm:w-40 rounded-full mb-6 hover:bg-[#e7e0ae] dark:hover:bg-[#c3be97] focus:outline-none "
            >
                Load Courses
            </button>


            <div className="w-full sm:w-xl rounded-lg p-2 py-6">
                {courses.map((course, index) => (
                    <div key={index} className="mb-4">
                        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                            <input
                                type="text"
                                value={course.subject}
                                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    handleInputChange(index, "subject", e.target.value)
                                }
                                placeholder="Subject"
                                className="dark:border-[1.4px] border-[1.8px] border-black bg-white dark:bg-black dark:border-white rounded-full px-3 py-2 flex-1"
                            />

                            <select
                            title="Credits"
                                value={course.credits}
                                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                                    handleInputChange(index, "credits", parseFloat(e.target.value))
                                }
                                className="dark:border-[1.4px] border-[1.8px] border-black bg-white dark:bg-black dark:border-white rounded-full px-3 py-2 w-full sm:w-24"
                            >
                                <option value="">Select Credits</option>
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((credit) => (
                                    <option key={credit} value={credit}>
                                        {credit}
                                    </option>
                                ))}
                            </select>
                            <select
                            title="Marks"
                                value={course.marks}
                                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                                    handleInputChange(index, "marks", e.target.value)
                                }
                                className="dark:border-[1.4px] border-[1.8px] border-black bg-white dark:bg-black dark:border-white rounded-full px-3 py-2 w-full sm:w-auto"
                            >
                                <option value="">Marks</option>
                                {marksOptions.map((range) => (
                                    <option key={range} value={range}>
                                        {range}
                                    </option>
                                ))}
                            </select>
                            <button
                            title=" Delete"
                                onClick={() => deleteSubject(index)}
                                className="delete bg-[#74AA63] dark:bg-[#446377] px-2 py-2 mt-1 rounded-full focus:outline-none  glow-effect justify-center mx-auto"
                    >
                                <FaTrash />
                            </button>
                        </div>
                    </div>
                ))}

                {isCoursesLoaded && (
                    <div className="add-btn flex flex-col gap-3">
                        <button
                            onClick={addSubject}
                            className="bg-[#E9E5C9] dark:bg-[#E9E5C9]/50 dark:text-white px-4 py-2 w-full sm:w-40 rounded-full mb-6 hover:bg-[#e7e0ae] dark:hover:bg-[#c3be97] focus:outline-none "
                            >
                            Add Subject +
                        </button>

                        <button
                            onClick={calculateSGPA}
                            className="bg-[#74AA63] dark:bg-[#446377] font-semibold text-lg py-3 rounded-full focus:outline-none "
                        >
                            {isLoading ? "Calculating..." : "Calculate SGPA"}
                        </button>
                    </div>
                )}

                {sgpa !== null && (
                    <div className="Sgpa mt-6  p-4 rounded-3xl border-2 border-black dark:border-white text-center">
                        <div>
                            <h3 className="text-lg font-medium">Your Estimated SGPA</h3>
                            <h3 className="text-lg font-medium">{sgpa}</h3>
                        </div>

                        <div className="Motivation">
                            <p className="text-xl font-semibold dark:text-yellow-300 text-yellow-500 flex flex-col justify-center items-center">
                                {getMotivationalMessage(parseFloat(sgpa)).icon}  {getMotivationalMessage(parseFloat(sgpa)).title}
                            </p>
                            <p className="text-sm">
                                {getMotivationalMessage(parseFloat(sgpa)).message}
                            </p>
                        </div>


                    </div>
                )}
            </div>
        </div>
    );
}