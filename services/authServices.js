import bcrypt from "bcryptjs";
import gravatar from "gravatar";
import path from "node:path";
import fs from "fs/promises";

import User from "../db/models/User.js";
import HttpError from "../helpers/HttpError.js";
import { generateToken } from "../helpers/jwtToken.js";

const avatarsDir = path.resolve("public", "avatars");
export const findUser = (where) => User.findOne({ where });

export const registerUser = async ({ email, password }) => {
  const existingUser = await findUser({ email });
  if (existingUser) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const avatarURL = gravatar.url(email, {
    s: "250",
    r: "pg",
    d: "mp",
  });

  return User.create({
    email,
    password: hashPassword,
    avatarURL,
  });
};

export const loginUser = async ({ email, password }) => {
  const user = await findUser({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw HttpError(401, "Email or password is wrong");
  }

  const token = generateToken({ id: user.id });

  await user.update({ token });

  return {
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  };
};

export const logoutUser = async (userId) => {
  await User.update({ token: null }, { where: { id: userId } });
};

export const updateAvatar = async (userId, file) => {
  if (!file) {
    throw HttpError(400, "Avatar file is required");
  }

  const { path: tempPath, filename } = file;
  const ext = path.extname(filename);
  const avatarName = `${userId}${ext}`;
  const finalPath = path.join(avatarsDir, avatarName);

  await fs.rename(tempPath, finalPath);

  const avatarURL = `/avatars/${avatarName}`;

  await User.update({ avatarURL }, { where: { id: userId } });

  return avatarURL;
};
