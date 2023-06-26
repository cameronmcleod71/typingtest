import React from "react";
import { Box, Grid, GridItem } from "@chakra-ui/react";
import ProgrammingTypingTest from "../components/ProgrammingTypingTest";
import TestNavbar from "../components/TestNavbar";


export default function ProgrammingTypingTestContainer() {

    return (
        <Box height="100%">
             <Grid templateColumns="repeat(12, 1f)" height="100%">
                 <GridItem colSpan="1" w="100%" minHeight="100%" borderRight="1px" borderColor="#0B1121" minWidth={{base:"140px",lg:"250px"}}>
                    <TestNavbar />
                 </GridItem>
                 <GridItem colStart="2" colEnd="13" minHeight="100vh" display="flex" justifyContent="flex-start" height="100%">
                     <ProgrammingTypingTest />
                 </GridItem>
             </Grid>
        </Box>
    );

}