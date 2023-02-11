import React from 'react'
import { Box, Heading, Text } from '@chakra-ui/react'


export default function SpecialCharTestView (props) {
    return (
        <Box>
            <Text> { props.specialCharTest } </Text>
        </Box>
    )
}