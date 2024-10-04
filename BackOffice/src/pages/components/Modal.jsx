// UserModal.jsx
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  Box,
} from "@chakra-ui/react";
import * as yup from 'yup';
import { useState } from "react";

const UserModal = ({ isOpen, onClose, isEditMode, newUser, onInputChange, onSave }) => {

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent w='500px'>
        <ModalHeader textColor="#482D19" fontFamily='Inter' fontSize='40' fontWeight='normal' mb='30px'>{isEditMode ? "Edit Benutzer" : "Profil bearbeiten"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <Box display='flex' mb='33' justifyContent='space-between'>
              <FormLabel textColor='#482D19' fontSize='16'>Full Name</FormLabel>
              <Input borderColor='#482D19' w='273' name="fullName" value={newUser.fullName} onChange={onInputChange} />
            </Box>
            <Box display='flex' mb='33' justifyContent='space-between'>
              <FormLabel textColor='#482D19'>Username</FormLabel>
              <Input borderColor='#482D19' w='273' name="username" value={newUser.username} onChange={onInputChange} />
            </Box>
            <Box display='flex' mb='33' justifyContent='space-between'>
              <FormLabel textColor='#482D19'>Password</FormLabel>
              <Input borderColor='#482D19' w='273' name="password" type="password" value={newUser.password} onChange={onInputChange} />
            </Box>
            <Box display='flex' mb='33' justifyContent='space-between'>
              <FormLabel textColor='#482D19'>Function</FormLabel>
              <Input borderColor='#482D19' w='273' name="function" value={newUser.function} onChange={onInputChange} />
            </Box>
            <Box display='flex' mb='33' justifyContent='space-between'>
              <FormLabel textColor='#482D19'>IDNR</FormLabel>
              <Input borderColor='#482D19' w='273' name="idnr" value={newUser.idnr} onChange={onInputChange} />
            </Box>

            <Box display='flex' mb='33' justifyContent='space-between'>
              <FormLabel textColor='#482D19'>Role</FormLabel>
              <Input borderColor='#482D19' w='273' name="role" value={newUser.role} onChange={onInputChange} />
            </Box>

            <Box display='flex' mb='33' justifyContent='space-between'>
              <FormLabel textColor='#482D19'>Workload</FormLabel>
              <Input  borderColor='#482D19' w='273' name="workload" value={newUser.workload} onChange={onInputChange} />
            </Box>

          </FormControl>
        </ModalBody>
        <ModalFooter display='flex' alignItems='center' justifyContent='center'>
          <Button bgColor='#482D19' textColor='white' onClick={onSave}>
            {isEditMode ? "zu aktualisieren" : "zu aktualisieren"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UserModal;
