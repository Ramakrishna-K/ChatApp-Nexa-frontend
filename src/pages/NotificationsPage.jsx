

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { acceptFriendRequest, getFriendRequests } from "../lib/api";
import {
  BellIcon,
  ClockIcon,
  MessageSquareIcon,
  UserCheckIcon,
} from "lucide-react";
import NoNotificationsFound from "../components/NoNotificationsFound";

const NotificationsPage = () => {
  const queryClient = useQueryClient();

  const { data: friendRequests, isLoading } = useQuery({
    queryKey: ["friendRequests"],
    queryFn: getFriendRequests,
  });

  const { mutate: acceptRequestMutation, isPending } = useMutation({
    mutationFn: acceptFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friendRequests"] });
      queryClient.invalidateQueries({ queryKey: ["friends"] });
    },
  });

  const incomingRequests = friendRequests?.incomingReqs || [];
  const acceptedRequests = friendRequests?.acceptedReqs || [];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#2d88f1] to-[#aaccef] p-4">
      <div className="container mx-auto max-w-4xl space-y-8 rounded-sm bg-blue-200">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight ml-3 mb-6">
          Notifications
        </h1>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          <>
            {/* 🔔 INCOMING FRIEND REQUESTS */}
            {incomingRequests.length > 0 && (
              <section className="space-y-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <UserCheckIcon className="h-5 w-5 text-primary" />
                  Friend Requests
                  <span className="badge badge-primary ml-2">
                    {incomingRequests.length}
                  </span>
                </h2>

                <div className="space-y-3">
                  {incomingRequests.map((request) => {
                    const sender = request.sender;

                    return (
                      <div
                        key={request._id}
                        className="card bg-base-200 shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="card-body p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              {/* ✅ AVATAR (FIXED) */}
                              <div className="avatar w-12 h-12 rounded-full overflow-hidden">
                                <img
                                  key={sender?.profilePic}
                                  src={
                                    sender?.profilePic
                                      ? `http://localhost:5001${sender.profilePic}`
                                      : "/default-avatar.png"
                                  }
                                  alt={sender.fullName}
                                  className="w-full h-full object-cover"
                                />
                              </div>

                              <div>
                                <h3 className="font-semibold">
                                  {sender.fullName}
                                </h3>
                                <div className="flex flex-wrap gap-1.5 mt-1">
                                  <span className="badge badge-secondary badge-sm">
                                    Native: {sender.nativeLanguage}
                                  </span>
                                  <span className="badge badge-outline badge-sm">
                                    Learning: {sender.learningLanguage}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <button
                              className="btn btn-primary btn-sm"
                              onClick={() =>
                                acceptRequestMutation(request._id)
                              }
                              disabled={isPending}
                            >
                              Accept
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* ✅ ACCEPTED REQUESTS */}
            {acceptedRequests.length > 0 && (
              <section className="space-y-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <BellIcon className="h-5 w-5 text-success ml-3" />
                  New Connections
                </h2>

                <div className="space-y-3">
                  {acceptedRequests.map((notification) => {
                    const user = notification.recipient;

                    return (
                      <div
                        key={notification._id}
                        className="card bg-base-200 shadow-sm"
                      >
                        <div className="card-body p-4">
                          <div className="flex items-start gap-3">
                            {/* ✅ AVATAR (FIXED) */}
                            <div className="avatar w-10 h-10 rounded-full overflow-hidden">
                              <img
                                key={user?.profilePic}
                                src={
                                  user?.profilePic
                                    ? `http://localhost:5001${user.profilePic}`
                                    : "/default-avatar.png"
                                }
                                alt={user.fullName}
                                className="w-full h-full object-cover"
                              />
                            </div>

                            <div className="flex-1">
                              <h3 className="font-semibold">
                                {user.fullName}
                              </h3>
                              <p className="text-sm my-1">
                                {user.fullName} accepted your friend request
                              </p>
                              <p className="text-xs flex items-center opacity-70">
                                <ClockIcon className="h-3 w-3 mr-1" />
                                Recently
                              </p>
                            </div>

                            <div className="badge badge-success">
                              <MessageSquareIcon className="h-3 w-3 mr-1" />
                              New Friend
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* 🚫 NO NOTIFICATIONS */}
            {incomingRequests.length === 0 &&
              acceptedRequests.length === 0 && (
                <NoNotificationsFound />
              )}
          </>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;

