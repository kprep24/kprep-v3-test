


import axiosInstance from "@/lib/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";


export const useGetPlaylists = () => {
    const query = useQuery({
        queryKey: ["playlist"],
        queryFn: async () => {
            const res: any = await axiosInstance.get(`/api/playlist/admin`);
            return res.playlists;
        },
    });
    return query;
}

export const useGetPlaylistsByYear = (id: string, subjectId: string | undefined, year: string) => {
    const query = useQuery({
        queryKey: ["playlist_user"],
        queryFn: async () => {
            const res: any = await axios.get(`/api/playlist/playlists?subjectId=${subjectId}&year=${year}`, {
                headers: {
                    Authorization: `${id}`
                }
            });
            return res.data.playlists;
        },
    });
    return query;
}


// playlists