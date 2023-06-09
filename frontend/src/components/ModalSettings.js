import React, { useState, useContext } from "react";
import { SettingsContext } from "../context/Context";
import { FormControl, Select, FormLabel, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react"

export default function ModalSettings({isOpen, onOpen, onClose, ...props}) {
  const { settings, setSettings, choices } = useContext(SettingsContext);
  const [testType, setTestType] = useState("");
  const [testLang, setTestLang] = useState("");
  const [testDuration, setTestDuration] = useState("");

  function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }

  return(
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent background="customBackground" color="grey">
        <ModalHeader>Typing Test Settings</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form id="settings-form"
            onSubmit={(event) => {
              event.preventDefault();
              setSettings([getKeyByValue(choices.type, testType), getKeyByValue(choices.language, testLang), getKeyByValue(choices.duration, testDuration)])
            }}>
            <FormControl isRequired mb="20px">
              <FormLabel> Typing Test Type </FormLabel>
              <Select placeholder='Select test type' onChange={(e) => setTestType(e.target.value)}>
                <option>{choices.type[Object.keys(choices.type)[0]]}</option>
                <option>{choices.type[Object.keys(choices.type)[1]]}</option>
              </Select>
            </FormControl>
              {testType === "Programming Test" ? 
                <FormControl isRequired mb="20px">
                  <FormLabel>Language Type</FormLabel>
                  <Select placeholder="Select a programming language" onChange={(e) => setTestLang(e.target.value)}>
                    <option>Python</option>
                    {/* <option>Javascript</option>
                    <option>Java</option> */}
                  </Select>
                </FormControl>
                : <></>}
            <FormControl isRequired mb="20px">
              <FormLabel>Test Duration</FormLabel>
              <Select placeholder='Select a duration' onChange={(e) => setTestDuration(e.target.value)}>
                <option>10s</option>
                <option>1m</option>
                <option>5m</option>
              </Select>
            </FormControl>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button type="submit" form="settings-form" colorScheme='red' mr={3} onClick={onClose}>
            Done
          </Button>
        </ModalFooter>
      </ModalContent>

    </Modal>
  );
};