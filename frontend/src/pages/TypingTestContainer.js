import React, { useState } from "react";
import { Box, Grid, GridItem, VStack, Flex } from "@chakra-ui/react";
import ProgrammingTypingTest from "../components/ProgrammingTypingTest";
import TestNavbar from "../components/TestNavbar";
import { SettingsContext, FlipTextContext } from "../context/Context";
import Crate from "../components/Crate";
import Dashboard from "../components/Dashboard";
import TypingTestSettings from "../components/TypingTestSettings";
import {
  setTypingTestDuration,
  getTypingTestDuration,
} from "../utils/typingtest";
import SpecialCTypingTest from "../components/SpecialCTypingTest";
import { useEffect } from "react";

export default function TypingTestContainer() {
  const loadSettings =
    localStorage.getItem("settings") !== null
      ? JSON.parse(localStorage.getItem("settings"))
      : ["programmer", "python", 60];

  const [settings, setSettings] = useState(loadSettings);
  const [flipText, setFlipText] = useState(false);
  const choices = {
    type: { programmer: "Programming Test", special: "Special Character Test" },
    language: { python: "Python" },
    duration: { 10: "10s", 30: "30s", 60: "1m", 120: "2m", 300: "5m" },
  };
  useEffect(() => {
    setTypingTestDuration(settings[2]);
    localStorage.setItem("settings", JSON.stringify(settings));
  }, [settings]);
  return (
    <Box width="auto" height="100%">
      <Box minWidth="auto" width="auto" height="100%">
        <SettingsContext.Provider value={{ settings, setSettings, choices }}>
          <Flex
            // width="auto"
            // minWidth="min-content"
            // justifyContent="flex-end"
            // wrap={{base: "wrap", sm: "nowrap"}}
            minWidth="auto"
            width="auto"
          >
            <Crate
              borderingCrates={["Top", "Bottom", "Right"]}
              p="20px"
              // flexGrow="1"
              // boxSizing="border-box"
              w="100%"
              h={{ base: "70px", md: "70px", lg: "80px" }}
              display="flex"
              alignItems="center"
            >
              <Dashboard testDuration={settings[2]} />
            </Crate>
            <Crate
              borderingCrates={["Top", "Bottom", "Left"]}
              p="20px"
              h={{ base: "70px", md: "70px", lg: "80px" }}
              display="flex"
              alignItems="center"
              width="100%"
              // boxSizing="border-box"
            >
              <TypingTestSettings />
            </Crate>
          </Flex>
          {/* <Crate borderingCrates={["Top"]} height="100%"> */}
          <Box
            id="hello1235"
            boxSizing="border-box"
            display="flex"
            justifyContent={"flex-" + (flipText === false ? "start" : "end")}
            // justifyContent={(settings[0] === "programmer" ? "flex-" + (flipText === false ? "start" : "end") : "center")}
            paddingX="30px"
            overflow="hidden"
            height="100%"
          >
            <FlipTextContext.Provider value={{ flipText, setFlipText }}>
              {settings[0] === "programmer" ? (
                <ProgrammingTypingTest language={settings[1]} />
              ) : (
                <SpecialCTypingTest />
              )}
            </FlipTextContext.Provider>
          </Box>
          {/* </Crate> */}
        </SettingsContext.Provider>
      </Box>
    </Box>
  );
}
