import React, { useState } from "react";
import {
  Box,
  Text,
  Grid,
  GridItem,
  VStack,
  Container,
  HStack,
  Flex,
} from "@chakra-ui/react";
import Crate from "../components/Crate";
import Dashboard from "../components/Dashboard";
import TypingTestSettings from "../components/TypingTestSettings";
import { SettingsContext } from "../context/Context";
import SpecialCTypingTest from "../components/SpecialCTypingTest";
import ProgrammingTypingTest from "../components/ProgrammingTypingTest";


export default function TestLayout() {
  const loadSettings =
    localStorage.getItem("settings") !== null
      ? JSON.parse(localStorage.getItem("settings"))
      : ["programmer", "python", 60];

  const [settings, setSettings] = useState(loadSettings);
  const choices = {
    type: { programmer: "Programming Test", special: "Special Character Test" },
    language: { python: "Python" },
    duration: { 10: "10s", 30: "30s", 60: "1m", 120: "2m", 300: "5m" },
  };
  return (
    <Box width="auto">
      <Box>
        <SettingsContext.Provider value={{ settings, setSettings, choices }}>
          <Flex
            // width="auto"
            // minWidth="min-content"
            // justifyContent="flex-end"
          >
            <Crate
              borderingCrates={["Top", "Bottom", "Right"]}
              p="20px"
              flexGrow="1"
              // boxSizing="border-box"
              w="auto"
              h="100px"
              display="flex"
              alignItems="center"
            >
              <Dashboard testDuration={settings[2]} />
            </Crate>
            <Crate
              borderingCrates={["Top", "Bottom", "Left"]}
              p="20px"
              h="100px"
              display="flex"
              alignItems="center"
              // boxSizing="border-box"
            >
              <TypingTestSettings />
            </Crate>
          </Flex>
          <Box>
            {settings[0] === "programmer" ? (
              <ProgrammingTypingTest />
            ) : (
              <SpecialCTypingTest />
            )}
          </Box>
        </SettingsContext.Provider>
      </Box>
    </Box>
  );
}
