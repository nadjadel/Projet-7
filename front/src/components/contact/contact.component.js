import React from "react";
import { useDispatch } from "react-redux";
import { Avatar } from "@material-ui/core";
import authService from "../../services/auth.service";
import { getContacts } from "../../actions/contact";
import { useState, useEffect } from "react";
import { Clear } from "@material-ui/icons";
import './contact.css'

const Contact = ({ contacts, userId }) => {
  const [backendContacts, setBackendContacts] = useState(contacts);
  const dipatch = useDispatch();

  const handleDelete = (id) => {
    authService.deleteContact(id).then((res) => dipatch(getContacts(userId)));
  };
  useEffect(() => {
    setBackendContacts(contacts);
  }, [contacts]);
  return (
    <ul className="contact">
      {contacts.map((element) => (
        <li key={element.id}>
          <Avatar src={element.contactId.imageUrl} />
          {element.contactId.firstName + " " + element.contactId.lastName}
          <Clear
            fontSize="small"
            color="disabled"
            onClick={() => handleDelete(element.id)}
          />
        </li>
      ))}
    </ul>
  );
};

export default Contact;
