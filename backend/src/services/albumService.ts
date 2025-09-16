import * as SongModel from '../models/songModel';
import * as AlbumModel from '../models/albumModel';
import * as JunctionModel from '../models/junctionModel';
import * as UserModel from '../models/userModel';
import { Prisma } from "@prisma/client";
import { prisma } from '../utils/prisma';

export const createAlbumService = async (data: Prisma.albumCreateInput, userId: number) => {
  const album = await AlbumModel.createAlbum(data);
  if (!album) throw new Error(`Album failed to create`);

  const user = await UserModel.userExists(userId);
  if (!user) throw new Error(`User with ID ${userId} does not exist`);

  await JunctionModel.createAlbumAuthor(album.id, userId);
  return album;
};

export const updateAlbumService = async (albumId: number, userId: number, data: Prisma.albumUpdateInput) => {
  const album_exist = await AlbumModel.albumExists(albumId);
  if (!album_exist) throw new Error(`Album with ID ${albumId} does not exist`);

  const user = await UserModel.userExists(userId);
  if (!user) throw new Error(`User with ID ${userId} does not exist`);

  const album_author = await JunctionModel.findAlbumAuthor({ where: { album_id: albumId, author_id: userId } });
  if (!album_author) throw new Error(`User with ID ${userId} is not the author of album ${albumId}`);

  const album = await AlbumModel.updateAlbum(albumId, data);
  if (!album) throw new Error(`Album failed to update`);

  await JunctionModel.createAlbumAuthor(album.id, userId);
  return album;
};

export const getSortedSongInAlbumService = async (albumId: number, sortField: Prisma.SongScalarFieldEnum, sortOrder: 'asc' | 'desc' = 'asc') => {
  const album = await AlbumModel.albumExists(albumId);
  if (!album) throw new Error(`Album with ID ${albumId} not found`);

  const songs = await SongModel.findSortedSongs({ album: albumId }, sortField, sortOrder);
  return songs;
};

export const deleteSongFromAlbumService = async (songId: number, albumId: number, userId: number) => {
  const user = await UserModel.userExists(userId);
  if (!user) throw new Error(`User with ID ${userId} does not exist`);

  const album = await AlbumModel.albumExists(albumId);
  if (!album) throw new Error(`Album with ID ${albumId} not found`);

  const song = await SongModel.songExists(songId);
  if (!song) throw new Error(`Song with ID ${songId} not found`);

  const album_author = await JunctionModel.findAlbumAuthor({ where: { album_id: albumId, author_id: userId } });
  if (!album_author) throw new Error(`User with ID ${userId} is not the author of album ${albumId}`);

  await SongModel.updateSong(songId, {
    album_song_albumToalbum: {
      disconnect : true
    }
  });

  return song;
};

export const deleteAlbumService = async (albumId: number, userId: number) => {
  const user = await UserModel.userExists(userId);
  if (!user) throw new Error(`User with ID ${userId} does not exist`);

  const album = await AlbumModel.albumExists(albumId);
  if (!album) throw new Error(`Album with ID ${albumId} not found`);

  const album_author = await JunctionModel.findAlbumAuthor({ where: { album_id: albumId, author_id: userId } });
  if (!album_author) throw new Error(`User with ID ${userId} is not the author of album ${albumId}`);

  await JunctionModel.deleteAlbumAuthor(albumId, userId);
  await AlbumModel.deleteAlbum(albumId);
  return album;
};

//use raw sql to support lowercase search and group concat for authors
export async function findAlbumsByNameService(name: string): Promise<{ id: number; album_name: string; authors: string }[]> {
  const albums = await prisma.$queryRaw<
    { id: number; album_name: string; authors: string }[]
  >`
    SELECT a.id, a.album_name, 
           COALESCE(GROUP_CONCAT(u.username SEPARATOR ', '), '') AS authors
    FROM album a
    LEFT JOIN album_author aa ON a.id = aa.album_id
    LEFT JOIN user u ON aa.author_id = u.id
    WHERE LOWER(a.album_name) LIKE LOWER(${`%${name}%`})
    GROUP BY a.id
    ORDER BY a.album_name ASC
  `;
  return albums;
}

export async function findSongsByNameInAlbumService( //use rawsql to support lowercase search
  name: string
): Promise<{ name: string; genre: string; year_publish: number; album_name: string }[]> {
  // Add wildcards and convert to lowercase for case-insensitive search
  const search = `%${name.toLowerCase()}%`;

  const songs = await prisma.$queryRaw<
    { name: string; genre: string; year_publish: number; album_name: string }[]
  >`
    SELECT s.name, s.genre, s.year_publish, a.album_name
    FROM song s
    JOIN album a ON s.album = a.id
    WHERE LOWER(s.name) LIKE ${search}
    GROUP BY s.id, a.id
    ORDER BY s.name ASC
  `;

  return songs;
}


