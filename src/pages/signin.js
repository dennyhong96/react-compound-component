import { Fragment, useState, useRef, useContext } from "react";
import { useHistory } from "react-router-dom";

import { Form } from "../components";
import HeaderContainer from "../containers/header";
import FooterContainer from "../containers/footer";
import { FirebaseContext } from "../context/firebase";
import * as ROUTES from "../constants/routes";

// eslint-disable-next-line
const EMAIL_VALIDATOR = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const Signin = () => {
  const { auth } = useContext(FirebaseContext);
  const history = useHistory();

  const initialStateRef = useRef({
    email: "",
    password: "",
    error: "",
  });

  const [{ email, password, error }, setState] = useState(initialStateRef.current);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignin = async (evt) => {
    evt.preventDefault();

    // Handles invalid input
    const errors = [];
    if (!EMAIL_VALIDATOR.test(email)) errors.push(`${email} is not a valid email address.`);
    if (password.length < 8) errors.push(`Password must be at least 8 characters long.`);
    if (errors.length) {
      return handleChange({
        target: { name: "error", value: errors.join(" ") },
      });
    }

    // Firebase auth
    try {
      const res = await auth.signInWithEmailAndPassword(email, password);
      console.log(res);

      // Success, pushes to browse page
      history.push(ROUTES.BROWSE);
    } catch (error) {
      console.error("handleSignin Error", error);
      handleChange({
        target: { name: "error", value: error.message },
      });
    }
  };

  const isInvalid = () => !(password && email);

  return (
    <Fragment>
      {/* Header */}
      <HeaderContainer>
        {/* Form */}
        <Form>
          <Form.Title>Sign In</Form.Title>
          {error && <Form.ErrorMsg>{error}</Form.ErrorMsg>}
          <Form.Base onSubmit={handleSignin}>
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
              Sign In
            </Form.Submit>
            <Form.Text>
              New to Netflix? <Form.Link to="/signup">Sign up now.</Form.Link>
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

export default Signin;
