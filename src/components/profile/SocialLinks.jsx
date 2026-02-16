function SocialLinks({ profile, setProfile, editMode }) {
  const handleChange = (field, value) => {
    setProfile({
      ...profile,
      socialLinks: {
        ...profile.socialLinks,
        [field]: value,
      },
    });
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Social Links</h2>

      <div className="grid md:grid-cols-2 gap-4">
        {["linkedin", "github", "twitter", "website"].map((platform) => (
          editMode ? (
            <input
              key={platform}
              type="text"
              value={profile.socialLinks?.[platform] || ""}
              onChange={(e) =>
                handleChange(platform, e.target.value)
              }
              placeholder={platform}
              className="border p-2 rounded"
            />
          ) : (
            profile.socialLinks?.[platform] && (
              <a
                key={platform}
                href={profile.socialLinks[platform]}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:underline"
              >
                {platform}
              </a>
            )
          )
        ))}
      </div>
    </div>
  );
}

export default SocialLinks;
