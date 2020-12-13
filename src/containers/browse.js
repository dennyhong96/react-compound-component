import { useState, useEffect, Fragment } from "react";
import { useContext } from "react";
import { Loading, Header } from "../components";

import { AuthContext } from "../context/auth";
import SelectProfileContainer from "./profile";

const BrowseContainer = ({ slides }) => {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const {
    auth: { user },
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

      <Header src="joker1">
        <p>Hello</p>
      </Header>
    </Fragment>
  ) : (
    <SelectProfileContainer user={user} setProfile={setProfile} />
  );
};

export default BrowseContainer;
