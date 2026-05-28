import { useEffect, useState } from "react";
import { FaFileAlt, FaLink, FaCheck, FaExternalLinkAlt, FaTrash } from "react-icons/fa";
import DashboardLayout from "../layouts/DashboardLayout";
import API from "../services/api";

const AdminResume = () => {
  const [resumeLink, setResumeLink] = useState("");
  const [inputVal,   setInputVal]   = useState("");
  const [loading,    setLoading]    = useState(true);
  const [saving,     setSaving]     = useState(false);
  const [success,    setSuccess]    = useState("");
  const [error,      setError]      = useState("");

  // FETCH CURRENT SETTINGS
  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await API.get("/settings");
        setResumeLink(data?.resumeLink || "");
        setInputVal(data?.resumeLink || "");
      } catch {
        setError("Failed to load settings.");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  // SAVE RESUME LINK
  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccess("");
    setError("");
    try {
      const { data } = await API.put("/settings", { resumeLink: inputVal.trim() });
      setResumeLink(data.resumeLink);
      setSuccess("Resume link saved successfully ✅");
    } catch {
      setError("Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  // REMOVE RESUME LINK
  const handleRemove = async () => {
    setSaving(true);
    setSuccess("");
    setError("");
    try {
      await API.put("/settings", { resumeLink: "" });
      setResumeLink("");
      setInputVal("");
      setSuccess("Resume link removed ✅");
    } catch {
      setError("Failed to remove.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <DashboardLayout>

      {/* HEADER */}
      <div style={{ marginBottom: "2.5rem" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "0.5rem" }}>
          Resume
        </h1>
        <p style={{ opacity: 0.65 }}>
          Add your resume link — it will appear as a "Download Resume" button on the About section.
        </p>
      </div>

      {loading ? (
        <p style={{ opacity: 0.6 }}>Loading...</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem", maxWidth: "640px" }}>

          {/* CURRENT STATUS CARD */}
          <div style={{
            padding: "1.75rem",
            borderRadius: "1.25rem",
            border: "1px solid var(--border)",
            backgroundColor: "var(--bg-secondary)",
          }}>
            <p style={{ fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", opacity: 0.5, marginBottom: "1rem" }}>
              Current Resume
            </p>

            {resumeLink ? (
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
                <div style={{
                  display: "flex", alignItems: "center", gap: "0.75rem",
                  flex: 1, padding: "0.875rem 1rem",
                  borderRadius: "0.75rem", border: "1px solid var(--border)",
                  backgroundColor: "var(--bg-primary)", minWidth: 0,
                }}>
                  <FaFileAlt style={{ color: "var(--accent)", flexShrink: 0 }} />
                  <span style={{ fontSize: "0.9rem", opacity: 0.8, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {resumeLink}
                  </span>
                </div>

                <div style={{ display: "flex", gap: "0.6rem", flexShrink: 0 }}>
                  <a
                    href={resumeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Preview"
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "center",
                      width: 40, height: 40, borderRadius: "0.625rem",
                      backgroundColor: "var(--bg-primary)", border: "1px solid var(--border)",
                      color: "var(--accent)", textDecoration: "none", transition: "opacity 0.2s",
                    }}
                    onMouseEnter={e => e.currentTarget.style.opacity = "0.7"}
                    onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                  >
                    <FaExternalLinkAlt />
                  </a>

                  <button
                    onClick={handleRemove}
                    disabled={saving}
                    title="Remove"
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "center",
                      width: 40, height: 40, borderRadius: "0.625rem",
                      backgroundColor: "#ef444420", border: "1px solid #ef4444",
                      color: "#ef4444", cursor: "pointer", transition: "opacity 0.2s",
                    }}
                    onMouseEnter={e => e.currentTarget.style.opacity = "0.7"}
                    onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ) : (
              <div style={{
                display: "flex", alignItems: "center", gap: "0.75rem",
                padding: "1rem", borderRadius: "0.75rem",
                border: "1px dashed var(--border)", opacity: 0.5,
              }}>
                <FaFileAlt />
                <span style={{ fontSize: "0.9rem" }}>No resume link added yet</span>
              </div>
            )}
          </div>

          {/* FORM */}
          <form
            onSubmit={handleSave}
            style={{
              padding: "1.75rem",
              borderRadius: "1.25rem",
              border: "1px solid var(--border)",
              backgroundColor: "var(--bg-secondary)",
              display: "flex",
              flexDirection: "column",
              gap: "1.25rem",
            }}
          >
            <h2 style={{ fontSize: "1.1rem", fontWeight: 700 }}>
              {resumeLink ? "Update Resume Link" : "Add Resume Link"}
            </h2>

            <p style={{ fontSize: "0.875rem", opacity: 0.65, lineHeight: 1.6 }}>
              Paste a direct link to your resume PDF — from Google Drive, Dropbox, or any public URL.
              <br />
              <strong>Google Drive tip:</strong> Change the share link from <code style={{ fontSize: "0.8rem" }}>/view</code> to <code style={{ fontSize: "0.8rem" }}>/preview</code> for direct access.
            </p>

            <div style={{ display: "flex", gap: "0.75rem", alignItems: "stretch", flexWrap: "wrap" }}>
              <div style={{
                display: "flex", alignItems: "center", gap: "0.75rem",
                flex: 1, minWidth: "200px",
                padding: "0.875rem 1rem",
                borderRadius: "0.875rem",
                border: "1px solid var(--border)",
                backgroundColor: "var(--bg-primary)",
              }}>
                <FaLink style={{ color: "var(--accent)", flexShrink: 0 }} />
                <input
                  type="url"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder="https://drive.google.com/file/d/..."
                  required
                  style={{
                    flex: 1, border: "none", outline: "none",
                    backgroundColor: "transparent",
                    color: "var(--text-primary)", fontSize: "0.9rem",
                    width: "100%",
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={saving || !inputVal.trim()}
                style={{
                  display: "flex", alignItems: "center", gap: "0.5rem",
                  padding: "0.875rem 1.5rem",
                  borderRadius: "0.875rem",
                  backgroundColor: "var(--accent)", color: "#fff",
                  border: "none", cursor: saving ? "not-allowed" : "pointer",
                  fontWeight: 700, fontSize: "0.95rem",
                  opacity: saving || !inputVal.trim() ? 0.6 : 1,
                  transition: "opacity 0.2s", flexShrink: 0,
                }}
              >
                <FaCheck />
                {saving ? "Saving..." : "Save"}
              </button>
            </div>

            {success && <p style={{ color: "#22c55e", fontWeight: 600, fontSize: "0.875rem" }}>{success}</p>}
            {error   && <p style={{ color: "#ef4444", fontWeight: 600, fontSize: "0.875rem" }}>{error}</p>}
          </form>

        </div>
      )}
    </DashboardLayout>
  );
};

export default AdminResume;
