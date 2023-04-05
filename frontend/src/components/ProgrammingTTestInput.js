import React from 'react'
import { Box, Input, FormHelperText, FormControl } from '@chakra-ui/react'
import { Form } from 'react-router-dom'



export default function ProgrammingTTestInput(props) {
    // let formData = "";
    return (
        <Box maxW="480px">
            <Form autoComplete='off'>
                <FormControl textAlign='center'>
                    <Input type="text" name="input" color="#abb2bf"  onKeyPress={(e) => props.handleKeyPress(e)} onKeyDown={(e) => props.handleKeyDown(e)}/>
                    <FormHelperText>Type here.</FormHelperText>
                </FormControl>
            </Form>
        </Box>
    )
}