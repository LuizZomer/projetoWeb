import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import loginBg from "/loginBg.svg";
import logo from "/logo.svg";
import { LockSimple, User } from "phosphor-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { api } from "../../services/api";
import { useAuthContext } from "../../context/Auth/useAuthContext";
import { useNavigate } from "react-router-dom";
import { Input } from "../../components/Inputs";

export const Login = () => {
  const { signIn } = useAuthContext();
  const navigate = useNavigate();

  const schema = z.object({
    email: z.string().min(1, "Pflichtfeld"),
    password: z.string().min(6, "Mindestens 6 Zeichen"),
  });

  type TFormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmitLogin = async (data: TFormData) => {
    await api
      .post("/auth/customerLogin", {
        ...data,
      })
      .then(({ data }) => {
        signIn(data.accessToken);
        navigate("/customer-area");
      });
  };

  return (
    <Flex
      bgImage={loginBg}
      bgRepeat="no-repeat"
      bgSize="cover"
      bgPosition="center"
      height="100vh"
      width="full"
      justifyContent="center"
      alignItems="center"
    >
      <Flex flexDirection="column" alignItems="center" paddingX="10">
        <Image src={logo} alt="logo" mb="90px" />
        <Box maxW="23.125rem" width="100%" px="10px">
          <Flex justify="center" w="full">
            <Text
              fontSize={24}
              fontWeight="light"
              maxW={300}
              textAlign="center"
              color="#fff"
              w="full"
            >
              Willkommen im Kundenbereich
            </Text>
          </Flex>
          <form onSubmit={handleSubmit(handleSubmitLogin)}>
            <Flex flexDir="column" gap="20px">
              <Input.Root label="Email" error={errors.email?.message}>
                <Input.Icon position="before" icon={User} />
                <Input.Field
                  {...register("email")}
                  placeholder=" z. B. cirodonadio@example.com"
                />
              </Input.Root>

              <Input.Root label="Passwort" error={errors.password?.message}>
                <Input.Icon position="before" icon={LockSimple} />
                <Input.Field
                  type="password"
                  {...register("password")}
                  placeholder="mindestens 6 Zeichen"
                />
              </Input.Root>

              <Button
                type="submit"
                width="full"
                height="52px"
                color="#75492A"
                isLoading={isSubmitting}
                disabled={isSubmitting}
              >
                Login
              </Button>
            </Flex>
          </form>
        </Box>
      </Flex>
    </Flex>
  );
};
