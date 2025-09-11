import { prisma } from '../utils/prisma';
import { Prisma } from "../../prisma/generated/prisma";

export const createPlaylist = (data: Prisma.playlistCreateInput) => {
  return prisma.playlist.create({ data });
};

export const findPlaylistById = (playlistId: number) => {
  return prisma.playlist.findUnique({ where: { id: playlistId } });
};

export const findAllPlaylists = () => {
  return prisma.playlist.findMany();
};

export const updatePlaylist = (
  playlistId: number,
  data: Prisma.playlistUpdateInput
) => {
  return prisma.playlist.update({
    where: { id: playlistId },
    data,
  });
};

export const deletePlaylist = (playlistId: number) => {
  return prisma.playlist.delete({ where: { id: playlistId } });
};

export const playlistExists = async (playlistId: number): Promise<boolean> => {     //check if playlist exists
  const playlist = await prisma.playlist.findUnique({ where: { id: playlistId } });
  return !!playlist;
};

export const findPlaylists = (where: Prisma.playlistWhereInput) => {  //find playlist using X criteria
  return prisma.playlist.findMany({ where });
};

export const findSortedPlaylists = (where: Prisma.playlistWhereInput, sortField: Prisma.PlaylistScalarFieldEnum, sortOrder: 'asc' | 'desc' = 'asc') => {  //find playlist using X criteria then sort it
  return prisma.playlist.findMany({ where, orderBy: { [sortField]: sortOrder } });
};

export const deletePlaylists = (where: Prisma.playlistWhereInput) => {  //delete playlist using X criteria
  return prisma.playlist.deleteMany({ where });
};

export const countPlaylists = (where: Prisma.playlistWhereInput) => {  //count playlists using X criteria
  return prisma.playlist.count({ where });
}
