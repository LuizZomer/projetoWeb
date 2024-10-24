import styled, { css } from "styled-components";

export const InputStyled = styled.input<{ $themeColor: string }>`
  border: none;
  outline: none;
  width: 100%;
  height: 30px;
  background-color: transparent;
  color: ${({ $themeColor }) => $themeColor};

  &::placeholder {
    color: ${({ $themeColor }) => $themeColor};
  }
`;

export const IconContainer = styled.div<{
  $position: string;
  $isButton?: boolean;
}>`
  padding: ${({ $position }) =>
    $position === "after" ? "0 10px 0 4px" : "0 4px 0 15px"};

  ${({ $isButton }) =>
    $isButton &&
    css`
      &:hover {
        cursor: pointer;
        opacity: 0.6;
        transition: 0.5s;
      }
    `}
`;

export const Container = styled.div<{ $themeColor: string }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 4px;
  color: ${({ $themeColor }) => $themeColor};
`;

export const Label = styled.p`
  font-size: 20px;
`;

export const InputContainer = styled.div<{
  $error: boolean;
  $gap?: string;
  $themeColor: string;
}>`
  display: flex;
  align-items: center;
  gap: ${({ $gap }) => $gap ?? "5px"};
  height: 52px;
  border: 1px solid ${({ $themeColor }) => $themeColor};
  width: 100%;
  border-radius: 4px;

  ${({ $error }) =>
    $error &&
    `
    border-color: red !important;
    color: red;
    }
 `}
`;

export const ErrorMessage = styled.div`
  display: flex;
  color: red;

  > p {
    animation: scale-in-left 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
    @keyframes scale-in-left {
      0% {
        transform: scale(0);
        transform-origin: 0% 50%;
        opacity: 1;
      }
      100% {
        transform: scale(1);
        transform-origin: 0% 50%;
        opacity: 1;
      }
    }
  }
`;
