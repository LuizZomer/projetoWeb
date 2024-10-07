import styled, { css } from "styled-components";

export const Container = styled.div`
  display: flex;
`;

export const SidebarContainer = styled.aside`
  position: fixed;
  top: 0;
  height: 100vh;
  width: 100%;
  max-width: 280px;
  background-color: #f1ecdc;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 0 10px;
`;

export const LogoContainer = styled.div`
  padding: 20px 0;
`;

export const OptionsContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  padding-bottom: 30px;
`;

export const ContentOptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const OneOptionContainer = styled.div<{
  $isActive?: boolean;
  $isLeaveButton?: boolean;
}>`
  opacity: 0.4;
  padding-left: 20px;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 16px;

  ${({ $isActive }) =>
    $isActive &&
    css`
      opacity: 1;
      border-left: 2px solid #482d19;
    `}

  ${({ $isLeaveButton }) =>
    $isLeaveButton &&
    css`
      color: red !important;
      opacity: 1 !important;
    `}

  &:hover {
    opacity: 1;
    transition: 0.5s;
    cursor: pointer;
  }
`;

export const Content = styled.div`
  padding: 0 32px 0 312px;
  width: 100%;
  background-color: #897f61;
  min-height: 100vh;
`;
