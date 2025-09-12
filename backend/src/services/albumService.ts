import * as SongModel from '../models/songModel';
import * as AlbumModel from '../models/albumModel';
import * as JunctionModel from '../models/junctionModel';
import { Prisma } from "../../prisma/generated/prisma";

export const createAlbumService = async (albumName: string, userId: number) => {
  const album = await AlbumModel.createAlbum({album_name: albumName});
  if (!album) throw new Error(`Album failed to create`);

  await JunctionModel.createAlbumAuthor(album.id, userId);
  return album;
};

export const getSortedSongInAlbumService = async (albumId: number, sortField: Prisma.SongScalarFieldEnum, sortOrder: 'asc' | 'desc' = 'asc') => {
  const album = await AlbumModel.albumExists(albumId);
  if (!album) throw new Error(`Album with ID ${albumId} not found`);

  const songs = await SongModel.findSortedSongs({ album: albumId }, sortField, sortOrder);
  return songs;
};
