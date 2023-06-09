import React, { useEffect, useState } from "react";
import Timer from "./Timer";
import {
  Box,
  VStack,
  IconButton,
  Text,
  HStack,
  Spacer,
  Flex,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import {
  getLatestRuntimeResult,
  getTypingTestDuration,
} from "../utils/typingtest";
import { RepeatIcon } from "@chakra-ui/icons";

export default function Dashboard({ testDuration, ...props }) {
  const [timeRemaining, setTimeRemaining] = useState(1);

  useEffect(() => {
    setTimeRemaining(testDuration);
  }, [testDuration]);

  const [stats, setStats] = useState({ speed: 0, accuracy: 0 });

  useEffect(() => {
    const newStats = getLatestRuntimeResult();
    setStats((prevStats) => ({ speed: newStats[0], accuracy: newStats[1] }));
  }, [timeRemaining]);

  return (
    <Grid templateColumns="repeat(2, 1fr)" width="auto">
      <GridItem
        display="flex"
        justifyContent="flex-start"
        align="center"
        h="auto"
      >
        <Timer
          timeRemaining={timeRemaining}
          setTimeRemaining={setTimeRemaining}
          color="white"
          marginRight={{ base: "10px", md: "20px" }}
          // marginRight="20px"
          boxSizing="border-box"
        />
        <Spacer />
        <HStack
          boxSizing="border-box"
          marginX={{ base: "2px", md: "20px" }}
          display={{ base: "none", sm: "flex" }}
        >
          <Text color="settingsText" fontSize={{ base: "11px", md: "15px" }}>
            {" "}
            Accuracy{" "}
          </Text>
          <Text color="white" fontSize={{ base: "20px", md: "30px" }}>
            {" "}
            {stats.accuracy}{" "}
          </Text>
        </HStack>
        <HStack
          marginLeft={{ base: "2px", md: "20px" }}
          display={{ base: "none", sm: "flex" }}
        >
          <Text color="settingsText" fontSize={{ base: "11px", md: "15px" }}>
            {" "}
            Speed{" "}
          </Text>
          <Text color="white" fontSize={{ base: "20px", md: "30px" }}>
            {" "}
            {stats.speed}{" "}
          </Text>
        </HStack>
      </GridItem>
      <GridItem display="flex" justifyContent="flex-end" alignItems="center">
        <Spacer />
        <IconButton
          id="repeatAutoFocus"
          tabIndex="1"
          icon={<RepeatIcon />}
          colorScheme="red"
          onClick={() => window.location.reload()}
          marginLeft={{ base: "10px", md: "20px" }}
          size={{ base: "sm", sm: "sm", lg: "md" }}
        />
      </GridItem>
    </Grid>
  );
}
