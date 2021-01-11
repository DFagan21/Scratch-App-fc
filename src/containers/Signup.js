import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { useHistory } from "react-router-dom";
import LoaderButton from "../components/LoaderButton";
import { useAppContext } from "../libs/contextLib";
import { useFormFields } from "../libs/hooksLib";
import { onError } from "../libs/errorLib";
import "./Signup.css";
import { Auth } from "aws-amplify";

export default function Signup() {
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: "",
    confirmPassword: "",
    confirmationCode: "",
    controllers: "",
    companyname: "",
    companyaddress: "",
    name: ""
  });
  const history = useHistory();
  const [newUser, setNewUser] = useState(null);
  const { userHasAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return (
      fields.email.length > 0 &&
      fields.password.length > 0 &&
      fields.password === fields.confirmPassword
    );
  }

  function validateConfirmationForm() {
    return fields.confirmationCode.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);

    try {
      const newUser = await Auth.signUp({
        username: fields.email,
        password: fields.password,
        attributes: {
          name: fields.name,
          address: fields.companyaddress,
          "custom:custom:Controllers": fields.controllers,
          "custom:custom:CompanyName": fields.company
        }
      });
      setIsLoading(false);
      setNewUser(newUser);
    } catch (e) {
      if (e.name === "UsernameExistsException") {
        resendSignUpAfterRefresh();
      } else {
        onError(e);
        setIsLoading(false);
      }
    }
  }

  async function handleConfirmationSubmit(event) {
    event.preventDefault();

    setIsLoading(true);

    try {
      await Auth.confirmSignUp(fields.email, fields.confirmationCode);
      await Auth.signIn(fields.email, fields.password);

      userHasAuthenticated(true);
      history.push("/");
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  async function forgotPassword(event) {
    Auth.forgotPassword(fields.email)
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }
  async function resendSignUpAfterRefresh() {
    try {
      var res = null;
      const newUser = fields.email;
      setIsLoading(false);
      setNewUser(newUser);
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }
  function renderConfirmationForm() {
    return (
      <Form onSubmit={handleConfirmationSubmit}>
        <Form.Group controlId="confirmationCode" size="lg">
          <Form.Label>Confirmation Code</Form.Label>
          <Form.Control
            autoFocus
            type="tel"
            onChange={handleFieldChange}
            value={fields.confirmationCode}
          />
          <Form.Text muted>Please check your email for the code.</Form.Text>
        </Form.Group>
        <LoaderButton
          block
          size="lg"
          type="submit"
          variant="success"
          isLoading={isLoading}
          disabled={!validateConfirmationForm()}
        >
          Verify
        </LoaderButton>
      </Form>
    );
  }

  function renderForm() {
    return (
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="email" size="lg">
          <Form.Label>Email (this will be your login)</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={fields.email}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={fields.name}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="company">
          <Form.Label>Company</Form.Label>
          <Form.Control
            type="text"
            value={fields.company}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="companyaddress">
          <Form.Label>Company Address</Form.Label>
          <Form.Control
            type="text"
            value={fields.companyaddress}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="controllers">
          <Form.Label>Controllers for machines sold with FastCAM:</Form.Label>
          <Form.Control
            type="text"
            value={fields.controllers}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Form.Group controlId="password" size="lg">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={fields.password}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Form.Group controlId="confirmPassword" size="lg">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            onChange={handleFieldChange}
            value={fields.confirmPassword}
          />
        </Form.Group>
        <LoaderButton
          block
          size="lg"
          type="submit"
          variant="success"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Signup
        </LoaderButton>
        <div onClick={forgotPassword}>Forgot Password?</div>
      </Form>
    );
  }

  return (
    <div className="Signup">
      {newUser === null ? renderForm() : renderConfirmationForm()}
    </div>
  );
}
