"use client"

import { useRouter } from 'next/navigation'
import React from 'react'
import CustomHeader from '../CustomeCardHeader.tsx/Header';
import PlaylistView from './PlaylistView';

function YoutubePlaylist() {
    const router = useRouter();
    return (
        <div>
            <CustomHeader
                title='Youtube Playlists'
                buttonTitle='Add Playlists'
                onClick={() => router.push("/youtube-playlists/add")}
            />
            <PlaylistView />
        </div>
    )
}

export default YoutubePlaylist
