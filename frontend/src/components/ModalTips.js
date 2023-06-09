import React from "react";
import { OrderedList, Kbd, Divider, HStack, ListItem, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react"


export default function ModalTips({isOpen, onOpen, onClose, ...props}) {
  return(
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent background="customBackground" color="grey">
        <ModalHeader>Tips and Tricks</ModalHeader>
        <ModalCloseButton />
        <ModalBody color="white">
          <HStack p="5px">
            <Divider orientation="vertical" />
            <OrderedList>
              <ListItem my="20px">
                Press on the test text and start typing to take a test!
              </ListItem>
              <ListItem my="20px">
                <span>Press <Kbd>Enter</Kbd> at the end of a line to go to the next line.</span>
              </ListItem>
              <ListItem my="20px">
                <span>If the line extends past the edge of the screen, press <Kbd>Right Arrow</Kbd> to view the other side of the text. <br/>
                Press <Kbd>Left Arrow</Kbd> or press <Kbd>Enter</Kbd> to move back to the beginning view of the lines.</span>
              </ListItem>
              <ListItem my="20px">
                <span>Press <Kbd>Shift</Kbd> then <Kbd>Tab</Kbd> while taking a test for a quick restart.</span><br/>
                <span>You can also <Kbd>Shift</Kbd> then <Kbd>Tab</Kbd> at the results page to quickly restart.</span>
              </ListItem>
            </OrderedList>
          </HStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme='red' mr={3} onClick={onClose}>
            Done
          </Button>
        </ModalFooter>
      </ModalContent>

    </Modal>
  );
}