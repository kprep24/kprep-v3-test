import { create } from "zustand";


type OpenAccountSheet = {
    id?: string,
    open: boolean,
    onOpen: (open: boolean) => void,
    setId: (id: string) => void
    onClosed: () => void,
    editId?: string,
    setEditId: (id: string | undefined) => void,
    isBranchDialogOpen: boolean,
    setIsBranchDialogOpen: (open: boolean) => void,
    dialogType: "Branch" | "Course",
    setDialogType: (type: "Branch" | "Course") => void
}

export const useOpenSheet = create<OpenAccountSheet>((set) => ({
    id: undefined,
    open: false,
    editId: undefined,
    isBranchDialogOpen: false,
    dialogType: "Course",
    setDialogType: (type: "Branch" | "Course") => set({
        dialogType: type,
    }),
    setEditId: (id: string | undefined) => set({
        editId: id
    }),
    setIsBranchDialogOpen: (open: boolean) => set({
        isBranchDialogOpen: open,
    }),
    onOpen: (open: boolean) => set({ open }),
    setId: (id: string) => set({ id }),
    onClosed: () => set({ open: false }),
}))