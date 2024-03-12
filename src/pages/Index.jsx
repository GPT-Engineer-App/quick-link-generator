import React, { useState } from "react";
import { Box, Container, VStack, Button, Input, Heading, Text, useToast, FormControl, FormLabel } from "@chakra-ui/react";
import { FaSignInAlt } from "react-icons/fa";

const Index = () => {
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = async () => {
    const response = await fetch("https://backengine-hrdv.fly.dev/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("accessToken", data.accessToken);
      setIsLoggedIn(true);
      toast({
        title: "Login successful",
        description: "You have successfully logged in.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } else {
      const errorData = await response.json();
      toast({
        title: "Login failed",
        description: errorData.error,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleSignup = async () => {
    const response = await fetch("https://backengine-hrdv.fly.dev/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.status === 204) {
      toast({
        title: "Signup successful",
        description: "Your account has been created. Please log in.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } else {
      const errorData = await response.json();
      toast({
        title: "Signup failed",
        description: errorData.error,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Container centerContent>
      <VStack spacing={4} mt={10}>
        <Heading>Welcome to Interactive API App</Heading>
        <Text>{isLoggedIn ? "You are logged in!" : "Please log in or sign up."}</Text>
        {!isLoggedIn && (
          <Box width="100%">
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input placeholder="Enter your email" onChange={(event) => setEmail(event.currentTarget.value)} />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input type="password" placeholder="Enter your password" onChange={(event) => setPassword(event.currentTarget.value)} />
            </FormControl>
            <Button leftIcon={<FaSignInAlt />} colorScheme="teal" width="full" mt={4} onClick={handleLogin}>
              Login
            </Button>
            <Button colorScheme="blue" width="full" mt={2} onClick={handleSignup}>
              Signup
            </Button>
          </Box>
        )}
      </VStack>
    </Container>
  );
};

export default Index;
