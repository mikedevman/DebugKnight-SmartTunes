import * as SongModel from '../models/songModel';
import * as PlaylistModel from '../models/playlistModel';
import * as JunctionModel from '../models/junctionModel';
import { Prisma } from "../../prisma/generated/prisma";

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