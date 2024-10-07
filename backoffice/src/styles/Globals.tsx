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
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  align-items: end;
  padding: 10px;
  background-color: #f1ecdc;
  border-radius: 8px;
  gap: 20px;
`;
