import { ModalOverlay,Modal,ModalContent,ModalHeader,ModalCloseButton,ModalBody,ModalFooter } from "@chakra-ui/modal";
import  {Button} from "@chakra-ui/react"
import { FC, ReactNode } from "react";
import { Formik,Form } from "formik";
import * as Yup from "yup";
import TextField from "../TextField";


type AddModalProps = {
  isOpen:boolean;
  onClose:any;
}
const AddFriendModal:FC<AddModalProps> = ({isOpen,onClose}) => {
  return (
   <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Friend</ModalHeader>
          <ModalCloseButton />
          <Formik
        initialValues={{ friendName: ""}}
        onSubmit={(values,actions)=>{
            console.log(values);
            onClose()
            actions.resetForm();
        }}
         validationSchema={Yup.object({
          friendName: Yup.string()
            .required("Friend's Name required")
            .min(6, "Friend's Name too short")
            .max(28, "Friend's Name too long!"),
        })}
        >
        <Form>
          <ModalBody>
           <TextField
            label="Friend's name"
            placeholder="Enter your friend name"
            autoComplete='off'
            name="friendName"
           />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" type="submit">Submit</Button>
          </ModalFooter>
          </Form>
          </Formik>
        </ModalContent>
    </Modal>
  )
}

export default AddFriendModal