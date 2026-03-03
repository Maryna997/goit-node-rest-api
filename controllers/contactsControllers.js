import * as contactsServices from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";

export const getAllContacts = async (req, res) => {
  const { id: owner } = req.user;
  const contacts = await contactsServices.listContacts(owner);
  res.json(contacts);
};

export const getOneContact = async (req, res) => {
  const { id } = req.params;
  const { id: owner } = req.user;

  const result = await contactsServices.getContactById(id, owner);
  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
};

export const deleteContact = async (req, res) => {
  const { id } = req.params;
  const { id: owner } = req.user;
  const result = await contactsServices.removeContact(id, owner);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(204).send();
};

export const createContact = async (req, res) => {
  const { id: owner } = req.user;

  const result = await contactsServices.addContact({
    ...req.body,
    owner,
  });

  res.status(201).json(result);
};

export const updateContact = async (req, res) => {
  const { id } = req.params;
  const { id: owner } = req.user;

  const result = await contactsServices.updateContact(id, owner, req.body);
  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
};

export const updateContactFavorite = async (req, res) => {
  const { contactId } = req.params;
  const { id: owner } = req.user;
  const { favorite } = req.body;

  if (typeof favorite !== "boolean") {
    return res.status(400).json({ message: "Must be true or false" });
  }

  const result = await contactsServices.updateStatusContact(contactId, owner, {
    favorite,
  });

  if (!result) {
    return res.status(404).json({ message: "Not found" });
  }

  res.status(200).json(result);
};
