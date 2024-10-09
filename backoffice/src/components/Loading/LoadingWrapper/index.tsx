import { Flex } from "@chakra-ui/react";

interface ILoadingWrapper {
  children: React.ReactNode;
}

export const LoadingWrapper = ({ children }: ILoadingWrapper) => {
  return (
    <Flex width="full" height="100vh" justify="center" align="center">
      {children}
    </Flex>
  );
};
