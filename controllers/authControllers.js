import * as authServices from "../services/authServices.js";

export const registerController = async (req, res) => {
  const newUser = await authServices.registerUser(req.body);
  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
      avatarURL: newUser.avatarURL,
    },
  });
};

export const verifyController = async (req, res) => {
  const { verificationToken } = req.params;
  await authServices.verifyUser(verificationToken);
  res.json({
    message: "Verification successful",
  });
};

export const resendVerifyController = async (req, res) => {
  await authServices.resendVerify(req.body);
  res.json({
    message: "Verification email sent",
  });
};

export const loginController = async (req, res) => {
  const result = await authServices.loginUser(req.body);
  res.status(200).json(result);
};

export const currentController = async (req, res) => {
  const { email, subscription } = req.user;
  res.json({ email, subscription });
};

export const logoutController = async (req, res) => {
  await authServices.logoutUser(req.user.id);
  res.status(204).send();
};

export const updateAvatarController = async (req, res) => {
  const { id } = req.user;
  const avatarURL = await authServices.updateAvatar(id, req.file);
  res.status(200).json({ avatarURL });
};
