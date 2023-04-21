import React from "react";
import { Box, Grid, GridItem } from "@chakra-ui/react";
import ProgrammingTypingTest from "../components/ProgrammingTypingTest";
import TestNavbar from "../components/TestNavbar";


export default function ProgrammingTypingTestContainer() {

    return (
        <Box>
             <Grid templateColumns="repeat(12, 1f)">
                 <GridItem colSpan="1" w="100%" minHeight="100%" borderRight="1px" borderColor="#0B1121" minWidth={{base:"140px",lg:"250px"}}>
                    <TestNavbar />
                 </GridItem>
                 <GridItem colStart="2" colEnd="13" minHeight="100vh" display="flex" justifyContent="flex-start">
                     <ProgrammingTypingTest />
                 </GridItem>
             </Grid>
        </Box>
    );

}