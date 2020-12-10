import { Fragment } from "react";
import FaqsContainer from "./containers/faq";

import FooterContainer from "./containers/footer";
import JumbotronContainer from "./containers/jumbotron";

const App = () => {
  return (
    <Fragment>
      <JumbotronContainer />
      <FaqsContainer />
      <FooterContainer />
    </Fragment>
  );
};

export default App;
