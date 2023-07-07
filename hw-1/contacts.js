const fs = require('fs/promises');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const currentDirectory = process.cwd();
const contactsFile = 'db/contacts.json';

const contactsPath = path.join(currentDirectory, contactsFile);

console.log(contactsPath);

// TODO: задокументувати кожну функцію
function listContacts() {
  return fs
    .readFile(contactsPath, 'utf8')
    .then((data) => {
      return data;
    })
    .catch((err) => {
      throw err;
    });
}

function getContactById(contactId) {
  // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
  return fs
    .readFile(contactsPath, 'utf8')
    .then((data) => {
      const contacts = JSON.parse(data);
      return contacts.find((contact) => contact.id === contactId) || null;
    })
    .catch((err) => {
      throw err;
    });
}

function removeContact(contactId) {
  return fs
    .readFile(contactsPath, 'utf8')
    .then((data) => {
      const contacts = JSON.parse(data);
      const newDb = contacts.filter((contact) => contact.id !== contactId);
      fs.writeFile(contactsPath, JSON.stringify(newDb, null, 2), 'utf8');
      return contacts.filter((contact) => contact.id === contactId);
    })
    .catch((err) => {
      throw err;
    });
}

function addContact(name, email, phone) {
  return fs
    .readFile(contactsPath, 'utf8')
    .then((data) => {
      const contacts = JSON.parse(data);
      const newContact = { id: uuidv4(), name, email, phone };
      contacts.push(newContact);
      fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), 'utf8');
      return newContact;
    })
    .catch((err) => {
      throw err;
    });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
