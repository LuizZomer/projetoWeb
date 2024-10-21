interface IListConfig {
  field: "type" | "size";
  value: string;
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
