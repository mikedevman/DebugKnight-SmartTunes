import * as SongModel from '../models/songModel';
import * as AlbumModel from '../models/albumModel';
import { Prisma } from "../../prisma/generated/prisma";

export const getUniqueSongService = async (songId: number) => {
  const song = await SongModel.findSongById(songId);
  if (!song) throw new Error(`Song with ID ${songId} not found`);
  return song;
};

export const updateSongAlbumService = async (songId: number, albumId: number) => {
    const songExists = await SongModel.songExists(songId);
    if (!songExists) throw new Error(`Song with ID ${songId} does not exist`);

    const albumExists = await AlbumModel.albumExists(albumId);
    if (!albumExists) throw new Error(`Album with ID ${albumId} does not exist`);

    const updatedSong = await SongModel.updateSong(songId, {
        album_song_albumToalbum: { connect: { id: albumId } },
    });
    if (!updatedSong) throw new Error(`Song with ID ${songId} not found`);
    return updatedSong;
};



