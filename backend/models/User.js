import prisma from "../config/database.js";

export const createUser = async (name, email, hashedPassword, firebaseUid = null) => {
  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        firebaseUid,
      },
    });
    return user;
  } catch (error) {
    throw new Error(`Error creating user: ${error.message}`);
  }
};

export const getUserByEmail = async (email) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    return user;
  } catch (error) {
    throw new Error(`Error fetching user: ${error.message}`);
  }
};

export const getUserById = async (id) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    return user;
  } catch (error) {
    throw new Error(`Error fetching user: ${error.message}`);
  }
};

export const getUserByUid = async (firebaseUid) => {
  try {
    const user = await prisma.user.findUnique({
      where: { firebaseUid },
    });
    return user;
  } catch (error) {
    throw new Error(`Error fetching user: ${error.message}`);
  }
};

export const updateUser = async (id, data) => {
  try {
    const user = await prisma.user.update({
      where: { id },
      data,
    });
    return user;
  } catch (error) {
    throw new Error(`Error updating user: ${error.message}`);
  }
};
