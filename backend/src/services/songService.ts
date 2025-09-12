import * as SongModel from '../models/songModel';
import * as AlbumModel from '../models/albumModel';
import * as PlaylistModel from '../models/playlistModel';
import * as JunctionModel from '../models/junctionModel';
import * as PlayhistoryModel from '../models/playhistoryModel';
import { Prisma } from "../../prisma/generated/prisma";
import { prisma } from '../utils/prisma';

export const getUniqueSongService = async (songId: number) => {
  const song = await SongModel.findSongById(songId);
  if (!song) throw new Error(`Song with ID ${songId} not found`);
  return song;
};

export const getSongsByAuthor = (authorId: number) => {
  return prisma.song.findMany({
    where: {
      song_author: {
        some: { author_id: authorId }
      }
    }
  });
};

export const getAllSongsSortedService = async (
  sortField: Prisma.SongScalarFieldEnum,
  sortOrder: 'asc' | 'desc' = 'asc'
) => {
  const songs = await SongModel.findSortedSongs({}, sortField, sortOrder);

  if (!songs || songs.length === 0) {
    return [];
  }
  return songs;
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

export const deleteSongService = async (songId: number, playlistId: number) => {
  const song = await SongModel.findSongById(songId);
  if (!song) throw new Error(`Song with ID ${songId} not found`);

  await prisma.$transaction([
    PlayhistoryModel.deletePlayhistory(songId),
    SongModel.deleteSong(songId),
  ]);
};



