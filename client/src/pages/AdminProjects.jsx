import {
  useEffect,
  useState,
} from "react";

import DashboardLayout from
"../layouts/DashboardLayout";

import API from
"../services/api";

import ImageUpload from
"../components/ImageUpload";
const AdminProjects = () => {

  const [projects, setProjects] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [formData, setFormData] =
    useState({
      title: "",
      description: "",
      technologies: "",
      githubLink: "",
      liveLink: "",
      image: "",
    });


  // FETCH PROJECTS
  const fetchProjects =
    async () => {

      try {

        const { data } =
          await API.get(
            "/projects"
          );

        setProjects(data);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };


  useEffect(() => {

    fetchProjects();

  }, []);


  // HANDLE INPUT
  const handleChange = (e) => {

    setFormData({
      ...formData,

      [e.target.name]:
        e.target.value,
    });

  };


  // ADD PROJECT
  const handleSubmit = async (
    e
  ) => {

    e.preventDefault();
    setError("");
    setSuccess("");

    try {

      const newProject = {

        ...formData,

        technologies:
          formData.technologies
          .split(",").map(t => t.trim()).filter(Boolean),
      };

      await API.post(
        "/projects",
        newProject
      );

      setSuccess("Project added successfully! ✅");

      // REFRESH PROJECTS
      fetchProjects();

      // RESET FORM
      setFormData({
        title: "",
        description: "",
        technologies: "",
        githubLink: "",
        liveLink: "",
        image: "",
      });

    } catch (err) {

      setError(err.response?.data?.message || "Failed to add project");

    }

  };


  // DELETE PROJECT
  const deleteProject =
    async (id) => {

      try {

        await API.delete(
          `/projects/${id}`
        );

        fetchProjects();

      } catch (error) {

        console.log(error);

      }

    };


  return (

    <DashboardLayout>

      {/* HEADER */}
      <div
        className="
        mb-12
        "
      >

        <h1
          className="
          text-5xl
          font-bold
          mb-4
          "
        >
          Manage Projects
        </h1>


        <p
          className="
          opacity-70
          "
        >
          Add and manage your
          portfolio projects.
        </p>

      </div>


      {/* FORM */}
      <form

        onSubmit={
          handleSubmit
        }

        className="
        grid
        md:grid-cols-2
        gap-6
        mb-16
        "
      >

        <input
          type="text"

          name="title"

          placeholder="Project Title"

          value={
            formData.title
          }

          onChange={
            handleChange
          }

          required

          className="
          p-4
          rounded-2xl
          "
          style={{
            backgroundColor:
              "var(--bg-secondary)",
          }}
        />


        <ImageUpload
  onUpload={(url) =>

    setFormData({
      ...formData,
      image: url,
    })

  }
/>
{
  formData.image && (

    <p
      className="
      text-green-500
      "
    >
      Image uploaded successfully ✅
    </p>

  )
}


        <input
          type="text"

          name="githubLink"

          placeholder="GitHub Link"

          value={
            formData.githubLink
          }

          onChange={
            handleChange
          }

          className="
          p-4
          rounded-2xl
          "
          style={{
            backgroundColor:
              "var(--bg-secondary)",
          }}
        />


        <input
          type="text"

          name="liveLink"

          placeholder="Live Demo Link"

          value={
            formData.liveLink
          }

          onChange={
            handleChange
          }

          className="
          p-4
          rounded-2xl
          "
          style={{
            backgroundColor:
              "var(--bg-secondary)",
          }}
        />


        <input
          type="text"

          name="technologies"

          placeholder="React, Node, MongoDB"

          value={
            formData.technologies
          }

          onChange={
            handleChange
          }

          className="
          p-4
          rounded-2xl
          md:col-span-2
          "
          style={{
            backgroundColor:
              "var(--bg-secondary)",
          }}
        />


        <textarea
          rows="5"

          name="description"

          placeholder="Project Description"

          value={
            formData.description
          }

          onChange={
            handleChange
          }

          required

          className="
          p-4
          rounded-2xl
          md:col-span-2
          "
          style={{
            backgroundColor:
              "var(--bg-secondary)",
          }}
        />


        <button
          type="submit"

          className="
          py-4
          rounded-2xl
          md:col-span-2
          transition
          duration-300
          hover:scale-[1.02]
          "
          style={{
            backgroundColor:
              "var(--accent)",

            color: "#fff",
          }}
        >
          Add Project
        </button>

        {success && (
          <p className="md:col-span-2 text-green-500 font-medium">{success}</p>
        )}
        {error && (
          <p className="md:col-span-2 text-red-500 font-medium">{error}</p>
        )}

      </form>


      {/* PROJECT LIST */}
      {
        loading
        ? (
          <h2>
            Loading...
          </h2>
        )
        : (

          <div
            className="
            grid
            lg:grid-cols-3
            md:grid-cols-2
            gap-8
            "
          >

            {
              projects.map(
                (
                  project
                ) => (

                  <div
                    key={
                      project._id
                    }

                    className="
                    rounded-3xl
                    overflow-hidden
                    border
                    "
                    style={{
                      backgroundColor:
                        "var(--bg-secondary)",

                      borderColor:
                        "var(--border)",
                    }}
                  >

                    {/* IMAGE */}
                    <img
                      src={
                        project.image
                      }

                      alt={
                        project.title
                      }

                      className="
                      w-full
                      h-52
                      object-cover
                      "
                    />


                    {/* CONTENT */}
                    <div
                      className="
                      p-6
                      "
                    >

                      <h2
                        className="
                        text-2xl
                        font-bold
                        mb-4
                        "
                      >
                        {
                          project.title
                        }
                      </h2>


                      <p
                        className="
                        opacity-70
                        mb-6
                        "
                      >
                        {
                          project.description
                        }
                      </p>


                      {/* TECH */}
                      <div
                        className="
                        flex
                        flex-wrap
                        gap-3
                        mb-6
                        "
                      >

                        {
                          project.technologies?.map(
                            (
                              tech,
                              index
                            ) => (

                              <span
                                key={
                                  index
                                }

                                className="
                                px-3
                                py-1
                                rounded-full
                                text-sm
                                "
                                style={{
                                  backgroundColor:
                                    "var(--bg-primary)",
                                }}
                              >
                                {tech}
                              </span>

                            )
                          )
                        }

                      </div>


                      {/* DELETE */}
                      <button

                        onClick={() =>
                          deleteProject(
                            project._id
                          )
                        }

                        className="
                        px-5
                        py-3
                        rounded-2xl
                        "
                        style={{
                          backgroundColor:
                            "#ef4444",

                          color: "#fff",
                        }}
                      >
                        Delete
                      </button>

                    </div>

                  </div>

                )
              )
            }

          </div>

        )
      }

    </DashboardLayout>

  );

};

export default AdminProjects;