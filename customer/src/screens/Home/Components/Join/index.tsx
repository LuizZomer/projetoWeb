import { Flex, Text } from "@chakra-ui/react";
import { JoinCard } from "./components/Card";
import { ButtonComponent } from "../../../../components/Buttons/Button";
import { useNavigate } from "react-router-dom";

export const Join = () => {
  const navigate = useNavigate();

  const cardData = [
    {
      title: "Exklusive Rabatte",
      description:
        "Erhalten Sie exklusive Rabatte, Sonderangebote und Angebote basierend auf den Bestellungen, die Sie normalerweise aufgeben. Ihre Vorlieben werden immer belohnt!",
    },
    {
      title: "Treueprogramm",
      description:
        "Sammeln Sie bei jedem Einkauf Punkte und lösen Sie diese gegen kostenlose Mahlzeiten, Getränke oder Desserts ein. Genießen Sie Ihr Erlebnis in der Pizzeria Bei Giovanni noch mehr!",
    },
    {
      title: "Priorität bei Reservierungen",
      description:
        "Erhalten Sie bevorzugte Reservierungen und sichern Sie sich Ihren Platz in unserer Pizzeria, besonders an geschäftigen Tagen.",
    },
    {
      title: "Familienangebote",
      description:
        "Rabatte und spezielle Pakete für Gruppen- oder Familienessen. Genießen Sie köstliche Momente mit Ihren Liebsten!",
    },
  ];

  return (
    <Flex direction="column" gap="50px">
      <Text fontSize="48px" color="#482D19" textAlign="center">
        VERBIDEN
      </Text>
      <Flex justify="center" alignItems="center" gap="80px" flexWrap="wrap">
        {cardData.map(({ description, title }) => (
          <JoinCard description={description} title={title} />
        ))}
      </Flex>
      <Flex
        direction={["column", "column", "row"]}
        justify={["center", "center", "space-between"]}
        align="center"
        p={["10px", "10px", "20px", "40px", "50px", "300px"]}
        gap="20px"
      >
        <Text
          color="#482D19"
          fontSize="24px"
          maxW="464px"
          fontWeight="bold"
          textAlign="center"
          width="full"
        >
          Wenn Sie der Pizzeria Bei Giovanni beitreten, profitieren Sie von
          einer Reihe exklusiver Geschenke, die Ihr Erlebnis noch spezieller
          machen.
        </Text>
        <ButtonComponent
          bgColor="#75492A"
          maxWidth="376px"
          height="118px"
          fontSize="48px"
          onClick={() => navigate("/login")}
        >
          VERBIDEN
        </ButtonComponent>
      </Flex>
    </Flex>
  );
};
