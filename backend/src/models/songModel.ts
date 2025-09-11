import { prisma } from '../utils/prisma';
import { Prisma } from "../../prisma/generated/prisma";

export const createSong = (data: Prisma.songCreateInput) => {
  return prisma.song.create({ data });
};

export const findSongById = (songId: number) => {
  return prisma.song.findUnique({ where: { id: songId } });
};

export const findAllSongs = () => {
  return prisma.song.findMany();
};

export const updateSong = (
  songId: number,
  data: Prisma.songUpdateInput
) => {
  return prisma.song.update({
    where: { id: songId },
    data,
  });
};

export const deleteSong = (songId: number) => {
  return prisma.song.delete({ where: { id: songId } });
};

export const songExists = async (songId: number): Promise<boolean> => {     //check if song exists
  const song = await prisma.song.findUnique({ where: { id: songId } });
  return !!song;
};

export const findSongs = (where: Prisma.songWhereInput) => {  //find song using X criteria
  return prisma.song.findMany({ where });
};

export const deleteSongs = (where: Prisma.songWhereInput) => {  //delete song using X criteria
  return prisma.song.deleteMany({ where });
};

export const countSongs = (where: Prisma.songWhereInput) => {  //count songs using X criteria
  return prisma.song.count({ where });
}
