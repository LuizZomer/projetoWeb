import { toast } from "react-toastify";

interface IListConfig {
  field: "type" | "size";
  value: string;
}

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

export const intlNumberFormatter = (number: number) => {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(number);
};

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

export const dateFormatter = (date: string | undefined | null) => {
  if (!date) return;

  return new Date(date).toLocaleDateString(navigator.language);
};
