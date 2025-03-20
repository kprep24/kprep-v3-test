import React from 'react'
import WindowSelect from '../user/windowSelection'
import SubjectSelectInput from '../subjects/SubjectSelectInput'
import { SelectSubject } from './SelectSubject'


interface IResourcesFilter {
    windowSize: number;
    selectedYear: string;
    setSubject: (item: string) => void;
    setWindowSize: (item: number) => void;
    setSelectedYear: (item: string) => void;
    extractSubjectList: any[]
}

function ResourcesFilter({ windowSize, setWindowSize, selectedYear, setSelectedYear, setSubject, extractSubjectList }: IResourcesFilter) {
    return (
        <>
            <WindowSelect
                windowSize={windowSize}
                setWindowSize={setWindowSize}
            />
            <SubjectSelectInput
                selectedYear={selectedYear}
                setSelectedYear={setSelectedYear}
            />
            <SelectSubject
                setSubject={setSubject}
                disable={selectedYear === "" || extractSubjectList.length === 0}
                list={extractSubjectList}
            />
        </>
    )
}

export default ResourcesFilter
