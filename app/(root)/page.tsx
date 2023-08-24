"use client"
import { Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'
import React, { useEffect, useState } from 'react';
import {  useRouter } from 'next/navigation';
import { CreateCard } from '@/components/contacts/CreateCard';
import Nocont from '@/components/contacts/Nocont';



export default function Home() {
  const [modal, setModal] = useState(false);
  const [btn, setBtn] = useState(false);
  const [values, setValues] = useState({
    name: "",
    number: "",
    active: false
  });
  const [contacts, setContacts] = useState([]);


  const router = useRouter();

  let name,value;
  const handleInputs = (e:any) => {
    console.log(e.target.value);
    name=e.target.name;
    value=e.target.value;
    if (name === 'active') {
      setValues({ ...values, [name]: !values.active }); // Toggle the active value
    } else {
      setValues({ ...values, [name]: value });
    }
  }

  const handleSubmit = async (e:any) => {
    //e.preventDefault(); // Prevent the default form submission

    // Load existing data from localStorage
    let savedData = JSON.parse(localStorage.getItem('contacts') || '[]');
    console.log(savedData);

     // Create a new contact object with an index field
    const newContact = { ...values, id: savedData.length };

    // Append new data to the existing data
    savedData.push(newContact);
    console.log(savedData);

    // Store the updated data back in localStorage
    localStorage.setItem('contacts', JSON.stringify(savedData));

    // Clear the form or update the state for the next input
    setValues({
      name: '',
      number: '',
      active: false
    });
     router.push('/');
  };

  useEffect(() => {
      if (typeof window !== 'undefined') {
        // Load saved data from localStorage on page load
        const savedData = localStorage.getItem('contacts');
        if (savedData) {
          setContacts(JSON.parse(savedData));
        }
      }
    }, []);




  return (
    <>
      <div className='flex flex-col items-center justify-center w-screen bg-dark-1 '>
        <Modal
          size='lg'
          isOpen={modal}
          toggle={() => setModal(!modal)}
        >
          <ModalHeader
            toggle={() => setModal(!modal)}
            className='bg-blue-600 flex flex-col'
          >
            <h1 className=' text-white mx-auto font-bold text-xl'>New Contact</h1>
          </ModalHeader>
          <ModalBody className='flex flex-col'>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={12}>
                  <FormGroup>
                    <Label for="Name">
                      Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Name"
                      type="text"
                      value={values.name}
                      onChange={handleInputs}
                    />
                  </FormGroup>
                </Col>
                <Col md={12}>
                  <FormGroup>
                    <Label for="contactnumber">
                      Contact Number
                    </Label>
                    <Input
                      id="number"
                      name="number"
                      placeholder="Contact No."
                      type="number"
                      value={values.number}
                      onChange={handleInputs}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup switch>
                <Input type="switch" role="switch" onClick={() => {
                  setBtn(prevState => !prevState); 
                }} 
                id="active"
                name="active"
                checked={values.active}
                onChange={handleInputs}
                />
                <Label check>{btn ? "Active" : "Inactive"}</Label>
              </FormGroup>
              <button
              className='bg-blue-500 hover:bg-blue-700
              text-white font-bold py-2 px-4 rounded '
              onClick={() => {
                setModal(false);
              }}
            >
              Add
            </button>    
            </Form>
          </ModalBody>
        </Modal>
        <button
          className='bg-blue-500 hover:bg-blue-700
          text-white font-bold py-2 px-4 rounded custom-btn '
          onClick={() => setModal(true)}
        >
          Create Contact
        </button>
      </div>

      <div className='grid md:grid-cols-2 gap-10 grid-cols-1  w-full bg-dark-1'>
        {/* <h1>Contacts</h1> */}

          
        
          {contacts.length > 0 ?
            contacts.map((contact:any) => {
              return (
                <CreateCard key={contact.name} {...contact}/>
              );
            }):<Nocont/>
          }
          
      </div>        
      

    </>
  )
}
