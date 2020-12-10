import { Fragment } from "react";

import FooterContainer from "./containers/footer";
import JumbotronContainer from "./containers/jumbotron";

const App = () => {
  return (
    <Fragment>
      <JumbotronContainer />
      <FooterContainer />
    </Fragment>
  );
};

export default App;
