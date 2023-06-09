import { Card, CardBody, Stack, Stat, StackDivider, StatLabel, StatNumber} from '@chakra-ui/react';

function getMonthName(monthNumber) {
  const date = new Date();
  date.setMonth(monthNumber - 1);

  return date.toLocaleString('en-US', {
    month: 'long',
  });
}


export default function ResultCard({accuracy, wpm, cpm, type, duration, timestamp, ...props}) {
  return (
    <Card
        //   width="800px"
        width={{ base: "250px", md: "500px", lg: "800px" }}
        paddingLeft="20px"
        bg="customForeground"
        marginBottom="30px"
      >
        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            <Stat>
              <StatLabel>Time</StatLabel>
              <StatNumber>{getMonthName(timestamp["month"])} {timestamp["day"]} at {timestamp["hour"]}:{timestamp["minute"]}</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Duration</StatLabel>
              <StatNumber>{duration}</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Words Per Minute</StatLabel>
              <StatNumber>{wpm}wpm</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Characters Per Minute</StatLabel>
              <StatNumber>{cpm}cpm</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Accuracy</StatLabel>
              <StatNumber>{accuracy}%</StatNumber>
            </Stat>
          </Stack>
        </CardBody>
      </Card>
  );
}