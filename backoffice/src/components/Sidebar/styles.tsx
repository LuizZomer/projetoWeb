import styled, { css } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const MobileMenu = styled.div`
  position: sticky;
  top: 0;
  display: none;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #f1ecdc;
  z-index: 10;
  box-shadow: 1px 10px 10px rgba(1, 1, 1, 0.4);

  @media (max-width: 900px) {
    display: flex;
  }
`;

export const BgSidebarMobile = styled.div<{ $show: boolean }>`
  display: ${({ $show }) => ($show ? "flex" : "none")};
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: brightness(0.5);
  z-index: 10;
`;

export const SidebarContainerMobile = styled.aside<{ $show: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 100%;
  max-width: 100px;
  background-color: #f1ecdc;
  display: ${({ $show }) => ($show ? "flex" : "none")};
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
  padding: 20px 10px;
  box-shadow: 1px 10px 10px rgba(1, 1, 1, 0.4);
  z-index: 19;
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
  box-shadow: 1px 10px 10px rgba(1, 1, 1, 0.4);

  @media (max-width: 900px) {
    display: none;
  }
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

export const ContentOptionsContainerMobile = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
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

  @media (max-width: 900px) {
    padding: 10px;
  }
`;
