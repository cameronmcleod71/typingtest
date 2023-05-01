import { Box } from "@chakra-ui/react";
import React from "react";


export default function Crate({borderingCrates, ...props}) {
    const margin = 30;

    let crateMargins = {
        marginLeft: margin.toString() + "px",
        marginRight: margin.toString() + "px",
        marginTop: margin.toString() + "px",
        marginBottom: margin.toString() + "px",
    };

    for (side in borderingCrates) {
        crateMargins["margin"+side] = margin / 2;
    }

    return (
        <Box bg="customForeground" borderRadius="15px" {...crateMargins}>
            
        </Box>
    );

}