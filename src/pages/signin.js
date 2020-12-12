import { Fragment, useState, useRef } from "react";

import { Form } from "../components";
import HeaderContainer from "../containers/header";
import FooterContainer from "../containers/footer";

// eslint-disable-next-line
const EMAIL_VALIDATOR = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const Signin = () => {
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

  const handleSubmit = (evt) => {
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
  };

  const isInvalid = () => !(password && email);

  return (
    <Fragment>
      <HeaderContainer>
        <Form>
          <Form.Title>Sign In</Form.Title>
          {error && <Form.ErrorMsg>{error}</Form.ErrorMsg>}
          <Form.Base onSubmit={handleSubmit}>
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

      <FooterContainer />
    </Fragment>
  );
};

export default Signin;
