import { useEffect, useState } from "react";
import { api } from "../services/api";

export const useValidationToken = () => {
  const [isValid, setIsValid] = useState<boolean>();
  const [loading, setLoading] = useState(true);

  const validateToken = async () => {
    await api
      .get("/auth/customerCheck")
      .then(() => {
        setIsValid(true);
      })
      .catch(() => {
        setIsValid(false);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (localStorage.getItem("authToken")) validateToken();
    else {
      setIsValid(false);
      setLoading(false);
    }
  }, []);

  return {
    isValid,
    loading,
  };
};
