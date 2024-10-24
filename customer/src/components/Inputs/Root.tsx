import { Container, ErrorMessage, InputContainer, Label } from "./styles";

export const Root = ({
  children,
  label,
  error,
  gap,
  themeColor = "#fff",
}: {
  children: React.ReactNode;
  label?: string;
  error?: string;
  gap?: string;
  themeColor?: string;
}) => (
  <Container $themeColor={themeColor}>
    {label && <Label>{label}</Label>}
    <InputContainer $themeColor={themeColor} $error={!!error} $gap={gap}>
      {children}
    </InputContainer>
    {error && (
      <ErrorMessage>
        <p className="p9">{error}</p>
      </ErrorMessage>
    )}
  </Container>
);
