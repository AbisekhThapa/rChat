import { Button, ButtonGroup, Heading, Text, VStack } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import TextField from "../TextField";
import { useNavigate } from "react-router-dom";
import { ArrowBackIcon } from "@chakra-ui/icons";
// import { formSchema } from "@rchat/common";
import * as Yup from "yup";
import { useContext, useState } from "react";
import { AccountContext } from "../AccountContext";

const Signup = () => {
  const { setUser } = useContext(AccountContext);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  return (
    <div>
      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={Yup.object({
          username: Yup.string()
            .required("Username required")
            .min(6, "Username too short")
            .max(28, "Username too long!"),
          password: Yup.string()
            .required("Password required")
            .min(6, "Password too short")
            .max(28, "Password too long!"),
        })}
        onSubmit={(values, actions) => {
          const vals = { ...values };
          actions.resetForm();
          fetch("http://localhost:8000/auth/signup", {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(vals),
          })
            .then((res) => {
              if (!res || !res.ok || res.status >= 400) {
                return;
              }
              return res.json();
            })
            .then((data) => {
              if (!data) return;
              setUser({ ...data });

              if (data?.status) {
                setError(data.status);
              } else if (data.loggedIn) {
                navigate("/home");
              }
            })
            .catch((errs) => {
              return;
            });
        }}
      >
        <VStack
          as={Form}
          w={{ base: "90%", md: "500px" }}
          m={"auto"}
          justify={"center"}
          h={"100vh"}
          spacing={"1rem"}
        >
          <Heading>Sign up</Heading>
          <Text as={"p"} color={"red.500"}>
            {error}
          </Text>

          <TextField
            name="username"
            label="User Name"
            placeholder="Enter username"
          />
          <TextField
            name="password"
            label="Password"
            placeholder="Enter password"
            type="password"
          />
          <ButtonGroup pt={"1rem"}>
            <Button colorScheme="teal" type="submit">
              Create Account
            </Button>
            <Button onClick={() => navigate("/")} leftIcon={<ArrowBackIcon />}>
              Back
            </Button>
          </ButtonGroup>
        </VStack>
      </Formik>
    </div>
  );
};

export default Signup;
