import Contact from "../db/models/Contact.js";

export const listContacts = (owner) => {
  return Contact.findAll({ where: { owner } });
};

export const getContactById = (id, owner) => {
  return Contact.findOne({ where: { id, owner } });
};

export const removeContact = async (id, owner) => {
  const contact = await Contact.findOne({ where: { id, owner } });
  if (!contact) return null;

  await contact.destroy();
  return contact;
};

export const addContact = (data) => {
  return Contact.create(data);
};

export const updateContact = async (id, owner, data) => {
  const contact = await Contact.findOne({ where: { id, owner } });
  if (!contact) return null;

  await contact.update(data);
  return contact;
};

export const updateStatusContact = async (id, owner, body) => {
  const contact = await Contact.findOne({ where: { id, owner } });
  if (!contact) return null;

  await contact.update(body);
  return contact;
};
