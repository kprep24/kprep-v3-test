import { create } from "zustand";
import { immer } from 'zustand/middleware/immer';
import { persist } from 'zustand/middleware';
import { Role } from "@prisma/client";

interface UserAuthentication {
    email: string;
    firstName: string;
    isSignedIn: boolean;
    lastName: string;
    role: Role | "";
    id: string;
    joiningDate: string;
    signIn: (email: string, role: Role, firstName: string, lastName: string, id: string, joiningDate: string) => void;
    signOut: () => void;
}

interface UserInfoState {
    userId: string;
    name: string;
    email: string;
    isVerified: boolean;
    isLocked: boolean;
    year: string;
    branchId: string;
    courseId: string;
    semester: string;
    image: string;
    branchName: string;
    joinDate: string;
    userType: string;
    updateUserInfo: (user: Partial<Omit<UserInfoState, "updateUserInfo">>) => void;
    logout: () => void;
}

export const useUserInfo = create<UserInfoState>()(
    persist(
        immer((set) => ({
            userId: "",
            name: "",
            email: "",
            isVerified: false,
            isLocked: false,
            year: "",
            branchName: "",
            joinDate: "",
            branchId: "",
            courseId: "",
            semester: "",
            userType: "",
            image: "",
            updateUserInfo: (user) => {
                set((state) => {
                    Object.assign(state, user);
                });
            },
            logout: () => {
                set((state) => {
                    state.userId = "";
                    state.name = "";
                    state.email = "";
                    state.isVerified = false;
                    state.isLocked = false;
                    state.year = "";
                    state.branchName = "";
                    state.joinDate = "";
                    state.branchId = "";
                    state.courseId = "";
                    state.semester = "";
                    state.userType = "";
                    state.image = "";
                });
            }

        })),
        { name: "userInfo" }
    )
);

const useAuthStore = create<UserAuthentication>()(
    persist(
        immer((set) => ({
            email: "",
            firstName: "",
            isSignedIn: false,
            role: "",
            joiningDate: "",
            id: "",
            lastName: "",
            signIn: (email: string, role: Role, firstName: string, lastName: string, id: string, joiningDate: string) => {
                set((state) => {
                    state.isSignedIn = true;
                    state.email = email;
                    state.firstName = firstName;
                    state.role = role;
                    state.id = id;
                    state.lastName = lastName;
                    state.joiningDate = joiningDate;
                });
            },
            signOut: () => {
                set((state) => {
                    state.isSignedIn = false;
                    state.email = "";
                    state.firstName = "";
                    state.role = "";
                    state.id = "";
                    state.lastName = "";
                    state.joiningDate = "";
                });
            },
        })),
        { name: "auth" }
    )
);

export default useAuthStore;