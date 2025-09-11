import * as SongModel from '../models/songModel';
import * as AlbumModel from '../models/albumModel';
import { Prisma } from "../../prisma/generated/prisma";


export const getSortedSongInAlbumService = async (albumId: number, sortField: Prisma.SongScalarFieldEnum, sortOrder: 'asc' | 'desc' = 'asc') => {
  const album = await AlbumModel.albumExists(albumId);
  if (!album) throw new Error(`Album with ID ${albumId} not found`);

  const songs = await SongModel.findSortedSongs({ album: albumId }, sortField, sortOrder);
  return songs;
};
