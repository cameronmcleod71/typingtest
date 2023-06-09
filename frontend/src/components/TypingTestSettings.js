import React, { useContext } from "react";
import { SettingsContext } from "../context/Context";
import { Box, Text, IconButton, useDisclosure, HStack, Spacer, Flex, Grid, GridItem } from "@chakra-ui/react";
import { SettingsIcon, InfoIcon } from "@chakra-ui/icons";
import ModalSettings from "./ModalSettings";
import ModalTips from "./ModalTips";

export default function TypingTestSettings() {
  const { settings, setSettings, choices } = useContext(SettingsContext);

  const { isOpen: isSettingsOpen, onOpen: onSettingsOpen, onClose: onSettingsClose } = useDisclosure();
  const { isOpen: isTipsOpen, onOpen: onTipsOpen, onClose: onTipsClose } = useDisclosure();

  return (
    <Box width="100%">
      <Grid templateColumns="repeat(2, 1fr)" width="auto">
        <GridItem display={{base: "none", sm: "flex"}}>
          <Box fontSize={{sm: "10px", lg: "14px"}} color="settingsText" paddingRight="10px" minWidth="max-content" w="auto">
            <Text>Test type: {choices.type[settings[0]]}</Text>
            <Text>Language: {choices.language[settings[1]]}</Text>
            <Text>Test type: {choices.duration[settings[2]]}</Text>
          </Box>
        </GridItem>
        <GridItem display="flex" justifyContent="flex-end" alignItems="center">
          <Flex>
            <Spacer />
            <Box marginRight="10px">
              <IconButton
                variant="outline"
                onClick={onTipsOpen}
                borderWidth="2px"
                icon={<InfoIcon />}
                size={{base: "sm", sm: "sm", lg: "md"}}
                colorScheme="red"
              />
              <ModalTips isOpen={isTipsOpen} onOpen={onTipsOpen} onClose={onTipsClose} />
            </Box>
            <Box>
              <IconButton
                icon={<SettingsIcon />}
                onClick={onSettingsOpen}
                size={{base: "sm", sm: "sm", lg: "md"}}
                colorScheme="red"
              />
              <ModalSettings isOpen={isSettingsOpen} onOpen={onSettingsOpen} onClose={onSettingsClose} />
            </Box>
          </Flex>
        </GridItem>
      </Grid>
    </Box>
  );
}
