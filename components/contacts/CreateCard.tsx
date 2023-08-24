"use client"
import React, { useState } from 'react'
import CreateModal from '../modal/CreateModal';
import EditModal from '../modal/EditModal';


interface Contact {
    name: string;
    number: string;
    active: boolean;
}

interface CreateCardProps {
    contacts: Contact;
}

export const CreateCard = (contacts: any) => {
    const [modal, setModal] = useState(false);
    const [editModal, setEditModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal);
    };
    const handleDelete = () => {
        console.log(contacts.id);
        let savedData = JSON.parse(localStorage.getItem('contacts') || '[]');
        savedData.splice(contacts.id, 1);
        localStorage.setItem('contacts', JSON.stringify(savedData));
        window.location.reload();
    }

    const toggleEditModal = () => {
        setEditModal(!editModal);
    };

    const handleEdit = (editedContact: Contact) => {
        // Implement the logic to edit the contact based on the id
        // You can update the contact in your state or perform other actions
        console.log('Edited Contact:', editedContact);
      };

    return (
        <>
            <CreateModal contacts={contacts} isOpen={modal} toggle={toggleModal} />
            <EditModal contacts={contacts} isOpen={editModal} toggle={toggleEditModal} handleEdit={handleEdit} />

            <div className='border-4 border-gray-800 bg-sky-400  mt-20 ml-20 md:w-80 md:h-80 w-80 h-70 '>
                <div onClick={() => setModal(true)}>
                    <h1 className='m-4 text-white font-extrabold text-2xl '>Name : {contacts.name}</h1>
                    <h2 className='m-4 text-white font-bold text-xl'>Contact No. : {contacts.number}</h2>
                    <div className='flex flex-row m-4'>
                        <h2 className='font-bold text-xl text-white'>Active :</h2>
                        <h2 className={`font-bold text-xl ml-2 ${contacts.active ? 'text-green-700' : 'text-red-500'}`}>
                            {contacts.active ? ' Yes' : ' No'}
                        </h2>
                    </div>
                </div>

                <div className='flex flex-row justify-center items-center  '>
                    <button className='bg-green-600 text-white rounded font-bold mx-6 my-2 px-2 py-2' onClick={toggleEditModal}>Edit</button>
                    <button className='bg-red-600 text-white rounded font-bold mx-4 my-2 px-2 py-2' onClick={handleDelete}>Delete</button>
                </div>
            </div>
        </>
    )
}
