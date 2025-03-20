interface AdminData {
    admin: number;
    superAdmin: number;
}

interface PyqData {
    mid: number;
    end: number;
    premium: number;
    free: number;
    public: number;
    private: number;
}

export interface UserData {
    free: number;
    premium: number;
    casual: number;
}

interface ResourceData {
    free: number;
    premium: number;
    public: number;
    private: number;
}

interface RepeatedQuestionData {
    public: number;
    private: number;
}

interface SolutionsData {
    total: number;
}

interface SubjectData {
    total: number;
}

interface CourseData {
    courses: number;
}

interface BranchData {
    total: number;
}

interface YearWiseRegistration {
    firstYear: number;
    secondYear: number;
    ThirdYear: number;
}

interface YearWisePremium {
    firstYear: number;
    secondYear: number;
    ThirdYear: number;
}

export interface DashboardData {
    id?: number;
    administations: AdminData;
    pyqs: PyqData;
    users: UserData;
    resources: ResourceData;
    repeatedQuestions: RepeatedQuestionData;
    solutions: SolutionsData;
    subjects: SubjectData;
    courses: CourseData;
    branches: BranchData;
    yearWiseRegestration: YearWiseRegistration;
    yearWisePremimum: YearWisePremium;
}
