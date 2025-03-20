import React from 'react'
import { YtData } from './PlaylistView';
import { TableFallback } from '@/components/TableFallback';
import YTTableRow from './YTTableRow';

function TableBodyView({ playlistData, playlist }: {
    playlistData: YtData[];
    playlist: any;
}) {

    if (playlist.isLoading) {
        <TableFallback colSpan={5} message='Loading....' />
    }
    if (playlist.isError) {
        <TableFallback colSpan={5} message={`Error: ${playlist.error.message}`} />
    }
    if (playlistData.length === 0) {
        <TableFallback colSpan={5} message='No Data Found' />
    }

    const handleEdit = (id: string) => {
        // TODO: Implement edit functionality
    }
    const handleDelete = (id: string) => {
        // TODO: Implement delete functionality
    }

    return (
        <>
            {playlistData.map((data, index) => <YTTableRow
                title={data.title}
                link={data.link}
                subject={data.subject}
                SlNo={index + 1}
                id={data.id}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />)}
        </>
    )
}

export default TableBodyView
