import React from 'react'
import FeedBackCard from './FeedBackCard'
import { useApprovedfeedback } from '../../api/reports_feedbacks/use-approved-feedback';
import useDeleteFeedback from '../../api/reports_feedbacks/use-delete-feedback';
import { toast } from 'sonner';
import { Ifeedback } from './ReportFeedback';
import FeedbackCardSkeleton from './FeedbackCardSkeleton';

function FeedBackCardView({ feedbackLists, feedbacks }: {
    feedbackLists: Ifeedback[],
    feedbacks: any
}) {
    const approved = useApprovedfeedback();
    const deleteFeedback = useDeleteFeedback();
    const handleDelete = (id: string) => {
        deleteFeedback.mutate(id, {
            onSuccess: () => {
                toast("Feedback Delete",)
            },
            onError: (error: any) => {
                toast(error.message || "Error Occured");
            },
        });
    }
    const handleApproved = (id: string) => {
        approved.mutate(id, {
            onSuccess: () => {
                toast("Feedback approved")
            },
            onError: (error: any) => {
                toast(error.message || "Error Occured");
            },
        })
    }
    if (feedbacks.isError) {
        return <div>Error fetching data</div>
    } else if (feedbacks.isLoading) {
        return <>
            {Array.from({ length: 4 }).map((_, index) => <FeedbackCardSkeleton key={index} />)}
        </>
    }
    if (feedbackLists.length === 0) {
        return <div>No Feedback available</div>
    }
    return (
        <>
            {feedbackLists.map((item, i) => <FeedBackCard
                key={i}
                review={item.review}
                user={item.user}
                id={item.id}
                category={item.category}
                approved={item.approved}
                userId={item.userId}
                createdAt={item.createdAt}
                onDelete={handleDelete}
                onApprove={handleApproved}
            />)}
        </>
    )
}

export default FeedBackCardView
