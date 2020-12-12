import { Fragment, useState, useRef, useContext } from "react";
import { useHistory } from "react-router-dom";

import { Form } from "../components";
import HeaderContainer from "../containers/header";
import FooterContainer from "../containers/footer";
import { FirebaseContext } from "../context/firebase";
import * as ROUTES from "../constants/routes";

// eslint-disable-next-line
const EMAIL_VALIDATOR = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const Signup = () => {
  const { auth } = useContext(FirebaseContext);
  const history = useHistory();

  const initialStateRef = useRef({
    email: "",
    password: "",
    firstName: "",
    error: "",
  });

  const [{ email, password, firstName, error }, setState] = useState(initialStateRef.current);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (evt) => {
    evt.preventDefault();

    // Handles invalid input
    const errors = [];
    if (!firstName) errors.push(`First name is required.`);
    if (!EMAIL_VALIDATOR.test(email)) errors.push(`${email} is not a valid email address.`);
    if (password.length < 8) errors.push(`Password must be at least 8 characters long.`);
    if (errors.length) {
      return handleChange({
        target: { name: "error", value: errors.join(" ") },
      });
    }

    // Firebase auth
    try {
      const { user } = await auth.createUserWithEmailAndPassword(email, password);
      await user.updateProfile({
        displayName: firstName,
        photoURL: Math.floor(Math.random() * 5) + 1,
      });

      // Success, pushes to browse page
      history.push(ROUTES.BROWSE);
    } catch (error) {
      console.error("handleSignup Error", error);
      handleChange({
        target: { name: "error", value: error.message },
      });
    }
  };

  const isInvalid = () => !(password && email && firstName);

  return (
    <Fragment>
      {/* Header */}
      <HeaderContainer>
        {/* Form */}
        <Form>
          <Form.Title>Sign Up</Form.Title>

          {/* Error Message */}
          {error && <Form.ErrorMsg>{error}</Form.ErrorMsg>}

          <Form.Base onSubmit={handleSignup}>
            <Form.Input
              placeholder="First name"
              value={firstName}
              onChange={handleChange}
              name="firstName"
            />
            <Form.Input
              placeholder="Email address"
              value={email}
              onChange={handleChange}
              name="email"
            />
            <Form.Input
              placeholder="Password"
              value={password}
              onChange={handleChange}
              autoComplete="off"
              name="password"
              type="password"
            />
            <Form.Submit disabled={isInvalid()} type="submit">
              Sign Up
            </Form.Submit>
            <Form.Text>
              Already a user? <Form.Link to="/signin">Sign in now.</Form.Link>
            </Form.Text>
            <Form.TextSmall>
              This page is protected by Google reCAPTCHA to ensure you're not a bot. Learn more.
            </Form.TextSmall>
          </Form.Base>
        </Form>
      </HeaderContainer>

      {/* Footer */}
      <FooterContainer />
    </Fragment>
  );
};

export default Signup;
