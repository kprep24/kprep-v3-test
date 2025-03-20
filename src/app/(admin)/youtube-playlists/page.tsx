
import YoutubePlaylist from '@/features/(admin)/components/youtube_playlist/YoutubePlaylist'
import { Metadata } from 'next'
import React from 'react'


export const metadata: Metadata = {
  title: 'Youtube Playlists',
}

export default function page() {
  return (
    <YoutubePlaylist />
  )
}
