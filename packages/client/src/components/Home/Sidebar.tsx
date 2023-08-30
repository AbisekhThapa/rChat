import  { useContext } from "react";
import {
  VStack,
  HStack,
  Text,
  Button,
  Divider,
  Circle,
  Tab,
  TabList,
  useDisclosure,
} from "@chakra-ui/react";
import { ChatIcon } from "@chakra-ui/icons";
import { FriendContext } from ".";
import AddFriendModal from "./AddFriendModal";

const Sidebar = () => {
  const {friendList} = useContext(FriendContext)
  const {isOpen,onClose,onOpen}=useDisclosure()
  return (
    <>
    <VStack py={4}>
      <HStack width={"full"} justifyContent={"space-evenly"}>
        <Text>Add Friends</Text>
        <Button onClick={onOpen}>
          <ChatIcon />
        </Button>
      </HStack>
      <Divider />
      <VStack as={TabList}>
      {friendList?.map((friend:any,i:number)=>(
      <HStack as={Tab} key={i}>
        <Circle bg={friend?.connected ? "green.700":"red"} w={"10px"} h={"10px"} />
        <Text>{friend.username}</Text>
      </HStack>
  ))}
      </VStack>
    </VStack>
    <AddFriendModal isOpen={isOpen} onClose={onClose}/>
  </>

  );
};

export default Sidebar;
