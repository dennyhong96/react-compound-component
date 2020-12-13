import { useState, useEffect, Fragment, useContext } from "react";

import { Loading, Header, Card, Player } from "../components";
import { AuthContext } from "../context/auth";
import SelectProfileContainer from "./profile";
import FooterContainer from "../containers/footer";
import Logo from "../logo.svg";
import * as ROUTES from "../constants/routes";

const BrowseContainer = ({ slides }) => {
  const [category, setCategory] = useState("series");
  const [searchTerm, setSearchTerm] = useState("");
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
      }, 300);
    }
  }, [profile.displayName]);

  const slideRows = slides[category];

  return profile.displayName ? (
    <Fragment>
      {/* Recover scroll */}
      {loading ? <Loading src={profile.photoURL} /> : <Loading.ReleaseBody />}

      <Header src="joker1" hideOnMobile>
        <Header.Frame>
          {/* Left side logo and category links */}
          <Header.Group>
            <Header.Logo to={ROUTES.HOME} src={Logo} alt="Netflix" />
            <Header.TextLink
              active={category === "series"}
              onClick={setCategory.bind(this, "series")}
            >
              Series
            </Header.TextLink>
            <Header.TextLink
              active={category === "films"}
              onClick={setCategory.bind(this, "films")}
            >
              Films
            </Header.TextLink>
          </Header.Group>

          {/* Right side profile dropdown */}
          <Header.Group>
            <Header.Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
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

        {/* Feature film */}
        <Header.Feature>
          <Header.FeatureCallOut>Watch Joker Now</Header.FeatureCallOut>
          <Header.Text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam quis eum culpa officia
            eveniet ipsum assumenda, illo sint velit aspernatur veniam quaerat saepe a voluptatum
            numquam unde et delectus facilis omnis minus explicabo dolorum soluta voluptates
            exercitationem? Ea, itaque! Sit.
          </Header.Text>
          <Header.PlayButton>Play</Header.PlayButton>
        </Header.Feature>
      </Header>

      {/* Cards */}
      <Card.Group>
        {slideRows.map((slideItem) => (
          <Card key={`${category}=${slideItem.title.toLowerCase()}`}>
            <Card.Title>{slideItem.title}</Card.Title>
            <Card.Entities>
              {slideItem.data.map((item) => (
                <Card.Item key={item.docId} item={item}>
                  <Card.Image src={`/images/${category}/${item.genre}/${item.slug}/small.jpg`} />
                  <Card.Meta>
                    <Card.SubTitle>{item.title}</Card.SubTitle>
                    <Card.Text>{item.description}</Card.Text>
                  </Card.Meta>
                </Card.Item>
              ))}
            </Card.Entities>

            {/* Video Player */}
            <Card.Feature category={category}>
              <Player>
                <Player.Button />
                <Player.Video src="/videos/bunny.mp4" />
              </Player>
            </Card.Feature>
          </Card>
        ))}
      </Card.Group>

      {/* Footer */}
      <FooterContainer />
    </Fragment>
  ) : (
    // Profile selection
    <SelectProfileContainer user={user} setProfile={setProfile} />
  );
};

export default BrowseContainer;
