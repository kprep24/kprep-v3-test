import { db } from "@/lib/db";
import { getAllUsers } from "@/services/users.services";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";



export const dashboard = new Hono()
    .get("/", async (c) => {
        try {


            const administations = await db.admin.findMany();
            const resources = await db.resources.findMany();
            const pyqs = (await db.pyqs.findMany());




            //THIS is FOR USERS
            const users = await db.user.findMany({
                include: {
                    userDetails: true
                }
            });
            const noOfFreeUsers = users.filter((item) => item.isPremium === true).length;
            const noOfPremiumUsers = users.filter((item) => item.isPremium === false).length || 0;
            const casualUsers = users.length - (noOfPremiumUsers + noOfFreeUsers);
            //THIS is FOR USERS


            //THIS is FOR ADMINS
            const noOFadmins = administations.filter((item) => item.role === "Admin").length || 0;
            const noOfSuperAdmins = administations.filter((item) => item.role === "SuperAdmin").length || 0;
            //THIS is FOR ADMINS

            //NOTES
            const NoOfFreeNotes = resources.filter((item) => item.freemium === "Free").length || 0;
            const premiumNotes = resources.length - NoOfFreeNotes;

            const publicNotes = resources.filter((item) => item.visibility === "Public").length || 0;
            const privateNotes = resources.filter((item) => item.visibility === "Private").length || 0;
            //NOTES

            //PYQS
            const midPyqs = pyqs.filter((item) => item.pyqType === "Mid").length || 0;
            const EndPyqs = pyqs.filter((item) => item.pyqType === "End").length || 0;
            const premimumPyq = pyqs.filter((item) => item.freemium === "Premium").length || 0;
            const freePyq = pyqs.length - premimumPyq;
            const publicPyqs = pyqs.filter((item) => item.visibility === "Public").length || 0;
            const privatePyqs = pyqs.length - publicPyqs;
            //PYQS

            //subjects
            const subjects = (await db.subject.findMany()).length || 0;
            //subjects
            //course
            const courses = (await db.course.findMany()).length || 0;
            //course
            //branches
            const branches = (await db.branch.findMany()).length || 0;
            //branches

            //repated Question
            const repeatedQuestions = db.mostRepeatedQuestion.findMany();
            const publicRepatedQuestion = (await repeatedQuestions).filter((item) => item.visibility === "Public").length || 0;
            const privateRepatedQuestion = (await repeatedQuestions).length - publicRepatedQuestion;
            //repated Question
            //soultions
            const solutions = await db.pyqs.findMany();
            const filteredSolutions = solutions.filter(
              (pyq) => pyq.solutionUrl && typeof pyq.solutionUrl === 'string' && pyq.solutionUrl.length > 2
            ).length;

            //regestrations

            const firstYears = users.filter((item) => item.userDetails?.year === "One");
            const secondYears = users.filter((item) => item.userDetails?.year === "Two");
            const ThirdYears = users.filter((item) => item.userDetails?.year === "Three");

            //premimum year wise
            const firstYearPremimum = firstYears.filter((item) => item.isPremium === true);
            const secondYearPremimum = secondYears.filter((item) => item.isPremium === true);
            const ThirdYearPremimum = ThirdYears.filter((item) => item.isPremium === true);


            const data = {
                administations: {
                    admin: noOFadmins,
                    superAdmin: noOfSuperAdmins
                },
                pyqs: {
                    mid: midPyqs,
                    end: EndPyqs,
                    premium: premimumPyq,
                    free: freePyq,
                    public: publicPyqs,
                    private: privatePyqs
                },
                users: {
                    free: noOfFreeUsers,
                    premium: noOfPremiumUsers,
                    casual: casualUsers
                },
                resources: {
                    free: NoOfFreeNotes,
                    premium: premiumNotes,
                    public: publicNotes,
                    private: privateNotes
                },
                repeatedQuestions: {
                    public: publicRepatedQuestion,
                    private: privateRepatedQuestion
                },
                solutions: {
                    total: filteredSolutions
                },
                subjects: {
                    total: subjects
                },
                courses: {
                    courses: courses,
                },
                branches: {
                    total: branches
                },
                yearWiseRegestration: {
                    firstYear: firstYears.length,
                    secondYear: secondYears.length,
                    ThirdYear: ThirdYears.length,
                },
                yearWisePremimum: {
                    firstYear: firstYearPremimum.length,
                    secondYear: secondYearPremimum.length,
                    ThirdYear: ThirdYearPremimum.length
                }
            };

            return c.json({ data }, 200);

        } catch (error: any) {
            throw new HTTPException(500, { message: error.message || "Internal Server Error" })
        }
    })


