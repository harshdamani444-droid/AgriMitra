import React, { useEffect, useRef, useState } from "react";
import {
  Search,
  Users,
  Send,
  Image,
  Paperclip,
  Smile,
  X,
  UserRoundCog,
} from "lucide-react";
import axios from "axios";
import { useSelector } from "react-redux";

const Chat = () => {
  const { loading, error, user } = useSelector((state) => state.auth);
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState("");
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [chats, setChats] = useState([]);
  const [groupUsers, setGroupUsers] = useState([]);
  const [searchGroupUsers, setSearchGroupUsers] = useState("");
  const [groupName, setGroupName] = useState("");
  const [groupSettings, setGroupSettings] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [newGroupName, setNewGroupName] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  useEffect(() => {
    fetchUsers();
    fetchChats();
  }, [selectedChat, allMessages]);
  const typingHandler = (e) => {
    setMessage(e.target.value);
  };

  const handleMessageSend = async (e) => {};
  const fetchMessages = async (chatId) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/message/${chatId}`,
        {
          withCredentials: true,
        }
      );
      console.log(response.data.data);
      setAllMessages(response.data.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };
  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/user/getAllUsers`,
        {
          withCredentials: true,
        }
      );
      setUsers(response.data.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  const fetchChats = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/chat/get`,
        {
          withCredentials: true,
        }
      );
      setChats(response.data.data);
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  };

  const handleCreateGroup = async () => {
    try {
      const grpusers = groupUsers.map((user) => String(user._id));
      const sendData = {
        name: groupName,
        users: JSON.stringify(grpusers),
      };
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/chat/createGroup`,
        sendData,
        { withCredentials: true }
      );
      setShowCreateGroup(false);
      setGroupName("");
      setGroupUsers([]);
      fetchChats();
    } catch (error) {
      console.error("Error creating group:", error);
    }
  };
  const handleSelectChat = async (user) => {
    try {
      setSearchQuery("");
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/chat/create`,
        { userId: user._id },
        { withCredentials: true }
      );
      // console.log(response.data.data);
      setSelectedChat(response.data.data);
    } catch (error) {
      console.error("Error selecting chat:", error);
    }
  };
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/message/sendMessage`,
        {
          chatId: selectedChat._id,
          content: message,
        },
        { withCredentials: true }
      );
      console.log(response.data.data);
      // Update the allMessages state with the new message
      setAllMessages((prev) => [...prev, response.data.data]);
      setMessage("");
      fetchMessages(selectedChat._id);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  const removeUserFromGroup = async (userId) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/chat/removeFromGroup`,
        { userId, chatId: selectedGroup._id },
        { withCredentials: true }
      );
      setSelectedGroup((prev) => {
        const updatedUsers = prev.users.filter((user) => user._id !== userId);
        return { ...prev, users: updatedUsers };
      });
      fetchChats();
    } catch (error) {
      console.error("Error removing user from group:", error);
    }
  };
  const handleChangeGroup = async () => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/chat/renameGroup`,
        { chatId: selectedGroup._id, chatName: newGroupName },
        { withCredentials: true }
      );
      setSelectedGroup(response.data.data);
      setSelectedChat(response.data.data);
      setGroupUsers([]);
      setNewGroupName("");
      setGroupSettings(false);
      fetchChats();
    } catch (error) {
      console.error("Error changing group name:", error);
    }
  };
  const addUserToGroup = async (userId) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/chat/addToGroup`,
        { userId, chatId: selectedGroup._id },
        { withCredentials: true }
      );
      console.log(response.data.data);
      setSelectedGroup(response.data.data);

      fetchChats();
    } catch (error) {
      console.error("Error adding user to group:", error);
    }
  };

  const handleSelectGroupUser = (user) => {
    setGroupUsers((prev) => [...prev, user]);
    setSearchGroupUsers("");
  };
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredGroupUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchGroupUsers.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-12 h-[calc(100vh-8rem)]">
            {/* Sidebar */}
            <div className="col-span-3 border-r">
              <div className="p-4 border-b">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold">Messages</h2>
                  <button
                    onClick={() => setShowCreateGroup(true)}
                    className="p-2 hover:bg-gray-100 rounded-full"
                    title="Create Group Chat"
                  >
                    <Users className="h-5 w-5 text-gray-600" />
                  </button>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-green-500"
                  />
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  {searchQuery && (
                    <div className="absolute z-10 bg-white border rounded-lg shadow-lg mt-1 w-full max-h-60 overflow-y-auto">
                      {filteredUsers?.map((user) => (
                        <div
                          key={user.id}
                          className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
                        >
                          <button
                            className="flex items-center w-full"
                            onClick={async () => {
                              handleSelectChat(user);
                              setSearchQuery("");
                            }}
                          >
                            <img
                              src={user.avatar}
                              alt={user.name}
                              className="h-8 w-8 rounded-full mr-2"
                            />
                            <span className="text-sm font-medium text-gray-900">
                              {user.name}
                            </span>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className=" overflow-y-auto  max-h-[calc(90vh-14rem)]">
                {chats.map((chat) => (
                  <div
                    key={chat.id}
                    onClick={async () => {
                      setSelectedChat(chat);
                      await fetchMessages(chat._id);
                    }}
                    className={`p-4 hover:bg-gray-50 cursor-pointer ${
                      selectedChat?.id === chat.id ? "bg-gray-50" : ""
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      {chat.isGroupChat ? (
                        <div className="relative">
                          <Users className="h-12 w-12 text-gray-600 bg-gray-200 rounded-full p-2" />
                        </div>
                      ) : (
                        <div className="relative">
                          <img
                            src={chat.users[1].avatar}
                            alt={chat.users[1].name}
                            className="h-12 w-12 rounded-full"
                          />
                          <span
                            className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${
                              chat.users[1].isOnline
                                ? "bg-green-500"
                                : "bg-gray-400"
                            }`}
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-gray-900 truncate">
                          {chat.isGroupChat
                            ? chat.chatName
                            : chat.users[1].name}
                        </h3>
                        {chat.lastMessage && (
                          <p className="text-sm text-gray-500 truncate">
                            {chat.lastMessage.text}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className="col-span-9 flex flex-col">
              {selectedChat ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {selectedChat.isGroupChat ? (
                        <div className="flex space-x-2">
                          <Users className="h-10 w-10 text-gray-600 bg-gray-200 rounded-full p-2" />
                        </div>
                      ) : (
                        <div className="relative">
                          <img
                            src={selectedChat.users[1].avatar}
                            alt={selectedChat.users[1].name}
                            className="h-10 w-10 rounded-full"
                          />
                          <span
                            className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${
                              selectedChat.users[1].isOnline
                                ? "bg-green-500"
                                : "bg-gray-400"
                            }`}
                          />
                        </div>
                      )}
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {selectedChat.isGroupChat
                            ? selectedChat.chatName
                            : selectedChat.users[1].name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {selectedChat.isGroupChat
                            ? `${selectedChat.users.length} members`
                            : selectedChat.users[1].isOnline
                            ? "Online"
                            : "Offline"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        className="p-2 hover:bg-gray-100 rounded-full"
                        onClick={() => {
                          setGroupSettings(true);
                          setSelectedGroup(selectedChat);
                          setNewGroupName(selectedChat.chatName);
                          //   console.log(selectedChat);
                        }}
                      >
                        <UserRoundCog className="h-6 w-6 text-gray-600" />
                      </button>
                    </div>
                  </div>

                  <div
                    ref={messagesEndRef}
                    className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[calc(90vh-14rem)]"
                  >
                    {allMessages.map((message, index) => {
                      const isCurrentUser = message.sender._id === user._id;
                      const isSameSender =
                        index > 0 &&
                        allMessages[index - 1].sender._id ===
                          message.sender._id;

                      return (
                        <div
                          key={message._id}
                          className={`flex ${
                            isCurrentUser ? "justify-end" : "justify-start"
                          } items-end space-x-2 `}
                        >
                          <div>
                            <img
                              src={message.sender.avatar}
                              alt={message.sender.name}
                              className="h-8 w-8 rounded-full"
                            />
                          </div>
                          <div
                            className={`${
                              isCurrentUser
                                ? "bg-green-600 text-white"
                                : "bg-gray-100 text-gray-900"
                            } rounded-lg px-4 py-2 max-w-[70%] ${
                              isSameSender ? "mt-1" : "mt-4"
                            }`}
                          >
                            {!isSameSender && (
                              <>
                                <p className="text-xs text-black mb-1">
                                  {message.sender.name}{" "}
                                </p>
                              </>
                            )}
                            <p>{message.content}</p>
                            <p
                              className={`text-xs mt-1 ${
                                isCurrentUser
                                  ? "text-green-100"
                                  : "text-gray-500"
                              }`}
                            >
                              {new Date(message.createdAt).toLocaleTimeString(
                                "en-US",
                                {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                }
                              )}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                    {/* <div ref={messagesEndRef} />; */}
                  </div>

                  <div className="p-4 border-t">
                    <form
                      onSubmit={handleSendMessage}
                      className="flex space-x-4"
                    >
                      <button
                        type="button"
                        className="p-2 hover:bg-gray-100 rounded-full"
                      >
                        <Smile className="h-6 w-6 text-gray-600" />
                      </button>
                      <button
                        type="button"
                        className="p-2 hover:bg-gray-100 rounded-full"
                      >
                        <Image className="h-6 w-6 text-gray-600" />
                      </button>
                      <button
                        type="button"
                        className="p-2 hover:bg-gray-100 rounded-full"
                      >
                        <Paperclip className="h-6 w-6 text-gray-600" />
                      </button>
                      <input
                        type="text"
                        value={message}
                        onChange={typingHandler}
                        placeholder="Type a message..."
                        className="flex-1 border rounded-lg px-4 focus:outline-none focus:border-green-500"
                      />
                      <button
                        type="submit"
                        className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700"
                      >
                        <Send className="h-6 w-6" />
                      </button>
                    </form>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-medium text-gray-900 mb-2">
                      No Chat Selected
                    </h3>
                    <p className="text-gray-500">
                      Choose a conversation or start a new one
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Create Group Modal */}
      {showCreateGroup && (
        <div className=" fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center  ">
          <div className="bg-white rounded-lg p-6 w-96  h-auto">
            <h3 className="text-xl font-bold mb-4">Create Group Chat</h3>
            <div className="space-y-4 ">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Group Name
                </label>
                <input
                  type="text"
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-green-500"
                  placeholder="Enter group name"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                />
              </div>
              <div className="h-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Add Members
                </label>
                <div className="relative h-full">
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchGroupUsers}
                    onChange={(e) => {
                      setSearchGroupUsers(e.target.value);
                    }}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-green-500"
                  />
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  {searchGroupUsers && (
                    <div className="absolute z-10 bg-white border rounded-lg shadow-lg mt-1 w-full max-h-60 overflow-y-auto ">
                      {filteredGroupUsers?.map((user) => (
                        <div
                          key={user.id}
                          className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
                        >
                          <button
                            className="flex items-center w-full"
                            onClick={() => {
                              handleSelectGroupUser(user);
                            }}
                          >
                            <img
                              src={user.avatar}
                              alt={user.name}
                              className="h-8 w-8 rounded-full mr-2"
                            />
                            <span className="text-sm font-medium text-gray-900">
                              {user.name}
                            </span>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {groupUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center space-x-2 bg-gray-100 rounded-full px-3 py-1"
                  >
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="h-6 w-6 rounded-full"
                    />
                    <span className="text-sm">{user.name}</span>
                    <button
                      className="text-gray-500 hover:text-gray-700"
                      onClick={() => {
                        setGroupUsers((prev) =>
                          prev.filter((u) => u._id !== user._id)
                        );
                      }}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowCreateGroup(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-700"
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                onClick={() => {
                  handleCreateGroup();
                }}
              >
                Create Group
              </button>
            </div>
          </div>
        </div>
      )}

      {groupSettings && (
        <div className=" fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center  ">
          <div className="bg-white rounded-lg p-6 w-96  h-auto">
            <h3 className="text-xl font-bold mb-4">Change Group settings</h3>
            <div className="space-y-4 ">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Group Name
                </label>
                <input
                  type="text"
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-green-500"
                  placeholder="Enter group name"
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)}
                />
              </div>
              <div className="h-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Add Members
                </label>
                <div className="relative h-full">
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchGroupUsers}
                    onChange={(e) => {
                      setSearchGroupUsers(e.target.value);
                    }}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-green-500"
                  />
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  {searchGroupUsers && (
                    <div className="absolute z-10 bg-white border rounded-lg shadow-lg mt-1 w-full max-h-60 overflow-y-auto ">
                      {filteredGroupUsers?.map((user) => (
                        <div
                          key={user._id}
                          className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
                        >
                          <button
                            className="flex items-center w-full"
                            onClick={() => {
                              addUserToGroup(user._id);
                              setSearchGroupUsers("");
                            }}
                          >
                            <img
                              src={user.avatar}
                              alt={user.name}
                              className="h-8 w-8 rounded-full mr-2"
                            />
                            <span className="text-sm font-medium text-gray-900">
                              {user.name}
                            </span>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedGroup.users?.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center space-x-2 bg-gray-100 rounded-full px-3 py-1"
                  >
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="h-6 w-6 rounded-full"
                    />
                    <span className="text-sm">{user.name}</span>
                    <button
                      className="text-gray-500 hover:text-gray-700"
                      onClick={() => {
                        removeUserFromGroup(user._id);
                      }}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setGroupSettings(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-700"
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                onClick={() => {
                  handleChangeGroup();
                }}
              >
                Change Group
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
