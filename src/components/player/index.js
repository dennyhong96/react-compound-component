import { createContext, useContext, useState, useRef } from "react";
import { createPortal } from "react-dom";

import { Container, Button, Overlay, Inner, Close } from "./styles/player";

const PlayerContext = createContext();

const Player = ({ children, ...restProps }) => {
  const [showPlayer, setShowPlayer] = useState(false);

  return (
    <PlayerContext.Provider value={{ showPlayer, setShowPlayer }}>
      <Container {...restProps}>{children}</Container>
    </PlayerContext.Provider>
  );
};

Player.Video = function PlayerVideo({ src, ...restProps }) {
  const { showPlayer, setShowPlayer } = useContext(PlayerContext);

  return showPlayer
    ? createPortal(
        <Overlay onClick={setShowPlayer.bind(this, false)} {...restProps}>
          <Inner>
            <video id="netflix-player" controls onClick={(evt) => evt.stopPropagation()}>
              <source src={src} type="video/mp4" />
            </video>
            <Close ref={(el) => el?.focus()} onClick={setShowPlayer.bind(this, false)} />
          </Inner>
        </Overlay>,
        document.body
      )
    : null;
};

Player.Button = function PlayerButton({ ...restProps }) {
  const { setShowPlayer } = useContext(PlayerContext);

  return <Button onClick={() => setShowPlayer((prev) => !prev)}>Play</Button>;
};

export default Player;
