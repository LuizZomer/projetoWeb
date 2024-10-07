import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body{
      font-family: "Inter", sans-serif;
    }
`;

export const FilterContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 1fr);
  padding: 10px;
`;
