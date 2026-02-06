

import { useState, useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { completeOnboarding } from "../lib/api";
import { useAuth } from "../context/AppContext";
import {
  LoaderIcon,
  MapPinIcon,
  UserIcon,
  CameraIcon,
  TrashIcon,
} from "lucide-react";
import { LANGUAGES } from "../constants";

const OnboardingPage = () => {
  const { authUser, setUser } = useAuth();
  const queryClient = useQueryClient();
  const fileInputRef = useRef(null);

  const [formState, setFormState] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    gender: authUser?.gender || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    learningLanguage: authUser?.learningLanguage || "",
    location: authUser?.location || "",
    profilePic: null, // 🔹 FILE OBJECT for upload
    preview: authUser?.profilePic || "", // 🔹 IMAGE PREVIEW
  });

  /* ================= IMAGE UPLOAD ================= */
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    setFormState((prev) => ({
      ...prev,
      profilePic: file,
      preview: URL.createObjectURL(file),
    }));
  };

  /* ================= REMOVE IMAGE ================= */
  const handleRemoveImage = () => {
    setFormState((prev) => ({
      ...prev,
      profilePic: null,
      preview: "",
    }));
    toast.success("Profile image removed");
  };

  /* ================= API MUTATION ================= */
  const { mutate, isPending } = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: (data) => {
      toast.success("Profile updated successfully");
      setUser(data); // 🔹 global context update
      queryClient.setQueryData(["authUser"], data);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Something went wrong");
    },
  });

  /* ================= SUBMIT ================= */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formState.gender) {
      toast.error("Please select gender");
      return;
    }

    const formData = new FormData();
    formData.append("fullName", formState.fullName);
    formData.append("bio", formState.bio);
    formData.append("gender", formState.gender);
    formData.append("nativeLanguage", formState.nativeLanguage);
    formData.append("learningLanguage", formState.learningLanguage);
    formData.append("location", formState.location);

    if (formState.profilePic instanceof File) {
      formData.append("profilePic", formState.profilePic);
    }

    mutate(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-400 p-4">
      <div className="w-full max-w-3xl overflow-y-auto no-scrollbar rounded-2xl bg-white/90 shadow-2xl border border-white/30">
        <div className="p-6 sm:p-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-800 mb-8">
            Complete Your Profile
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* ================= PROFILE IMAGE ================= */}
            <div className="flex flex-col items-center space-y-3">
              <div
                className="relative size-36 rounded-full overflow-hidden
                           border-4 border-blue-500
                           bg-gradient-to-br from-gray-100 to-gray-200
                           cursor-pointer
                           shadow-lg
                           hover:scale-105 transition"
                onClick={() => fileInputRef.current.click()}
              >
                {formState.preview ? (
                  <img
                    src={formState.preview}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <UserIcon className="size-12 text-gray-400" />
                  </div>
                )}

                <div className="absolute bottom-2 right-2 bg-blue-600 p-2 rounded-full shadow-md">
                  <CameraIcon className="size-4 text-white" />
                </div>
              </div>

              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                className="hidden"
                onChange={handleImageUpload}
              />

              {formState.preview && (
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="flex items-center gap-2 text-sm text-red-500
                             hover:text-red-700 hover:underline transition"
                >
                  <TrashIcon className="size-4" />
                  Remove photo
                </button>
              )}
            </div>

            {/* ================= FULL NAME ================= */}
            <div>
              <label className="mb-1 block font-semibold text-gray-700">
                Full Name
              </label>
              <input
                value={formState.fullName}
                onChange={(e) =>
                  setFormState((p) => ({ ...p, fullName: e.target.value }))
                }
                className="w-full rounded-lg border border-gray-300
                           bg-white px-4 py-2 text-gray-800
                           focus:outline-none focus:ring-2 focus:ring-blue-500
                           transition"
                placeholder="Your full name"
              />
            </div>

            {/* ================= GENDER ================= */}
            <div>
              <label className="mb-1 block font-semibold text-gray-700">
                Gender
              </label>
              <select
                value={formState.gender}
                onChange={(e) =>
                  setFormState((p) => ({ ...p, gender: e.target.value }))
                }
                className="w-full rounded-lg border border-gray-300
                           bg-white px-4 py-2 text-gray-800
                           focus:outline-none focus:ring-2 focus:ring-blue-500
                           transition"
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* ================= BIO ================= */}
            <div>
              <label className="mb-1 block font-semibold text-gray-700">
                Bio
              </label>
              <textarea
                value={formState.bio}
                onChange={(e) =>
                  setFormState((p) => ({ ...p, bio: e.target.value }))
                }
                className="w-full min-h-[96px] rounded-lg border border-gray-300
                           bg-white px-4 py-2 text-gray-800
                           focus:outline-none focus:ring-2 focus:ring-blue-500
                           transition"
                placeholder="Tell something about yourself"
              />
            </div>

            {/* ================= LANGUAGES ================= */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="mb-1 block font-semibold text-gray-700">
                  Native Language
                </label>
                <select
                  value={formState.nativeLanguage}
                  onChange={(e) =>
                    setFormState((p) => ({ ...p, nativeLanguage: e.target.value }))
                  }
                  className="w-full rounded-lg border border-gray-300
                             bg-white px-4 py-2 text-gray-800
                             focus:outline-none focus:ring-2 focus:ring-blue-500
                             transition"
                >
                  <option value="">Select</option>
                  {LANGUAGES.map((lang) => (
                    <option key={lang} value={lang.toLowerCase()}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1 block font-semibold text-gray-700">
                  Learning Language
                </label>
                <select
                  value={formState.learningLanguage}
                  onChange={(e) =>
                    setFormState((p) => ({ ...p, learningLanguage: e.target.value }))
                  }
                  className="w-full rounded-lg border border-gray-300
                             bg-white px-4 py-2 text-gray-800
                             focus:outline-none focus:ring-2 focus:ring-blue-500
                             transition"
                >
                  <option value="">Select</option>
                  {LANGUAGES.map((lang) => (
                    <option key={lang} value={lang.toLowerCase()}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* ================= LOCATION ================= */}
            <div>
              <label className="mb-1 block font-semibold text-gray-700">
                Location
              </label>
              <div className="relative">
                <MapPinIcon className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                <input
                  value={formState.location}
                  onChange={(e) => setFormState((p) => ({ ...p, location: e.target.value }))}
                  className="w-full rounded-lg border border-gray-300
                             bg-white px-4 py-2 pl-12 text-gray-800
                             focus:outline-none focus:ring-2 focus:ring-blue-500
                             transition"
                  placeholder="City, Country"
                />
              </div>
            </div>

            {/* ================= SUBMIT ================= */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full rounded-xl bg-gradient-to-r from-green-500 to-emerald-500
                         py-3 font-semibold text-white
                         shadow-lg hover:shadow-xl
                         hover:scale-[1.02] transition
                         disabled:opacity-60"
            >
              {isPending ? (
                <span className="flex items-center justify-center gap-2">
                  <LoaderIcon className="size-5 animate-spin" />
                  Saving...
                </span>
              ) : (
                "Save Profile"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
