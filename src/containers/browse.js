import { useState, useEffect, Fragment, useContext } from "react";

import { Loading, Header } from "../components";
import { AuthContext } from "../context/auth";
import SelectProfileContainer from "./profile";
import Logo from "../logo.svg";
import * as ROUTES from "../constants/routes";

const BrowseContainer = ({ slides }) => {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const {
    auth: { user },
    signOut,
  } = useContext(AuthContext);

  useEffect(() => {
    if (profile.displayName) {
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
  }, [profile.displayName]);

  console.log(profile);

  return profile.displayName ? (
    <Fragment>
      {loading ? <Loading src={profile.photoURL} /> : <Loading.ReleaseBody />}

      <Header src="joker1" hideOnMobile>
        <Header.Frame>
          <Header.Group>
            <Header.Logo to={ROUTES.HOME} src={Logo} alt="Netflix" />
            <Header.TextLink>Series</Header.TextLink>
            <Header.TextLink>Films</Header.TextLink>
          </Header.Group>

          <Header.Group>
            <Header.Profile>
              <Header.Picture src={user.photoURL} />
              <Header.Dropdown>
                <Header.Group>
                  <Header.Picture src={user.photoURL} />
                  <Header.TextLink>{user.displayName}</Header.TextLink>
                </Header.Group>
                <Header.Group>
                  <Header.TextLink onClick={signOut}>Sign out</Header.TextLink>
                </Header.Group>
              </Header.Dropdown>
            </Header.Profile>
          </Header.Group>
        </Header.Frame>

        <Header.Feature>
          <Header.FeatureCallOut>Watch Joker Now</Header.FeatureCallOut>
          <Header.Text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam quis eum culpa officia
            eveniet ipsum assumenda, illo sint velit aspernatur veniam quaerat saepe a voluptatum
            numquam unde et delectus facilis omnis minus explicabo dolorum soluta voluptates
            exercitationem? Ea, itaque! Sit.
          </Header.Text>
        </Header.Feature>
      </Header>
    </Fragment>
  ) : (
    <SelectProfileContainer user={user} setProfile={setProfile} />
  );
};

export default BrowseContainer;
