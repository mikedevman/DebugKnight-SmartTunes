import { prisma } from '../utils/prisma';
import { Prisma } from "@prisma/client";

import * as SongModel from '../models/songModel';
import * as AlbumModel from '../models/albumModel';
import * as PlaylistModel from '../models/playlistModel';
import * as UserModel from '../models/userModel';
import * as PlayhistoryModel from '../models/playhistoryModel';


export const createAlbumAuthor = (albumId: number, userId: number) => {
  return prisma.album_author.create({  //relation field update
    data: {
        user:  { connect: { id: userId } },
        album: { connect: { id: albumId } }
    }
  });
};

export const createPlaylistSong = (playlistId: number, songId: number) => {

  return prisma.playlist_song.create({  //relation field update
    data: {
        playlist:  { connect: { id: playlistId } },
        song: { connect: { id: songId } }
    }
  });
};

export const createSongAuthor = (songId: number, userId: number) => {

  return prisma.song_author.create({  //relation field update
    data: {
        user:  { connect: { id: userId } },
        song: { connect: { id: songId } }
    }
  });
};

export const findAlbumAuthor = (where: Prisma.album_authorFindManyArgs) => {  //find album_author using X criteria
  return prisma.album_author.findMany(where);
};

export const findSongAuthor = (where: Prisma.song_authorFindManyArgs) => {  //find song_author using X criteria
  return prisma.song_author.findMany(where);
};

export const findPlaylistSong = (where: Prisma.playlist_songFindManyArgs) => {  //find playlist_song using X criteria
  return prisma.playlist_song.findMany(where);
};

export const deleteAlbumAuthor = (albumId: number, userId: number) => {
  return prisma.album_author.deleteMany({ where: { album_id: albumId, author_id: userId } });
};

export const deleteSongAuthor = (songId: number, userId: number) => {
  return prisma.song_author.deleteMany({ where: { song_id: songId, author_id: userId } });
};

export const deletePlaylistSong = (playlistId: number, songId: number) => {
  return prisma.playlist_song.deleteMany({ where: { playlist_id: playlistId, song_id: songId } });
};