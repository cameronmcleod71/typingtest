import {
  Box,
  Button,
  FormControl,
  Heading,
  Input,
  Text,
  Container,
  Alert,
  AlertIcon,
  FormLabel,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Form, Link, Navigate, useNavigate } from "react-router-dom";
import CSRFToken from "../components/CSRFToken";
import { useSelector, useDispatch } from "react-redux";
import { changeAuth } from "../redux/auth";
import { login } from "../utils/auth";

export default function Login() {
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
    login(username, password).then((authStatus) => {
      dispatch(changeAuth(authStatus));
      if (!authStatus) setAlertVisible(true);
    });
  };

  if (isAuthenticated === true) {
    navigate("/");
    window.location.reload();
  }

  return (
    <Container color="#abb2bf" padding="20px" width="60%" centerContent>
      {alertVisible ? (
        <Alert
          status="error"
          variant="left-accent"
          width="auto"
          margin="20px"
          height="auto"
        >
          <AlertIcon />
          Login failed. The username or password used did not match.
        </Alert>
      ) : null}
      <Heading marginBottom="20px">Sign In</Heading>
      <Box width="100%">
        <Form onSubmit={(e) => onSubmit(e)} id="sign-in-form">
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
        form="sign-in-form"
        marginBottom="40px"
        type="submit"
      >
        Sign in
      </Button>
      <Text>Havn't made an account? </Text>
      {/* <Link as="Button" variant="link" to='/register'>Register Here!</Link> */}
      <Link to="/register">
        <Button variant="link">Register Here!</Button>
      </Link>
    </Container>
  );
}
