const SERIES_GENRES = ["documentaries", "comedies", "children", "crime", "feel-good"];

const FILMS_GENRES = ["drama", "thriller", "children", "suspense", "romance"];

const transformer = (genraList, dataList) =>
  genraList.map((genre) => ({
    title: genre
      .split("-")
      .map((part) => `${part.slice(0, 1).toUpperCase()}${part.slice(1).toLowerCase()}`)
      .join(" "),
    data: dataList.filter((item) => item.genre === genre),
  }));

export default function selectionFilter({ series, films }) {
  return {
    series: transformer(SERIES_GENRES, series),
    films: transformer(FILMS_GENRES, films),
  };
}
