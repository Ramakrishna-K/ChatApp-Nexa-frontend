

import { useEffect, useState } from "react";
import { useParams } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { useQuery } from "@tanstack/react-query";
import { getStreamToken } from "../lib/api";

import {
  Channel,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";
import { StreamChat } from "stream-chat";
import toast from "react-hot-toast";

import ChatLoader from "../components/ChatLoader";
import CallButton from "../components/CallButton";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const ChatPage = () => {
  const { id: targetUserId } = useParams();

  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);

  const { authUser } = useAuthUser();

  const { data: tokenData } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser,
  });

  useEffect(() => {
    const initChat = async () => {
      if (!tokenData?.token || !authUser) return;

      try {
        const client = StreamChat.getInstance(STREAM_API_KEY);

        await client.connectUser(
          {
            id: authUser._id,
            name: authUser.fullName,
            image: authUser.profilePic,
          },
          tokenData.token
        );

        const channelId = [authUser._id, targetUserId].sort().join("-");

        const currChannel = client.channel("messaging", channelId, {
          members: [authUser._id, targetUserId],
        });

        await currChannel.watch();

        setChatClient(client);
        setChannel(currChannel);
      } catch (error) {
        console.error(error);
        toast.error("Could not connect to chat");
      } finally {
        setLoading(false);
      }
    };

    initChat();
  }, [tokenData, authUser, targetUserId]);

  const handleVideoCall = () => {
    if (!channel) return;

    const callUrl = `${window.location.origin}/call/${channel.id}`;
    channel.sendMessage({
      text: `I've started a video call. Join me here: ${callUrl}`,
    });

    toast.success("Video call link sent!");
  };
 

  if (loading || !chatClient || !channel) return <ChatLoader />;

  // 🔥 Get the other user from Stream channel
  const members = Object.values(channel.state.members);
  const otherUser = members.find(
    (m) => m.user.id !== authUser._id
  )?.user;

  return (
    <div className="h-[95vh]">
      <Chat client={chatClient}>
        <Channel channel={channel}>
          <div className="w-full relative">
             <CallButton handleVideoCall={handleVideoCall} />
            

            <Window>
              {/* ✅ CUSTOM HEADER WITH AVATAR */}
              <div className="flex items-center gap-3 px-4 py-3  bg-green-200">

                <div className="avatar w-12 h-12 rounded-full overflow-hidden">
                  <img
                    key={otherUser?.image}
                    src={
                      otherUser?.image
                        ? `http://localhost:5001${otherUser.image}`
                        : "/default-avatar.png"
                    }
                    alt={otherUser?.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div>
                  <h3 className="font-semibold text-lg">
                    {otherUser?.name}
                  </h3>
                  <p className="text-xs opacity-70">Online</p>
                </div>
              </div>

              <MessageList />
              <MessageInput focus />
            </Window>

            <Thread />
          </div>
        </Channel>
      </Chat>
    </div>
  );
};

export default ChatPage;
