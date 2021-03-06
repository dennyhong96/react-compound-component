import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  *,
  *::before,
  *::after {
    margin:0;
    padding:0;
    box-sizing:border-box;
  }

  body {
    font-family: 'Helvetica Neue', Arial, Helvetica, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #000;
    color: #333333;
    font-size: 16px;
    min-height:100vh;
  }

  button {
    cursor: pointer;
    font: inherit;
    background: inherit;
    border: none;
    display: block;
    width: 100%;
  }

  input {
    border: none;
  }

  ul,ol {
    list-style:none;
  }
`;
