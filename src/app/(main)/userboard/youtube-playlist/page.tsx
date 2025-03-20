"use client"

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star } from "lucide-react";
import { useSession } from "next-auth/react";
import getSubjectsList from "@/features/(main)/api/getSubjects";
import { IsubjectData } from "@/components/UserDashboard/Resources/ResourcesFilters";
import { useGetPlaylistsByYear } from "@/features/(admin)/api/playlist/use-get-playlist";
import { useUserInfo } from "@/store/AuthStore";
import { getYear } from "@/components/UserDashboard/ProfilePage";
import { Rating } from 'react-simple-star-rating'
const sortOptions = [
  { id: "rating", name: "Highest Rating" },
  { id: "videos", name: "Most Videos" }
];

interface IPlaylist {
  link: string;
  chName: string;
  noOfVideos: number;
  rating: number;
  subjectId: string;
  subject: {
    fullName: string;
  };
  title: string;
  id: string;
}

export default function PlaylistPage() {
  const [selectedSubject, setSelectedSubject] = useState<string | undefined>(undefined);
  const [selectedTopic, setSelectedTopic] = useState("all");
  const [sortBy, setSortBy] = useState("rating");

  const { data } = useSession();
  const subjectsList = getSubjectsList(data?.user.id!);
  const subjectData: IsubjectData[] = subjectsList.data || [];

  const currentSubject = subjectData.find((s) => s.id === selectedSubject);

  const { year } = useUserInfo();
  const playlists = useGetPlaylistsByYear(data?.user.id!, selectedSubject, year);
  const playlistLists: IPlaylist[] = playlists.data || [];

  // Filter playlists by subject and topic
  const filteredPlaylists = useMemo(() => {
    let list = selectedSubject ? playlistLists.filter((p) => p.subjectId === selectedSubject) : playlistLists;

    // Filter by topic
    if (selectedTopic !== "all") {
      list = list.filter((p) => p.title === selectedTopic);
    }

    // Sort by rating or noOfVideos
    list.sort((a, b) => {
      if (sortBy === "rating") {
        return b.rating - a.rating;  // Highest rating first
      } else if (sortBy === "videos") {
        return b.noOfVideos - a.noOfVideos;  // Most videos first
      }
      return 0;
    });

    return list;
  }, [playlistLists, selectedSubject, selectedTopic, sortBy]);

  return (
    <div className="h-[calc(100vh-96px)] flex flex-col overflow-hidden">
      <h1 className="text-4xl font-bold ">Online Videos</h1>

      {/* Filters */}
      <div className="p-4 ">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <Select disabled={subjectData.length === 0} onValueChange={setSelectedSubject}>
            <SelectTrigger className="w-[300px]">
              <SelectValue placeholder="Select Subject" />
            </SelectTrigger>
            <SelectContent>
              {subjectData.map((subject) => (
                <SelectItem key={subject.id} value={subject.id}>
                  {subject.fullName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex flex-wrap gap-2">
            <Select
              disabled={selectedSubject === undefined || filteredPlaylists.length === 0}
              value={selectedTopic}
              onValueChange={setSelectedTopic}
            >
              <SelectTrigger className="w-[250px]">
                <SelectValue placeholder="Topic" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Topics</SelectItem>
                {Array.from(new Set(playlistLists.map((topic) => topic.title)))  // Deduplicate titles
                  .map((uniqueTitle, index) => (
                    <SelectItem key={index} value={uniqueTitle}>
                      {uniqueTitle}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>


            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.id} value={option.id}>
                    {option.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-[350px_1fr] overflow-hidden">
        <div className="p-6 youtube-playlist-light dark:hidden block rounded-t-2xl ">
          <h1 className="text-3xl font-bold mb-2">
            {selectedSubject === undefined ? `${getYear(year)} year's videos` : currentSubject?.fullName}
          </h1>
          <p className="text-lg mb-6">Youtube Playlists</p>
          <div className="space-y-2 text-sm">
            <p>Number of available playlists: {filteredPlaylists.length}</p>
          </div>
        </div>
        <div className="p-6 youtube-playlist-dark hidden dark:block rounded-t-2xl ">
          <h1 className="text-3xl font-bold mb-2">
            {selectedSubject === undefined ? `${getYear(year)} year's videos` : currentSubject?.fullName}
          </h1>
          <p className="text-lg mb-6">Youtube Playlists</p>
          <div className="space-y-2 text-sm">
            <p>Number of available playlists: {filteredPlaylists.length}</p>
          </div>
        </div>

        <div className="overflow-y-auto h-auto">
          <div className="p-4 space-y-4">
            {filteredPlaylists.length >= 1 ? (
              filteredPlaylists.map((playlist) => (
                <div
                  key={playlist.id}
                  className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
                >
                  <div className="w-14 h-12 bg-[#8bc34a] dark:bg-[#3f779d] rounded-lg flex items-center justify-center">
                    <div className="w-9 h-6 bg-[#ffffff] rounded-lg flex items-center justify-center">
                      <div className="w-0 h-0 border-l-[8px] border-l-[#8bc34a] dark:border-l-[#3f779d]  border-y-[6px] border-y-transparent ml-1" />
                    </div>
                  </div>

                  <div className="flex-1">
                    <h3 className="font-medium">{playlist.subject.fullName}</h3>
                    <p className="text-sm text-muted-foreground">{playlist.chName}</p>
                  </div>

                  <div className="text-right w-full sm:w-auto mt-2 sm:mt-0">
                    <p className="text-sm mb-1">Number of Videos: {playlist.noOfVideos}</p>
                    <div className="flex">
                      <Rating
                      SVGstyle={{display:"inline-block"}}
                        style={{ display: "flex" }}
                        readonly
                        allowFraction
                        initialValue={playlist.rating}
                      />
                    </div>


                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2 text-red-500 dark:text-red-400 border-red-500 border"
                      onClick={() => window.open(playlist.link, "_blank", "noopener,noreferrer")}
                    >
                      Watch Playlist
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center p-8 border rounded-lg">
                <p className="text-muted-foreground">No playlists found.</p>
                <Button variant="outline" className="mt-4" onClick={() => setSelectedTopic("all")}>
                  View All Topics
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
