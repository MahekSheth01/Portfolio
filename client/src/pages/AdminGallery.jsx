import {
  useEffect,
  useState,
} from "react";

import ImageUpload from
"../components/ImageUpload";

import DashboardLayout from
"../layouts/DashboardLayout";

import API from
"../services/api";


const AdminGallery = () => {

  const [gallery, setGallery] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [formData, setFormData] =
    useState({
      title: "",
      description: "",
      image: "",
    });


  // FETCH GALLERY
  const fetchGallery =
    async () => {

      try {

        const { data } =
          await API.get(
            "/achievements"
          );

        setGallery(data);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };


  useEffect(() => {

    fetchGallery();

  }, []);


  // HANDLE INPUT
  const handleChange = (e) => {

    setFormData({
      ...formData,

      [e.target.name]:
        e.target.value,
    });

  };


  // ADD GALLERY ITEM
  const handleSubmit = async (
    e
  ) => {

    e.preventDefault();

    if (!formData.image) {
      console.log("[AdminGallery] missing image url");
      return;
    }

    try {

      await API.post(
        "/achievements",
        formData
      );


      // REFRESH
      fetchGallery();

      // RESET FORM
      setFormData({
        title: "",
        description: "",
        image: "",
      });

    } catch (error) {

      console.log(error);

    }

  };


  // DELETE ITEM
  const deleteItem =
    async (id) => {

      try {

        await API.delete(
          `/achievements/${id}`
        );

        fetchGallery();

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
          Gallery Management
        </h1>


        <p
          className="
          opacity-70
          "
        >
          Manage achievements and
          memorable moments.
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

        {/* TITLE */}
        <input
          type="text"

          name="title"

          placeholder="Achievement Title"

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


        {/* IMAGE UPLOAD */}
        <div
          className="
          flex
          flex-col
          gap-4
          "
        >

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

        </div>


        {/* DESCRIPTION */}
        <textarea
          rows="5"

          name="description"

          placeholder="Description"

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


        {/* BUTTON */}
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
          Add Achievement
        </button>

      </form>


      {/* GALLERY LIST */}
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
              gallery.map(
                (
                  item
                ) => (

                  <div
                    key={
                      item._id
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
                        item.image
                      }

                      alt={
                        item.title
                      }

                      className="
                      w-full
                      h-64
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
                        {item.title}
                      </h2>


                      <p
                        className="
                        opacity-70
                        mb-6
                        "
                      >
                        {
                          item.description
                        }
                      </p>


                      {/* DELETE */}
                      <button

                        onClick={() =>
                          deleteItem(
                            item._id
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

export default AdminGallery;