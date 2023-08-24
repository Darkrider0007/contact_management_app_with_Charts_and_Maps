import React, { useState } from 'react';
import { Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';

interface EditModalProps {
  contacts: Contact;
  isOpen: boolean;
  toggle: () => void;
  handleEdit: (editedContact: Contact) => void;
}

interface Contact {
  id: number; // Assuming you have an id property in your Contact type
  name: string;
  number: string;
  active: boolean;
}

const EditModal: React.FC<EditModalProps> = ({ contacts, isOpen, toggle, handleEdit }) => {
  const [editedContact, setEditedContact] = useState<Contact>({ ...contacts });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedContact((prevContact) => ({
      ...prevContact,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // Update the contact in your state or wherever you're keeping the contacts
    // You might want to update your state or storage here
  
    // Assuming you're updating the local storage directly
    let savedData = JSON.parse(localStorage.getItem('contacts') || '[]');
    
    // Find the index of the edited contact using the id
    const contactIndex = savedData.findIndex((contact: Contact) => contact.id === editedContact.id);
    
    if (contactIndex !== -1) {
      // Update the contact data in the array
      savedData[contactIndex] = editedContact;
      
      // Update the local storage with the modified data
      localStorage.setItem('contacts', JSON.stringify(savedData));
    }
    
    // Close the EditModal
    toggle();
    window.location.reload();
  };
  

  return (
    <Modal size='lg' isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle} className='bg-blue-600 flex flex-col'>
        Edit Contact
      </ModalHeader>
      <ModalBody className='flex flex-col'>
        <Form onSubmit={handleSave}>
          <Row>
            <Col md={12}>
              <FormGroup>
                <Label for='Name'>Name</Label>
                <Input
                  id='name'
                  name='name'
                  placeholder='Name'
                  type='text'
                  value={editedContact.name}
                  onChange={handleChange}
                />
              </FormGroup>
            </Col>
            <Col md={12}>
              <FormGroup>
                <Label for='contactnumber'>Contact Number</Label>
                <Input
                  id='number'
                  name='number'
                  placeholder='Contact No.'
                  type='number'
                  value={editedContact.number}
                  onChange={handleChange}
                />
              </FormGroup>
            </Col>
          </Row>
          <FormGroup switch>
            <Input
              type='switch'
              role='switch'
              id='active'
              name='active'
              checked={editedContact.active}
              onChange={handleChange}
            />
            <Label check>{editedContact.active ? 'Active' : 'Inactive'}</Label>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <button className='bg-green-600 text-white rounded font-bold mx-6 my-2 px-2 py-2' onClick={handleSave}>
          Save
        </button>
        <button className='bg-red-600 text-white rounded font-bold mx-4 my-2 px-2 py-2' onClick={toggle}>
          Cancel
        </button>
      </ModalFooter>
    </Modal>
  );
};

export default EditModal;
