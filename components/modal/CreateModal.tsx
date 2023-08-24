import React from 'react';
import { Modal, ModalHeader } from 'reactstrap';
import Image from 'next/image';

interface CreateModalProps {
  contacts: any; // Adjust the type based on your contacts data structure
  isOpen: boolean;
  toggle: () => void;
}

const CreateModal: React.FC<CreateModalProps> = ({ contacts, isOpen, toggle }) => {
  return (
    <Modal size='lg' isOpen={isOpen} toggle={toggle}>
      <ModalHeader
        toggle={toggle}
        className='bg-blue-600 flex justify-space-between'
      >
        <div className='flex flex-row'>
          <div>
            <h1 className='m-4 text-white font-extrabold text-2xl'>
              Name: {contacts.name}
            </h1>
            <h2 className='m-4 text-white font-bold text-xl'>
              Contact No.: {contacts.number}
            </h2>
            <div className='flex flex-row m-4'>
              <h2 className='font-bold text-xl text-white'>Active:</h2>
              <h2
                className={`font-bold text-xl ml-2 ${
                  contacts.active ? 'text-green-700' : 'text-red-500'
                }`}
              >
                {contacts.active ? ' Yes' : ' No'}
              </h2>
            </div>
          </div>
          <Image src="/assets/person.png" alt="person" width={100} height={30} />
        </div>
      </ModalHeader>
    </Modal>
  );
};

export default CreateModal;
