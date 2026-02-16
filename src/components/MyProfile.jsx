import { useEffect, useState } from "react";
import {
  getProfile,
  updateProfile,
  updateProfileImage,
} from "../services/profileApi";
import { Check, X, Camera, Trash2, Plus } from "lucide-react";
import { toast } from "react-toastify";
import Loader from "./Loader.jsx"

function MyProfile() {
  const [profile, setProfile] = useState(null);
  const [editingField, setEditingField] = useState(null);
  const [tempValue, setTempValue] = useState("");
  const [loading, setLoading] = useState(true);

  /* ================= FETCH PROFILE ================= */
  useEffect(() => {
    (async () => {
      try {
        const data = await getProfile();
        setProfile(data);
      } catch (error) {
        toast.error(error || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  /* ================= VALIDATION ================= */

  const validateField = (field, value) => {
    if (!value || value.trim() === "") {
      toast.error(`${field} cannot be empty`);
      return false;
    }

    if (field === "email" && !/\S+@\S+\.\S+/.test(value)) {
      toast.error("Invalid email format");
      return false;
    }

    if (field === "phone" && value.length < 10) {
      toast.error("Phone must be at least 10 digits");
      return false;
    }

    return true;
  };

  /* ================= EDIT HANDLERS ================= */

  function startEditing(field, value) {
    setEditingField(field);
    setTempValue(value || "");
  }

  function cancelEditing() {
    setEditingField(null);
    setTempValue("");
  }

  async function saveField(field) {
    if (!validateField(field.split(".").pop(), tempValue)) return;

    let updatedData = {};

    if (field.includes(".")) {
      const parts = field.split(".");
      const [parent, index, child] = parts;

      const updatedArray = [...profile[parent]];
      updatedArray[index][child] = tempValue;
      updatedData[parent] = updatedArray;
    } else {
      updatedData[field] = tempValue;
    }

    try {
      const updated = await updateProfile(updatedData);
      setProfile(updated);
      toast.success("Updated successfully");
    } catch {
      toast.error("Update failed");
    }

    setEditingField(null);
  }

  /* ================= IMAGE UPLOAD ================= */

  async function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Only images allowed");
      return;
    }

    try {
      const updated = await updateProfileImage(file);
      setProfile(updated.profile);
      toast.success("Profile image updated");
    } catch {
      toast.error("Image upload failed");
    }
  }

  /* ================= ARRAY OPERATIONS ================= */

  const addItem = async (field, newItem) => {
    if (!newItem) return;

    const updatedArray = [...(profile[field] || []), newItem];

    try {
      const updated = await updateProfile({ [field]: updatedArray });
      setProfile(updated);
      toast.success(`${field} added`);
    } catch {
      toast.error("Failed to add");
    }
  };

  const deleteItem = async (field, index) => {
    const updatedArray = profile[field].filter((_, i) => i !== index);

    try {
      const updated = await updateProfile({ [field]: updatedArray });
      setProfile(updated);
      toast.success("Deleted successfully");
    } catch {
      toast.error("Delete failed");
    }
  };

  if (loading)
    return (
      <Loader />
    );

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-100 via-white to-gray-200 py-8 px-4 md:px-10">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* ================= HEADER ================= */}
        <div className="bg-white rounded-3xl shadow-xl p-6 md:p-10 flex flex-col md:flex-row gap-8 items-center md:items-start transition hover:shadow-2xl">
          {/* PROFILE IMAGE */}
          <div className="relative group">
            <img
              src={`${import.meta.env.VITE_SERVER_URL}/${profile?.profileImage}`}
              alt="profile"
              className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-blue-500 shadow-lg"
            />

            <label className="absolute bottom-2 right-2 bg-blue-600 text-white p-2 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition">
              <Camera size={18} />
              <input type="file" hidden onChange={handleImageUpload} />
            </label>
          </div>

          {/* PROFILE DETAILS */}
          <div className="flex-1 space-y-3 text-center md:text-left">
            <InlineEditable label="name" value={profile?.name} {...props()} />
            <InlineEditable
              label="headline"
              value={profile?.headline}
              {...props()}
            />
            <InlineEditable
              label="location"
              value={profile?.location}
              {...props()}
            />

            <div className="border-t pt-4">
              <InlineEditable
                label="bio"
                value={profile?.bio}
                textarea
                {...props()}
              />
            </div>
          </div>
        </div>

        {/* ================= SKILLS ================= */}
        <Section title="Skills">
          <div className="flex flex-wrap gap-3">
            {profile?.skills?.map((skill, index) => (
              <div
                key={index}
                className="flex items-center gap-3 bg-blue-50 px-4 py-2 rounded-full shadow-sm hover:shadow-md transition"
              >
                <InlineEditable
                  label={`skills.${index}.name`}
                  value={skill.name}
                  {...props()}
                />
                <span className="text-xs text-gray-500">
                  👍 {skill.endorsements}
                </span>
                <Trash2
                  size={16}
                  className="text-red-500 cursor-pointer"
                  onClick={() => deleteItem("skills", index)}
                />
              </div>
            ))}
          </div>

          <button
            className="flex items-center gap-2 text-blue-600 font-medium hover:text-blue-800 transition"
            onClick={() =>
              addItem("skills", { name: "New Skill", endorsements: 0 })
            }
          >
            <Plus size={16} /> Add Skill
          </button>
        </Section>

        {/* ================= EXPERIENCE ================= */}
        {/* ================= EXPERIENCE ================= */}
        <Section title="Experience">
          {profile?.experience?.map((exp, index) => (
            <div
              key={exp._id}
              className="relative bg-gray-50 rounded-2xl p-6 shadow-sm hover:shadow-md transition"
            >
              <Trash2
                size={18}
                className="absolute top-4 right-4 text-red-500 cursor-pointer"
                onClick={() => deleteItem("experience", index)}
              />

              <div className="space-y-2">
                <InlineEditable
                  label={`experience.${index}.role`}
                  value={exp.role}
                  {...props()}
                />

                <InlineEditable
                  label={`experience.${index}.company`}
                  value={exp.company}
                  {...props()}
                />

                <InlineEditable
                  label={`experience.${index}.location`}
                  value={exp.location}
                  {...props()}
                />

                {/* DATE DISPLAY */}
                <div className="text-sm text-gray-500 font-medium">
                  <InlineEditable
                    label={`experience.${index}.startDate`}
                    value={exp.startDate}
                    {...props()}
                  />
                  {" - "}
                  <InlineEditable
                    label={`experience.${index}.endDate`}
                    value={exp.endDate}
                    {...props()}
                  />
                </div>

                <InlineEditable
                  label={`experience.${index}.description`}
                  value={exp.description}
                  textarea
                  {...props()}
                />
              </div>
            </div>
          ))}

          <button
            className="flex items-center gap-2 text-blue-600 font-medium hover:text-blue-800 transition"
            onClick={() =>
              addItem("experience", {
                role: "New Role",
                company: "Company",
                location: "Location",
                startDate: "Jan 2024",
                endDate: "Present",
                description: "",
              })
            }
          >
            <Plus size={16} /> Add Experience
          </button>
        </Section>

        {/* ================= EDUCATION ================= */}
        {/* ================= EDUCATION ================= */}
        <Section title="Education">
          {profile?.education?.map((edu, index) => (
            <div
              key={edu._id}
              className="relative bg-gray-50 rounded-2xl p-6 shadow-sm hover:shadow-md transition"
            >
              <Trash2
                size={18}
                className="absolute top-4 right-4 text-red-500 cursor-pointer"
                onClick={() => deleteItem("education", index)}
              />

              <div className="space-y-2">
                <InlineEditable
                  label={`education.${index}.degree`}
                  value={edu.degree}
                  {...props()}
                />

                <InlineEditable
                  label={`education.${index}.institution`}
                  value={edu.institution}
                  {...props()}
                />

                {/* YEAR DISPLAY */}
                <div className="text-sm text-gray-500 font-medium">
                  <InlineEditable
                    label={`education.${index}.startYear`}
                    value={edu.startYear}
                    {...props()}
                  />
                  {" - "}
                  <InlineEditable
                    label={`education.${index}.endYear`}
                    value={edu.endYear}
                    {...props()}
                  />
                </div>
              </div>
            </div>
          ))}

          <button
            className="flex items-center gap-2 text-blue-600 font-medium hover:text-blue-800 transition"
            onClick={() =>
              addItem("education", {
                degree: "Degree",
                institution: "Institution",
                startYear: "2024",
                endYear: "2028",
              })
            }
          >
            <Plus size={16} /> Add Education
          </button>
        </Section>
      </div>
    </div>
  );

  function props() {
    return {
      editingField,
      startEditing,
      tempValue,
      setTempValue,
      saveField,
      cancelEditing,
    };
  }
}

export default MyProfile;

/* ================= SECTION ================= */

function Section({ title, children }) {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-6 md:p-8 space-y-6 transition hover:shadow-xl">
      <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2">
        {title}
      </h2>
      {children}
    </div>
  );
}

/* ================= INLINE EDITABLE ================= */

function InlineEditable({
  label,
  value,
  editingField,
  startEditing,
  tempValue,
  setTempValue,
  saveField,
  cancelEditing,
  textarea,
}) {
  const isEditing = editingField === label;

  if (isEditing) {
    return (
      <div className="flex items-start gap-3 w-full">
        {textarea ? (
          <textarea
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            className="border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 p-2 rounded-lg w-full outline-none transition"
            rows={3}
            autoFocus
          />
        ) : (
          <input
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            className="border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 p-2 rounded-lg w-full outline-none transition"
            autoFocus
          />
        )}

        <div className="flex flex-col gap-2">
          <Check
            className="text-green-600 cursor-pointer hover:scale-110 transition"
            size={18}
            onClick={() => saveField(label)}
          />
          <X
            className="text-red-600 cursor-pointer hover:scale-110 transition"
            size={18}
            onClick={cancelEditing}
          />
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={() => startEditing(label, value)}
      className="cursor-pointer hover:bg-gray-100 px-3 py-2 rounded-lg transition w-full"
    >
      <p className="text-gray-700">{value || "Click to edit"}</p>
    </div>
  );
}
