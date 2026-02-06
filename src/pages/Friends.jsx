

import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { MessageCircleIcon, MapPinIcon } from "lucide-react";
import { getUserFriends } from "../lib/api";
import NoFriendsFound from "../components/NoFriendsFound";
import { capitialize } from "../lib/utils";
import { getLanguageFlag } from "../components/FriendCard";

const Friends = () => {
  const {
    data: friends = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2d88f1] to-[#aaccef] p-4">
      <div className="container mx-auto space-y-8">

        {/* ===== Page Header ===== */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Your Friends
          </h1>
        </div>

        {/* ===== Loading ===== */}
        {isLoading && (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg" />
          </div>
        )}

        {/* ===== Error ===== */}
        {isError && (
          <div className="text-center text-error py-12">
            Failed to load friends 😢
          </div>
        )}

        {/* ===== Empty State ===== */}
        {!isLoading && !isError && friends.length === 0 && (
          <NoFriendsFound />
        )}

        {/* ===== Friends Grid ===== */}
        {!isLoading && !isError && friends.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {friends.map((friend) => (
              <div
                key={friend._id}
                className="card bg-base-200 hover:shadow-[0_10px_30px_rgba(0,0,0,0.85)] transition-all duration-300"
              >
                <div className="card-body p-5 space-y-4 bg-blue-200 rounded-sm">

                  {/* Avatar + Name */}
                  <div className="flex items-center gap-3">
                    <div className="avatar w-12 h-12 rounded-full overflow-hidden">
                      <img
                        src={
                          friend.profilePic
                            ? `http://localhost:5001${friend.profilePic}`
                            : "/default-avatar.png"
                        }
                        alt={friend.fullName}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div>
                      <h3 className="font-semibold text-lg">
                        {friend.fullName}
                      </h3>

                      {friend.location && (
                        <div className="flex items-center text-xs opacity-70">
                          <MapPinIcon className="size-3 mr-1" />
                          {friend.location}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Languages */}
                  <div className="flex flex-wrap gap-2">
                    <span className="badge badge-secondary">
                      {getLanguageFlag(friend.nativeLanguage)}
                      Native: {capitialize(friend.nativeLanguage)}
                    </span>
                    <span className="badge badge-outline">
                      {getLanguageFlag(friend.learningLanguage)}
                      Learning: {capitialize(friend.learningLanguage)}
                    </span>
                  </div>

                  {/* Message Button */}
                  <Link
                    to={`/chat/${friend._id}`}
                    className="btn btn-primary w-full mt-2"
                  >
                    <MessageCircleIcon className="size-4 mr-2" />
                    Message
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Friends;
