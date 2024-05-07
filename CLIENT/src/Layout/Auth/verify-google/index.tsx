import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as io from "socket.io-client";
const socket = io.connect("http://localhost:9000");
const VerifyGoogle = () => {
  const params = useParams();
  const { token }: any = params;
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.setItem("auth", token);
    socket.emit("message", "CLICK");
  }, []);

  setTimeout(() => {
    window.close();
  }, 1000);

  return <div></div>;
};

export default VerifyGoogle;
