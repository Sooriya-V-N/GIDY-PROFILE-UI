import { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../services/profileApi";
import ProfileHeader from "../components/profile/ProfileHeader";
import SkillsSection from "../components/profile/SkillsSection";
import SocialLinks from "../components/profile/SocialLinks";

function MyProfile() {
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
  const loadProfile = async () => {
    try {
      const data = await getProfile();
      setProfile(data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  loadProfile();
}, []);


  const handleSave = async () => {
    try {
      const updated = await updateProfile(profile);
      setProfile(updated);
      setEditMode(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (!profile) return <div className="text-center mt-20">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-16">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-6 md:p-10">
        
        <div className="flex justify-end mb-6">
          {editMode ? (
            <button
              onClick={handleSave}
              className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              className="bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition"
            >
              Edit Profile
            </button>
          )}
        </div>

        <ProfileHeader
          profile={profile}
          setProfile={setProfile}
          editMode={editMode}
        />

        <SocialLinks
          profile={profile}
          setProfile={setProfile}
          editMode={editMode}
        />

        <SkillsSection
          profile={profile}
          setProfile={setProfile}
          editMode={editMode}
        />
      </div>
    </div>
  );
}

export default MyProfile;
