import { createContext, useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [poster, setPoster] = useState([]);
  const [details, setDetails] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);
  }, []);

  return (
    <ChatContext.Provider
      value={{ user, setUser, poster, setPoster, details, setDetails }}>
      {children}
    </ChatContext.Provider>
  );
};
export const ChatState = () => {
  return useContext(ChatContext);
};
export default ChatProvider;
