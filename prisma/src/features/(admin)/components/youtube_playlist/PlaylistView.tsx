"use client"
import React from 'react'
import TableHeaderView from '@/components/Table/TableHeaderView'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Table, TableBody } from '@/components/ui/table'
import TableBodyView from './TableBodyView'
import { useGetPlaylists } from '../../api/playlist/use-get-playlist'


export interface YtData {
    title: string;
    subject: { fullName: string };
    link: string;
    id: string;
}

function PlaylistView() {
    const playlist = useGetPlaylists();
    const playlistData: YtData[] = playlist.data || [];
    // console.log(playlist.data)
    return (
        <Card>
            <CardHeader></CardHeader>
            <CardContent>
                <Table>
                    <TableHeaderView LIST={['Sl No', 'Title', 'Subject Name', 'Link', 'Action']} />
                    <TableBody>
                        <TableBodyView playlist={playlist} playlistData={playlistData} />
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}

export default PlaylistView
