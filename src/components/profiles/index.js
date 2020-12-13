import { Container, Title, List, Item, Picture, Name } from "./styles/profiles";

const Profiles = ({ children, ...restProps }) => {
  return <Container {...restProps}>{children}</Container>;
};

Profiles.Title = function ProfilesTitle({ children, ...restProps }) {
  return <Title {...restProps}>{children}</Title>;
};

Profiles.List = function ProfilesTitle({ children, ...restProps }) {
  return <List {...restProps}>{children}</List>;
};

Profiles.Item = function ProfilesTitle({ children, ...restProps }) {
  return <Item {...restProps}>{children}</Item>;
};

Profiles.Picture = function ProfilesTitle({ src, ...restProps }) {
  return (
    <Picture {...restProps} src={src ? `/images/users/${src}.png` : `/images/misc/loading.gif`} />
  );
};

Profiles.Name = function ProfilesTitle({ children, ...restProps }) {
  return <Name {...restProps}>{children}</Name>;
};

export default Profiles;
