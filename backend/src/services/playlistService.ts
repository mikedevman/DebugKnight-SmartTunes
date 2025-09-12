import * as SongModel from '../models/songModel';
import * as PlaylistModel from '../models/playlistModel';
import * as JunctionModel from '../models/junctionModel';
import { Prisma } from "../../prisma/generated/prisma";
import { prisma } from '../utils/prisma';

export const createPlaylistService = async (
  data: { playlist_name: string; description: string; user_created: number }
) => {
  const playlist = await PlaylistModel.createPlaylist({
    playlist_name: data.playlist_name,
    description: data.description,
    user: { connect: { id: data.user_created } }, // relational field
  });
  if (!playlist) throw new Error(`Playlist failed to create`);
  return playlist;
};

export const displayAllSongsInPlaylistService = async (playlistId: number) => {
  const playlist = await PlaylistModel.findPlaylistById(playlistId);
  if (!playlist) throw new Error(`Playlist with ID ${playlistId} not found`);

  const songs = await JunctionModel.findPlaylistSong({ playlist_id: playlistId });
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

  const playlists = await PlaylistModel.findPlaylists({ user_created: userId });
  return playlists;
};

export const displayAllPlaylistOfUserService = async (userId: number) => {
  const playlists = await PlaylistModel.findPlaylists({ user_created: userId });
  return playlists;
};
