import { Container, ErrorMessage, InputContainer, Label } from "./styles";

export const Root = ({
  children,
  label,
  error,
  gap,
}: {
  children: React.ReactNode;
  label?: string;
  error?: string;
  gap?: string;
}) => (
  <Container>
    {label && <Label>{label}</Label>}
    <InputContainer $error={!!error} $gap={gap}>
      {children}
    </InputContainer>
    {error && (
      <ErrorMessage>
        <p className="p9">{error}</p>
      </ErrorMessage>
    )}
  </Container>
);
