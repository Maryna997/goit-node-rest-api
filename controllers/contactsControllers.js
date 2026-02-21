import * as contactsServices from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";

export const getAllContacts = async (req, res) => {
    const contacts = await contactsServices.listContacts();
    res.json(contacts);
};

export const getOneContact = async (req, res) => {
    const { id } = req.params;
    const result = await contactsServices.getContactById(id);
    if (!result) {
        throw HttpError(404, 'Not found');
    }
    res.json(result);   
};

export const deleteContact = async (req, res) => {
    const { id } = req.params;
    const result = await contactsServices.removeContact(id);
    if (!result) {
        throw HttpError(404, 'Not found');
    }
    res.json(result);
};

export const createContact = async (req, res) => {
    const result = await contactsServices.addContact(req.body);
    res.status(201).json(result);
};

export const updateContact = async (req, res) => {
    const { id } = req.params;
    const result = await contactsServices.updateContact(id, req.body);
    if (!result) {
        throw HttpError(404, 'Not found');
    }
    res.json(result);
};


export const updateContactFavorite = async (req, res) => {
    const { contactId } = req.params;
    const { favorite } = req.body;

    if (typeof favorite !== "boolean") {
        return res.status(400).json({ message: "Must be true or false" });
    }

    const result = await contactsServices.updateStatusContact(contactId, { favorite });

    if (!result) {
        return res.status(404).json({ message: "Not found" });
    }

    res.status(200).json(result);
};