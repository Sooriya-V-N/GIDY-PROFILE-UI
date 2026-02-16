function ProfileHeader({ profile, setProfile, editMode }) {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
      <img
        src={profile.profileImage}
        alt="Profile"
        className="w-32 h-32 rounded-full object-cover border"
      />

      <div className="flex-1 text-center md:text-left">
        {editMode ? (
          <>
            <input
              type="text"
              value={profile.name}
              onChange={(e) =>
                setProfile({ ...profile, name: e.target.value })
              }
              className="border p-2 rounded w-full mb-3"
            />
            <textarea
              value={profile.bio}
              onChange={(e) =>
                setProfile({ ...profile, bio: e.target.value })
              }
              className="border p-2 rounded w-full"
            />
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold">{profile.name}</h1>
            <p className="text-gray-600 mt-2">{profile.bio}</p>
          </>
        )}
      </div>
    </div>
  );
}

export default ProfileHeader;
