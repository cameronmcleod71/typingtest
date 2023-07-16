import React, { useEffect } from "react";
import {
  Heading,
  VStack,
  Flex,
  Button,
  Box,
  Stat,
  StatLabel,
  StatNumber,
  StackDivider,
  StatHelpText,
  StatGroup,
  Stack,
  Card,
  CardBody,
  useToast,
} from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { calculateStats } from "../utils/results";
import { saveResults } from "../utils/typingtestresults";
import { testReset } from "../redux/testStatus";

export default function ResultsPage() {
  const dispatch = useDispatch();
  const { state } = useLocation();
  const testResults = state.completedEntries;
  const testType = state.type;
  const testDuration = state.duration;
  const testLang = state.language;
  const leaderboardData = state.leaderboardData;
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const toast = useToast();
  const d = new Date();

  const calculatedResults = calculateStats(testResults, testType, testDuration);

  function addZero(i) {
    if (i < 10) {i = "0" + i}
    return i;
  }
  const testPackage = {
    test: testResults,
    duration: testDuration,
    results: calculatedResults,
    wpm: calculatedResults["wpm"],
    test_type: testType,
    language: (testLang === null ? "" : testLang),
    time_taken: {"year":d.getFullYear().toString(),"month":(d.getMonth()+1).toString(), "day":d.getDate().toString().toString(), "hour":addZero(d.getHours()).toString(), "minute":addZero(d.getMinutes()).toString()}
  };

  //compare wpm to leaderboard data => if there is a spot for them, and they havnt logged in, try to get them to log in or create an account => once they do send completed test to server
  
  if (isAuthenticated) {
    saveResults(testPackage);
  }

  return (
    <Box p="20px">
      <VStack>
        <Flex
          justify={{ base: "center", md: "flex-start" }}
          width={{ base: "250px", md: "500px", lg: "800px" }}
          paddingLeft="10px"
        >
          <Heading>Your Results</Heading>
        </Flex>
        <Card
          //   width="800px"
          width={{ base: "250px", md: "500px", lg: "800px" }}
          paddingLeft="20px"
          bg="customForeground"
        >
          <CardBody>
            <Stack divider={<StackDivider />} spacing="4">
              <Stat>
                <StatLabel>Words Per Minute</StatLabel>
                <StatNumber>{calculatedResults.wpm}wpm</StatNumber>
              </Stat>
              <Stat>
                <StatLabel>Characters Per Minute</StatLabel>
                <StatNumber>{calculatedResults.cpm}cpm</StatNumber>
              </Stat>
              <Stat>
                <StatLabel>Accuracy</StatLabel>
                <StatNumber>{calculatedResults.accuracy}%</StatNumber>
              </Stat>
            </Stack>
          </CardBody>
        </Card>
        <Flex
          justify={{ base: "center", md: "flex-end" }}
          width={{ base: "250px", md: "500px", lg: "800px" }}
          paddingY="10px"
        >
          <Button
            size={{ base: "sm", md: "md" }}
            marginRight="10px"
            colorScheme="red"
            variant="outline"
            borderWidth="3px"
            tabIndex="2"
            onClick={() =>
                toast({
                  title: "To Be Completed",
                  variant: "solid",
                  isClosable: true,
                })
              }
          >
            {" "}
            Share{" "}
          </Button>
          <Link to="/">
            <Button
              marginLeft="10px"
              colorScheme="red"
              size={{ base: "sm", md: "md" }}
              tabIndex="1"
            >
              {" "}
              Retake{" "}
            </Button>
          </Link>
        </Flex>
      </VStack>
    </Box>
  );
}
