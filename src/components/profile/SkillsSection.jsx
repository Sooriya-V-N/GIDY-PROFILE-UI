function SkillsSection({ profile, setProfile, editMode }) {
  const handleSkillChange = (index, value) => {
    const updatedSkills = [...profile.skills];
    updatedSkills[index].name = value;

    setProfile({ ...profile, skills: updatedSkills });
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Skills</h2>

      <div className="flex flex-wrap gap-3">
        {profile.skills?.map((skill, index) =>
          editMode ? (
            <input
              key={index}
              value={skill.name}
              onChange={(e) =>
                handleSkillChange(index, e.target.value)
              }
              className="border px-3 py-1 rounded"
            />
          ) : (
            <span
              key={index}
              className="bg-gray-200 px-4 py-1 rounded-full text-sm"
            >
              {skill.name}
            </span>
          )
        )}
      </div>
    </div>
  );
}

export default SkillsSection;
