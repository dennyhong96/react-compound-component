import { Header, Profiles } from "../components";
import Logo from "../logo.svg";
import * as ROUTES from "../constants/routes";
import { Fragment } from "react";

const SelectProfileContainer = ({ user, setProfile }) => {
  return (
    <Fragment>
      <Header bg={false}>
        <Header.Frame>
          <Header.Logo to={ROUTES.HOME} src={Logo} alt="Netflix" />
        </Header.Frame>
      </Header>

      <Profiles>
        <Profiles.Title>Who's watching?</Profiles.Title>
        <Profiles.List>
          <Profiles.Item
            onClick={() =>
              setProfile({
                displayName: user.displayName,
                photoURL: user.photoURL,
              })
            }
          >
            <Profiles.Picture src={user.photoURL} />
            <Profiles.Name>{user.displayName}</Profiles.Name>
          </Profiles.Item>
        </Profiles.List>
      </Profiles>
    </Fragment>
  );
};

export default SelectProfileContainer;
