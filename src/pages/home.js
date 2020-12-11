import { Fragment } from "react";

import HeaderContainer from "../containers/header";
import FaqsContainer from "../containers/faq";
import FooterContainer from "../containers/footer";
import JumbotronContainer from "../containers/jumbotron";
import { OptForm } from "../components";

const Home = () => {
  return (
    <Fragment>
      <HeaderContainer>
        <OptForm>
          <OptForm.Input placeholder="Email address" />
          <OptForm.Button>Try it now</OptForm.Button>
          <OptForm.Break />
          <OptForm.Text>
            Ready to watch? Enter your email to create or restart your membership
          </OptForm.Text>
        </OptForm>
      </HeaderContainer>

      <JumbotronContainer />
      <FaqsContainer />
      <FooterContainer />
    </Fragment>
  );
};

export default Home;
