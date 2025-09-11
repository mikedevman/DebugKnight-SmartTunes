import { prisma } from '../utils/prisma';
import { Prisma } from "../generated/prisma";

export const createPlayHistory = (data: Prisma.playhistoryCreateInput) => {
  return prisma.playhistory.create({ data });
};

export const findPlayhistoryById = (Id: number) => {
  return prisma.playhistory.findUnique({ where: { id: Id } });
};

export const updatePlayhistory = (
  Id: number,
  data: Prisma.playhistoryUpdateInput
) => {
  return prisma.playhistory.update({
    where: { id: Id },
    data,
  });
};

export const deletePlayhistory = (Id: number) => {
  return prisma.playhistory.delete({ where: { id: Id } });
};

export const playhistoryExists = async (Id: number): Promise<boolean> => {     //check if playhistory exists
  const playhistory = await prisma.playhistory.findUnique({ where: { id: Id } });
  return !!playhistory;
};

export const findPlayhistories = (where: Prisma.playhistoryWhereInput) => {  //find playhistory using X criteria
  return prisma.playhistory.findMany({ where });
};

export const deletePlayhistories = (where: Prisma.playhistoryWhereInput) => {  //delete playhistory using X criteria
  return prisma.playhistory.deleteMany({ where });
};

export const countPlayhistories = (where: Prisma.playhistoryWhereInput) => {  //count playhistories using X criteria
  return prisma.playhistory.count({ where });
}