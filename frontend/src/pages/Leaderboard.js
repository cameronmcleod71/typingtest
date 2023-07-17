import React, { useRef, useState, useEffect } from "react";
import {
  Box,
  Text,
  Heading,
  SimpleGrid,
  VStack,
  Card,
  CardHeader,
  CardBody,
} from "@chakra-ui/react";
import { getLeaderboard } from "../utils/typingtestresults";

function getMonthName(monthNumber) {
  const date = new Date();
  date.setMonth(monthNumber - 1);

  return date.toLocaleString('en-US', {
    month: 'long',
  });
}

export default function Leaderboard() {
  const [topScores, setTopScores] = useState([]);
  useEffect(() => {
    try {
      getLeaderboard().then((leaderboard) => {
        setTopScores(leaderboard);
      });
    } catch {
      console.log("something went wrong grabbing past results");
    }
  }, []);
  return (
    <Box width="100%" padding="20px">
      <VStack width="100%">
        <Heading colorScheme="red">Leaderboard</Heading>
        <SimpleGrid columns={{sm:2, md:3}} width="100%" spacing={5} paddingY="10px">
          {topScores.map((item, index) => {
            return (
              <Card direction="row" height="200px" bg="customForeground" color="settingsText">
                <CardHeader paddingX="20px" paddingLeft="20px" width="90px" whiteSpace="nowrap">
                  <Heading fontSize="5xl" color={index+1 === 1 ? "#e0c56e" : (index+1 === 2 ? "#d5d5d7" : (index+1 === 3 ? "#B08D57" : "settingsText"))}>{index + 1}</Heading>
                </CardHeader>
                <CardBody>
                  <Text fontSize={{"sm":"md", lg:"xl"}}>{item.name}</Text>
                  <Text>{getMonthName(item.time_taken.month)+" "+item.time_taken.day+", "+item.time_taken.year}</Text>
                  <Text fontSize={{"sm":"lg", lg:"2xl"}}>{item.score+"wpm"}</Text>
                </CardBody>
              </Card>
            );
          })}
        </SimpleGrid>
      </VStack>
    </Box>
  );
}
