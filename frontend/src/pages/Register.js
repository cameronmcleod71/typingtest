import {
  Box,
  FormControl,
  Heading,
  Input,
  Container,
  Button,
  FormLabel,
  useDisclosure,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import CSRFToken from "../components/CSRFToken";
import { register, login } from "../utils/auth";
import { changeAuth } from "../redux/auth";
import { useSelector, useDispatch } from "react-redux";

export default function Register() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [alertVisible, setAlertVisible] = useState(false);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const { username, password } = formData;

  const onSubmit = (e) => {
    e.preventDefault();
    register(username, password).then((response) =>
      response.success
        ? login(username, password).then((authStatus) =>
            dispatch(changeAuth(authStatus))
          )
        : setAlertVisible(true)
    );
  };

  if (isAuthenticated === true) {
    navigate("/");
    window.location.reload();
  }

  return (
    <Container padding="20px" width="60%" centerContent>
      {alertVisible ? (
        <Alert
          status="error"
          variant="left-accent"
          width="auto"
          margin="20px"
          height="auto"
          visibility={alertVisible ? "visible" : "hidden"}
        >
          <AlertIcon />
          Registration failed.
        </Alert>
      ) : null}
      <Heading marginBottom="20px">Register</Heading>
      <Box width="100%">
        <Form onSubmit={(e) => onSubmit(e)} id="register-form" width="100%">
          <CSRFToken />
          <FormControl isRequired>
            <FormLabel>Username</FormLabel>
            <Input
              marginBottom="20px"
              type="text"
              placeholder="Username"
              name="username"
              onChange={(e) => onChange(e)}
              value={username}
            />
            <FormLabel>Password</FormLabel>
            <Input
              marginBottom="10px"
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e) => onChange(e)}
              value={password}
              minLength="6"
            />
          </FormControl>
        </Form>
      </Box>
      <Button
        colorScheme="red"
        form="register-form"
        marginBottom="40px"
        type="submit"
      >
        Complete
      </Button>
    </Container>
  );
}
