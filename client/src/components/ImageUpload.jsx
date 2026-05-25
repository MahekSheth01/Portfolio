import {
  useState,
} from "react";

import API from
"../services/api";


const ImageUpload = ({
  onUpload,
}) => {

  const [loading, setLoading] =
    useState(false);

  const [preview, setPreview] =
    useState("");


  // HANDLE FILE
  const handleFileChange =
    async (e) => {

      const file =
        e.target.files[0];

      if (!file) return;


      // PREVIEW
      setPreview(
        URL.createObjectURL(file)
      );

      setLoading(true);

      try {

        const formData =
          new FormData();

        formData.append(
          "image",
          file
        );

        const { data } =
          await API.post(
            "/upload",
            formData
          );

        onUpload(
          data.imageUrl
        );

      } catch (error) {

        console.log(error);

        // show message via parent state if needed
        onUpload("");

      } finally {

        setLoading(false);

      }


    };


  return (

    <div
      className="
      flex
      flex-col
      gap-4
      "
    >

      {/* INPUT */}
      <input
        type="file"

        accept="image/*"

        onChange={
          handleFileChange
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


      {/* LOADING */}
      {
        loading && (
          <p>
            Uploading...
          </p>
        )
      }


      {/* PREVIEW */}
      {
        preview && (

          <img
            src={preview}

            alt="Preview"

            className="
            w-full
            h-64
            object-cover
            rounded-2xl
            "
          />

        )
      }

    </div>

  );

};

export default ImageUpload;