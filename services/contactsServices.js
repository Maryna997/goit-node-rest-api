import Contact from '../db/models/Contact.js';

export const listContacts = () => {
  return Contact.findAll();
};

export const getContactById = id => {
  return Contact.findByPk(id);
};

export const removeContact = async id => {
  const contact = await getContactById(id);
  if (!contact) return null;
  await contact.destroy();
  return contact;
};

export const addContact = data => {
  return Contact.create(data);
};

export const updateContact = async (contactId, data) => {
  const contact = await getContactById(contactId);
  if (!contact) return null;
  await contact.update(data);
  return contact;
};

export const updateStatusContact = async (contactId, body) => {
  const contact = await Contact.findByPk(contactId);
  if (!contact) return null;
  await contact.update(body);
  return contact;
};