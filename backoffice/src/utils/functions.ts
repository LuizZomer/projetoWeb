import { toast } from "react-toastify";

interface IThenHandler {
  data: {
    message: string;
  };
}

interface ICatchHandler {
  response?: {
    data: {
      message: string | string[];
    };
    statusCode: number;
  };
}

interface IListConfig {
  field: "type" | "size";
  value: string;
}

export const catchHandler = (err: ICatchHandler) => {
  if (err.response?.data) {
    if (Array.isArray(err.response.data.message))
      toast.error(err.response.data.message[0]);
    if (err.response.data.message) toast.error(err.response.data.message);
    else toast.error(`Erro: ${err.response.statusCode}`);

    if (
      err.response.statusCode === 403 &&
      window.location.pathname !== "/login"
    )
      window.location.pathname = "/login";
  } else {
    toast.error("Erro de comunicação");
  }
};

export const thenHandler = (res: IThenHandler) => {
  if (res.data) {
    toast.success(res.data.message);
  }
};

export const intlNumberFormatter = (number: number) => {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(number);
};

export const valueMask = (value: string) => {
  const rawValue = value.replace(/\D/g, "");

  return (Number(rawValue) / 100).toLocaleString("de-DE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const cpfMask = (value: string) => {
  return value
    .replace(/\D/g, "") // Remove qualquer caractere que não seja número
    .replace(/(\d{3})(\d)/, "$1.$2") // Coloca o primeiro ponto
    .replace(/(\d{3})(\d)/, "$1.$2") // Coloca o segundo ponto
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2"); // Coloca o traço
};

export const unmaskValue = (value: string): number => {
  // Remove o símbolo da moeda, espaços, e substitui a vírgula por ponto
  const rawValue = value
    .replace(/[^\d,]/g, "") // Remove tudo que não for dígito ou vírgula
    .replace(/\.(?=.*\.)/, "") // Remove o primeiro ponto encontrado
    .replace(",", "."); // Substitui a vírgula decimal por ponto

  return parseFloat(rawValue) || 0;
};

export const convertToInputDate = (date: Date | string | null | undefined) => {
  if (!date) return "";

  const newDate = new Date(date);
  const year = newDate.getFullYear();
  const month = (newDate.getMonth() + 1).toString().padStart(2, "0");
  const day = newDate.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const DateFormater = (date: string) =>
  new Date(date).toLocaleDateString();

export const listConfig = ({ field, value }: IListConfig) => {
  if (field === "size") {
    switch (value) {
      case "small":
        return "Klein";

      case "large":
        return "Groß";
    }
  }

  if (field === "type") {
    switch (value) {
      case "pizza":
        return "Pizza";

      case "noodle":
        return "Nudeln";

      case "salad":
        return "Salat";

      case "drink":
        return "Getränk";
    }
  }
};
