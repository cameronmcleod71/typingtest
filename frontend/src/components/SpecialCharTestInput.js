import React from 'react'
import { Heading, Box, Input, FormHelperText, FormControl } from '@chakra-ui/react'
import { Form } from 'react-router-dom'



export default function SpecialCharTestInput() {
    return (
        <Box maxW="480px">
            <Form>
                <FormControl>
                    <Input type="text" name="input" />
                    <FormHelperText>Type here.</FormHelperText>
                </FormControl>
            </Form>
        </Box>
    )
}