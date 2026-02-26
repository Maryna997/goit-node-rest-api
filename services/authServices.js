import bcrypt from "bcryptjs";
import User from "../db/models/User.js";
import HttpError from "../helpers/HttpError.js";
import { generateToken } from "../helpers/jwtToken.js";

export const findUser = (where) => User.findOne({ where });

export const registerUser = async ({ email, password }) => {
  const existingUser = await findUser({ email });
  if (existingUser) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  return User.create({
    email,
    password: hashPassword,
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
