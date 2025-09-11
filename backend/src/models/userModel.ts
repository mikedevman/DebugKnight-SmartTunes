import { prisma } from '../utils/prisma';
import { Prisma } from "../../prisma/generated/prisma";

export const createUser = (data: Prisma.userCreateInput) => {
  return prisma.user.create({ data });
};

export const findUserById = (userId: number) => {
  return prisma.user.findUnique({ where: { id: userId } });
};

export const findAllUsers = () => {
  return prisma.user.findMany();
};

export const updateUser = (
  userId: number,
  data: Prisma.userUpdateInput
) => {
  return prisma.user.update({
    where: { id: userId },
    data,
  });
};

export const deleteUser = (userId: number) => {
  return prisma.user.delete({ where: { id: userId } });
};

export const userExists = async (userId: number): Promise<boolean> => {     //check if user exists
  const user = await prisma.user.findUnique({ where: { id: userId } });
  return !!user;
};

export const findUsers = (where: Prisma.userWhereInput) => {  //find user using X criteria
  return prisma.user.findMany({ where });
};

export const deleteUsers = (where: Prisma.userWhereInput) => {  //delete user using X criteria
  return prisma.user.deleteMany({ where });
};

export const countUsers = (where: Prisma.userWhereInput) => {  //count users using X criteria
  return prisma.user.count({ where });
}
