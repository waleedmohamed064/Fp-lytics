import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  LogOut,
  Trash2,
  AlertCircle,
  CheckCircle,
  Loader2,
  User,
} from "lucide-react";
import {
  getUserProfile,
  updateUserProfile,
  logoutUser,
  deleteAccount,
} from "./api";

function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setIsLoading(true);
      // API Integration: http://127.0.0.1:8000/fpl/profile
      const data = await getUserProfile();
      setProfile(data);
      setEditData(data);
      setError(""); // Clear error if successful
    } catch (err) {
      const errorMsg = err.message || "Failed to load profile";
      setError(errorMsg);
      
      // Fallback to mock data for development if API is not available
      if (errorMsg.includes("Failed to fetch") || errorMsg.includes("fetch")) {
        const mockProfile = {
          username: "waleed",
          email: "waleedmohamednasir@gmail.com",
          fpl_team_name: "Elite Manager",
          rank: 1204,
        };
        setProfile(mockProfile);
        setEditData(mockProfile);
        setError("⚠️ Backend API not running. Using demo data. Start your backend server at http://127.0.0.1:8000");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      // API Integration: http://127.0.0.1:8000/api/logout/
      await logoutUser();
      localStorage.removeItem("authToken");
      navigate("/login");
    } catch (err) {
      setError(err.message || "Logout failed");
    }
  };

  const handleDeleteAccount = async () => {
    try {
      setIsDeleting(true);
      // API Integration: http://127.0.0.1:8000/api/delete-account/
      await deleteAccount();
      localStorage.removeItem("authToken");
      navigate("/login");
    } catch (err) {
      setError(err.message || "Account deletion failed");
      setIsDeleting(false);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      // API Integration: http://127.0.0.1:8000/fpl/profile (PUT)
      const updated = await updateUserProfile(editData);
      setProfile(updated);
      setIsEditing(false);
      setSuccess("Profile updated successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message || "Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && !profile) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="animate-spin text-emerald-300" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Success Message */}
      {success && (
        <div className="flex items-center gap-3 rounded-lg border border-emerald-400/40 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200">
          <CheckCircle size={18} />
          {success}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-3 rounded-lg border border-rose-400/40 bg-rose-400/10 px-4 py-3 text-sm text-rose-200">
          <AlertCircle size={18} />
          {error}
        </div>
      )}

      {/* Profile Card */}
      <div className="rounded-2xl border border-[#3d245b] bg-[#1e102f] p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="grid h-16 w-16 place-items-center rounded-full bg-emerald-300/20 text-emerald-300">
              <User size={32} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">
                {profile?.username || "User"}
              </h2>
              <p className="text-sm text-slate-400">{profile?.email}</p>
            </div>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 rounded-lg bg-emerald-300/20 text-emerald-300 text-sm font-semibold hover:bg-emerald-300/30 transition"
          >
            {isEditing ? "Cancel" : "Edit Profile"}
          </button>
        </div>

        {isEditing && (
          <form onSubmit={handleUpdateProfile} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                Username
              </label>
              <input
                type="text"
                value={editData.username || ""}
                onChange={(e) =>
                  setEditData({ ...editData, username: e.target.value })
                }
                className="w-full rounded-lg border border-[#472a67] bg-[#26143b] px-4 py-2 text-slate-100 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/30"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                Email
              </label>
              <input
                type="email"
                value={editData.email || ""}
                onChange={(e) =>
                  setEditData({ ...editData, email: e.target.value })
                }
                className="w-full rounded-lg border border-[#472a67] bg-[#26143b] px-4 py-2 text-slate-100 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/30"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="mt-4 w-full rounded-lg bg-emerald-300 px-4 py-2 text-sm font-bold text-[#072015] hover:brightness-105 transition disabled:opacity-50"
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </button>
          </form>
        )}
      </div>

      {/* Settings Section */}
      <div className="rounded-2xl border border-[#3d245b] bg-[#1e102f] p-6 space-y-4">
        <h3 className="text-lg font-semibold text-white">Account Settings</h3>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex w-full items-center justify-between rounded-lg border border-slate-600 bg-slate-800/30 px-4 py-3 text-slate-200 hover:bg-slate-800/50 transition"
        >
          <span className="font-medium">Sign Out</span>
          <LogOut size={18} />
        </button>

        {/* Delete Account Section */}
        <div className="space-y-3 border-t border-[#3c2458] pt-4">
          {!showDeleteConfirm ? (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="flex w-full items-center justify-between rounded-lg border border-rose-600/50 bg-rose-900/20 px-4 py-3 text-rose-300 hover:bg-rose-900/30 transition"
            >
              <span className="font-medium">Delete Account</span>
              <Trash2 size={18} />
            </button>
          ) : (
            <div className="rounded-lg border border-rose-600/50 bg-rose-900/20 p-4 space-y-3">
              <p className="text-sm text-rose-200">
                Are you sure? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 rounded-lg border border-slate-600 bg-slate-800/30 px-3 py-2 text-sm font-medium text-slate-200 hover:bg-slate-800/50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteAccount}
                  disabled={isDeleting}
                  className="flex-1 rounded-lg bg-rose-600 px-3 py-2 text-sm font-bold text-white hover:bg-rose-700 transition disabled:opacity-50 inline-flex items-center justify-center gap-2"
                >
                  {isDeleting ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    "Delete Forever"
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
