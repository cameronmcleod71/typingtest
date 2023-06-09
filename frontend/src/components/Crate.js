import { Box } from "@chakra-ui/react";
import React from "react";


export default function Crate({borderingCrates, noPadding, children, ...props}) {
    const padding = 16;

    let cratePadding = {
        paddingLeft: padding.toString() + "px",
        paddingRight: padding.toString() + "px",
        paddingTop: padding.toString() + "px",
        paddingBottom: padding.toString() + "px",
    };

    for (let i in borderingCrates) {
        cratePadding["padding"+borderingCrates[i]] = (padding/2).toString() + "px";
    }

    for (let i in noPadding) {
        cratePadding["padding"+noPadding[i]] = "0px";
    }

    return (
        <Box {...cratePadding} boxSizing="border-box" width="100%">
            <Box boxSizing="border-box" bg="customForeground" h="auto" w="auto" borderRadius="15px" {...props}>
                { children }
            </Box>
        </Box>
    );

}