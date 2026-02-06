import { VideoIcon,PhoneCall } from "lucide-react";

function CallButton({ handleVideoCall ,handleVoiceCall }) {
  return (
    <div className="p-3  mt-5.5 border-b flex items-center justify-end max-w-7xl mx-auto w-full absolute top-0">
      
      <button onClick={handleVideoCall} className="btn btn-success btn-sm text-black">

        <VideoIcon className="size-6" />
      </button>
    </div>
  );
}

export default CallButton;
