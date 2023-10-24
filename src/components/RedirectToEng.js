import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RedirectToEng = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/eng");
  }, [navigate]);

  return null;
};

export default RedirectToEng;
