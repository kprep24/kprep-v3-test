"use client"
import React, { useState } from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useGetFeedbacks } from '../../api/reports_feedbacks/use-get-feedbacks';
import FeedBackCardView from './FeedBackCardView';




export interface Ifeedback {
    approved: boolean
    userId: string;
    user: { name: string, email: string, image: string }
    review: string;
    createdAt: string;
    category: "Bug" | "Feature" | "Feedback";
    id: string;
    onApprove?: (id: string) => void
    onDelete?: (id: string) => void
}




function ReportFeedback() {
    const categories = ["All", "Bug", "Feedback", "Feature"];
    const [category, setCategory] = useState<string>("All");
    const feedbacks = useGetFeedbacks();

    let feedbackLists: Ifeedback[] = feedbacks.data || [];
    const filterList = feedbackLists.filter(feedback => feedback.category === category);
    feedbackLists = category === "All" ? feedbackLists : filterList;



    return (
        <div className='px-5'>
            <div className="header flex justify-between">
                <div className="title text-2xl">
                    Feedbacks
                </div>
                <div className="filterBx">
                    <Select value={category} onValueChange={(e) => setCategory(e)}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="All" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {categories.map((item, i) => <SelectItem key={i} value={item}>{item}</SelectItem>)}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="feedbacksView w-full">
                <FeedBackCardView
                    feedbackLists={feedbackLists}
                    feedbacks={feedbacks}
                />
            </div>
        </div>
    )
}

export default ReportFeedback
