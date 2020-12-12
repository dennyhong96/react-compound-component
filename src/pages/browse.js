import { useContent } from "../hooks";

const Browse = () => {
  // const { series } = useContent("series");
  const { films } = useContent("films");

  return <pre style={{ color: "#fff" }}>{JSON.stringify(films, null, 2)}</pre>;
};

export default Browse;
