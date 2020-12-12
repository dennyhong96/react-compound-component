import { useContent } from "../hooks";
import selectionFilter from "../utils/selectionFilter";

const Browse = () => {
  const { series } = useContent("series");
  const { films } = useContent("films");
  const slides = selectionFilter({ series, films });

  return <pre style={{ color: "#fff" }}>{JSON.stringify(slides, null, 2)}</pre>;
};

export default Browse;
