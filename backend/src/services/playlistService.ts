import * as SongModel from '../models/songModel';
import * as PlaylistModel from '../models/playlistModel';
import * as JunctionModel from '../models/junctionModel';
import * as AlbumModel from '../models/albumModel';
import * as UserModel from '../models/userModel';
import { Prisma } from "@prisma/client";
import { prisma } from '../utils/prisma';
import { toNamespacedPath } from 'path/posix';

export const createPlaylistService = async (userId: number,
  data: Prisma.playlistCreateInput
) => {
  const user = await UserModel.userExists(userId);
  if (!user) throw new Error(`User with ID ${userId} does not exist`);

  const playlist = await PlaylistModel.createPlaylist(data);
  if (!playlist) throw new Error(`Playlist failed to create`);

  return playlist;
};


export const displayAllSongsInPlaylistService = async (playlistId: number) => {
  const playlist = await PlaylistModel.findPlaylistById(playlistId);
  if (!playlist) throw new Error(`Playlist with ID ${playlistId} not found`);

  const songs = await JunctionModel.findPlaylistSong({ where: { playlist_id: playlistId } });
  return { songs };
};

export const deleteSongFromPlaylistService = async (songId: number, playlistId: number) => {
  const playlist = await PlaylistModel.playlistExists(playlistId);
  if (!playlist) throw new Error(`Playlist with ID ${playlistId} not found`);

  const song = await SongModel.songExists(songId);
  if (!song) throw new Error(`Song with ID ${songId} not found`);

  await JunctionModel.deletePlaylistSong(playlistId, songId);
  return song;
};

export const deletePlaylistService = async (playlistId: number, userId: number) => {
  const playlist = await PlaylistModel.findPlaylistById(playlistId);
  if (!playlist) throw new Error(`Playlist with ID ${playlistId} not found`);
  if (playlist.user_created !== userId) throw new Error(`User with ID ${userId} is not the creator of playlist ${playlistId}`);  

  await PlaylistModel.deletePlaylist(playlistId);
  return playlist;
};

export const updatePlaylistStatsForUser = async (userId: number) => { //this query updates total_view and total_time_played for all playlists created by the user. Use raw sql for performance.
  await prisma.$executeRawUnsafe(`
    UPDATE playlist p
    LEFT JOIN (
        SELECT ps.playlist_id,
               IFNULL(SUM(s.view), 0) AS total_view,
               IFNULL(SUM(s.time_played), 0) AS total_time_played
        FROM playlist_song ps
        JOIN song s ON s.id = ps.song_id
        GROUP BY ps.playlist_id
    ) stats ON p.id = stats.playlist_id
    SET p.total_view = IFNULL(stats.total_view, 0),
        p.total_time_played = IFNULL(stats.total_time_played, 0)
    WHERE p.user_created = ?
  `, userId);

  const playlists = await PlaylistModel.findPlaylists({ where: { user_created: userId } });
  return playlists;
};

export const displayAllPlaylistOfUserService = async (userId: number) => {
  const playlists = await PlaylistModel.findPlaylists({ where: { user_created: userId } });
  return playlists;
};

export const addSongToPlaylistService = async (playlistId: number, songId: number) => {
  // 1. Fetch the song values
  const song = await SongModel.findSongById(songId);
  if (!song) throw new Error("Song not found");

  // 2. Check if the playlist exists
  const playlist = await PlaylistModel.playlistExists(playlistId);
  if (!playlist) throw new Error("Playlist not found");

  // 3. Check if song already in playlist
  const songInPlaylist = await JunctionModel.findPlaylistSong({ where: { playlist_id: playlistId, song_id: songId } });
  if (songInPlaylist.length > 0) throw new Error("Song already in playlist");

  // 4. Add song to playlist + update playlist stats
  await JunctionModel.createPlaylistSong(playlistId, songId);

  const results = await prisma.$transaction([
  JunctionModel.createPlaylistSong(playlistId, songId),
  PlaylistModel.updatePlaylist(playlistId, {
    total_view: { increment: song.view ?? 0 },
    total_time_played: { increment: song.time_played ?? 0 },
  }),
]);

  return results[1]; // return the updated playlist
};

export async function findPlaylistsByNameForUserService( //use rawsql for lowercase search
  userId: number,
  name: string
): Promise<{ id: number; playlist_name: string; description: string | null; total_view: number; total_time_played: number }[]> {
  // Add wildcards and lowercase for case-insensitive search
  const search = `%${name.toLowerCase()}%`;

  const playlists = await prisma.$queryRaw<
    { id: number; playlist_name: string; description: string | null; total_view: number; total_time_played: number }[]
  >`
    SELECT p.id, p.playlist_name, p.description, p.total_view, p.total_time_played
    FROM playlist p
    WHERE p.user_created = ${userId}
      AND LOWER(p.playlist_name) LIKE ${search}
    ORDER BY p.playlist_name ASC
  `;

  return playlists;
}

export async function findSongsInPlaylistService(
  name: string
): Promise<{ name: string; genre: string; year_publish: number; playlist_name: string }[]> {
  // Add wildcards and lowercase for case-insensitive search
  const search = `%${name.toLowerCase()}%`;

  const songs = await prisma.$queryRaw<
    { name: string; genre: string; year_publish: number; playlist_name: string }[]
  >`
    SELECT s.name, s.genre, s.year_publish, p.playlist_name
    FROM song s
    JOIN playlist_song ps ON s.id = ps.song_id
    JOIN playlist p ON ps.playlist_id = p.id
    WHERE LOWER(s.name) LIKE ${search}
    GROUP BY s.id, p.id
    ORDER BY s.name ASC
  `;

  return songs;
}