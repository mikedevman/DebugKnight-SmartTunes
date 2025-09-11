import { prisma } from '../utils/prisma';
import { Prisma } from "../generated/prisma";

export const createAlbum = (data: Prisma.albumCreateInput) => {
  return prisma.album.create({ data });
};

export const findAlbumById = (albumId: number) => {
  return prisma.album.findUnique({ where: { id: albumId } });
};

export const findAllAlbums = () => {
  return prisma.album.findMany();
};

export const updateAlbum = (
  albumId: number,
  data: Prisma.albumUpdateInput
) => {
  return prisma.album.update({
    where: { id: albumId },
    data,
  });
};

export const deleteAlbum = (albumId: number) => {
  return prisma.album.delete({ where: { id: albumId } });
};

export const albumExists = async (albumId: number): Promise<boolean> => {     //check if album exists
  const album = await prisma.album.findUnique({ where: { id: albumId } });
  return !!album;
};

export const findAlbums = (where: Prisma.albumWhereInput) => {  //find album using X criteria
  return prisma.album.findMany({ where });
};

export const deleteAlbums = (where: Prisma.albumWhereInput) => {  //delete album using X criteria
  return prisma.album.deleteMany({ where });
};

export const countAlbums = (where: Prisma.albumWhereInput) => {  //count albums using X criteria
  return prisma.album.count({ where });
}
