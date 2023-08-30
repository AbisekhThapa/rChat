import { useContext, useEffect } from "react";
import socket from "../../socket";
import { AccountContext } from "../AccountContext";

const useSocketSetup = (setFriendList,setMessages) => {
  const { setUser } = useContext(AccountContext);
  useEffect(() => {
    socket.connect()
    socket.on("friends", friendList => {
      setFriendList(friendList);
    });
    console.log("connected")

    socket.on("messages", messages => {
      console.log("2")
      setMessages(messages);
    });
    socket.on("dm",message => {
      setMessages(prev=> [message,...prev])
    })
    socket.on("connected", (status, username) => {
    console.log("3")
      setFriendList(prevFriends => {
        return [...prevFriends].map(friend => {
          if (friend.username === username) {
            friend.connected = status;
          }
          return friend;
        });
      });
    });
    socket.on("connect_error", () => {
    console.log("3")
      setUser({ loggedIn: false });
    });
    return () => {
      socket.off("connect_error");
      socket.off("connected");
      socket.off("friends");
      socket.off("messages");
      socket.off("dm");
    };
  }, [setUser, setFriendList,setMessages]);
};

export default useSocketSetup;