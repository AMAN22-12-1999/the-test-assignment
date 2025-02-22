import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import UserForm from "../components/UserForm";

const Home = () => {
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate(); 

  const handleFormSubmit = () => {
    setSubmitted(true);
    navigate("/show-user"); 
  };

  return <UserForm onSubmit={handleFormSubmit} />;
};

export default Home;
