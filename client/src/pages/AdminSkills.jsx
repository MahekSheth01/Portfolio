import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import API from "../services/api";

const CATEGORIES = [
  { label: "Frontend",  value: "frontend" },
  { label: "Backend",   value: "backend"  },
  { label: "Database",  value: "database" },
  { label: "Tools",     value: "tools"    },
  { label: "Other",     value: "other"    },
];

const AdminSkills = () => {
  const [skills,  setSkills]  = useState([]);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState("");
  const [error,   setError]   = useState("");

  // ← field is "name" (matches DB), not "title"
  const [formData, setFormData] = useState({ name: "", category: "frontend", icon: "" });

  // FETCH
  const fetchSkills = async () => {
    try {
      const { data } = await API.get("/skills");
      setSkills(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchSkills(); }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // ADD SKILL
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setSuccess("");

    if (!formData.name.trim()) {
      setError("Skill name is required.");
      return;
    }

    try {
      await API.post("/skills", formData);
      setSuccess("Skill added successfully ✅");
      fetchSkills();
      setFormData({ name: "", category: "frontend", icon: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add skill.");
    }
  };

  // DELETE
  const deleteSkill = async (id) => {
    try {
      await API.delete(`/skills/${id}`);
      fetchSkills();
    } catch (e) { console.error(e); }
  };

  return (
    <DashboardLayout>

      {/* HEADER */}
      <div style={{ marginBottom: "2.5rem" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "0.5rem" }}>
          Skills Management
        </h1>
        <p style={{ opacity: 0.65 }}>Add and manage technologies shown on your portfolio.</p>
      </div>

      {/* ADD FORM */}
      <form
        onSubmit={handleSubmit}
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "1rem",
          padding: "1.75rem",
          borderRadius: "1.25rem",
          border: "1px solid var(--border)",
          backgroundColor: "var(--bg-secondary)",
          marginBottom: "3rem",
        }}
      >
        <h2 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.25rem" }}>
          Add New Skill
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
          {/* NAME — matches DB field */}
          <input
            type="text"
            name="name"
            placeholder="Skill Name (e.g. React)"
            value={formData.name}
            onChange={handleChange}
            required
            style={{
              padding: "0.875rem 1rem",
              borderRadius: "0.75rem",
              border: "1px solid var(--border)",
              backgroundColor: "var(--bg-primary)",
              color: "var(--text-primary)",
              fontSize: "0.95rem",
              outline: "none",
              width: "100%",
            }}
          />

          {/* CATEGORY — lowercase values matching DB enum */}
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            style={{
              padding: "0.875rem 1rem",
              borderRadius: "0.75rem",
              border: "1px solid var(--border)",
              backgroundColor: "var(--bg-primary)",
              color: "var(--text-primary)",
              fontSize: "0.95rem",
              outline: "none",
              width: "100%",
              cursor: "pointer",
            }}
          >
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>

          {/* ICON */}
          <input
            type="text"
            name="icon"
            placeholder="Icon key (e.g. react, nodejs)"
            value={formData.icon}
            onChange={handleChange}
            style={{
              padding: "0.875rem 1rem",
              borderRadius: "0.75rem",
              border: "1px solid var(--border)",
              backgroundColor: "var(--bg-primary)",
              color: "var(--text-primary)",
              fontSize: "0.95rem",
              outline: "none",
              width: "100%",
            }}
          />
        </div>

        {success && <p style={{ color: "#22c55e", fontWeight: 600, fontSize: "0.9rem" }}>{success}</p>}
        {error   && <p style={{ color: "#ef4444", fontWeight: 600, fontSize: "0.9rem" }}>{error}</p>}

        <button
          type="submit"
          style={{
            padding: "0.875rem",
            borderRadius: "0.75rem",
            fontWeight: 700,
            fontSize: "1rem",
            backgroundColor: "var(--accent)",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            transition: "opacity 0.2s",
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
          onMouseLeave={e => e.currentTarget.style.opacity = "1"}
        >
          + Add Skill
        </button>
      </form>

      {/* SKILLS LIST */}
      {loading ? (
        <p style={{ opacity: 0.6 }}>Loading skills...</p>
      ) : skills.length === 0 ? (
        <p style={{ opacity: 0.6 }}>No skills added yet. Add your first skill above.</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "1.25rem" }}>
          {skills.map((skill) => (
            <div
              key={skill._id}
              style={{
                padding: "1.5rem",
                borderRadius: "1.25rem",
                border: "1px solid var(--border)",
                backgroundColor: "var(--bg-secondary)",
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <span style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", opacity: 0.55 }}>
                {skill.category}
              </span>
              {/* DB field is "name", not "title" */}
              <h3 style={{ fontSize: "1.25rem", fontWeight: 700 }}>{skill.name}</h3>
              {skill.icon && (
                <span style={{ fontSize: "0.8rem", opacity: 0.55 }}>icon: {skill.icon}</span>
              )}
              <button
                onClick={() => deleteSkill(skill._id)}
                style={{
                  marginTop: "0.75rem",
                  padding: "0.5rem 1rem",
                  borderRadius: "0.625rem",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  backgroundColor: "#ef4444",
                  color: "#fff",
                  alignSelf: "flex-start",
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = "0.8"}
                onMouseLeave={e => e.currentTarget.style.opacity = "1"}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}

    </DashboardLayout>
  );
};

export default AdminSkills;