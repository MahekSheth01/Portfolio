import {
  useEffect,
  useState,
} from "react";

import DashboardLayout from
"../layouts/DashboardLayout";

import API from
"../services/api";

import {
  FaEnvelopeOpen,
  FaTrash,
} from "react-icons/fa";


const AdminMessages = () => {

  const [messages, setMessages] =
    useState([]);

  const [loading, setLoading] =
    useState(true);


  // FETCH MESSAGES
  const fetchMessages =
    async () => {

      try {

        const { data } =
          await API.get(
            "/messages"
          );

        setMessages(data);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };


  useEffect(() => {

    fetchMessages();

  }, []);


  // MARK AS READ
  const markAsRead =
    async (id) => {

      try {

        await API.put(
          `/messages/${id}`
        );

        fetchMessages();

      } catch (error) {

        console.log(error);

      }

    };


  // DELETE MESSAGE
  const deleteMessage =
    async (id) => {

      try {

        await API.delete(
          `/messages/${id}`
        );

        fetchMessages();

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
          Messages Inbox
        </h1>


        <p
          className="
          opacity-70
          "
        >
          Manage contact form
          messages from visitors.
        </p>

      </div>


      {/* LOADING */}
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
            flex
            flex-col
            gap-6
            "
          >

            {
              messages.length === 0
              ? (

                <div
                  className="
                  p-10
                  rounded-3xl
                  text-center
                  "
                  style={{
                    backgroundColor:
                      "var(--bg-secondary)",
                  }}
                >

                  <h2
                    className="
                    text-2xl
                    font-semibold
                    "
                  >
                    No Messages Yet
                  </h2>

                </div>

              )
              : (

                messages.map(
                  (
                    message
                  ) => (

                    <div
                      key={
                        message._id
                      }

                      className="
                      p-8
                      rounded-3xl
                      border
                      flex
                      flex-col
                      gap-6
                      "
                      style={{
                        backgroundColor:
                          message.isRead
                          ? "var(--bg-secondary)"
                          : "rgba(176,137,104,0.1)",

                        borderColor:
                          "var(--border)",
                      }}
                    >

                      {/* TOP */}
                      <div
                        className="
                        flex
                        flex-col
                        md:flex-row
                        md:items-center
                        md:justify-between
                        gap-4
                        "
                      >

                        <div>

                          <h2
                            className="
                            text-2xl
                            font-bold
                            mb-2
                            "
                          >
                            {
                              message.name
                            }
                          </h2>


                          <p
                            className="
                            opacity-70
                            "
                          >
                            {
                              message.email
                            }
                          </p>

                        </div>


                        {/* STATUS */}
                        <div
                          className="
                          px-4
                          py-2
                          rounded-full
                          text-sm
                          w-fit
                          "
                          style={{
                            backgroundColor:
                              message.isRead
                              ? "#22c55e"
                              : "#f59e0b",

                            color: "#fff",
                          }}
                        >

                          {
                            message.isRead
                            ? "Read"
                            : "Unread"
                          }

                        </div>

                      </div>


                      {/* SUBJECT */}
                      <div>

                        <h3
                          className="
                          text-xl
                          font-semibold
                          mb-2
                          "
                        >
                          Subject
                        </h3>


                        <p
                          className="
                          opacity-80
                          "
                        >
                          {
                            message.subject
                          }
                        </p>

                      </div>


                      {/* MESSAGE */}
                      <div>

                        <h3
                          className="
                          text-xl
                          font-semibold
                          mb-2
                          "
                        >
                          Message
                        </h3>


                        <p
                          className="
                          opacity-80
                          leading-relaxed
                          "
                        >
                          {
                            message.message
                          }
                        </p>

                      </div>


                      {/* ACTIONS */}
                      <div
                        className="
                        flex
                        flex-wrap
                        gap-4
                        "
                      >

                        {/* MARK READ */}
                        {
                          !message.isRead && (

                            <button

                              onClick={() =>
                                markAsRead(
                                  message._id
                                )
                              }

                              className="
                              flex
                              items-center
                              gap-2
                              px-5
                              py-3
                              rounded-2xl
                              "
                              style={{
                                backgroundColor:
                                  "var(--accent)",

                                color: "#fff",
                              }}
                            >

                              <FaEnvelopeOpen />

                              Mark Read

                            </button>

                          )
                        }


                        {/* DELETE */}
                        <button

                          onClick={() =>
                            deleteMessage(
                              message._id
                            )
                          }

                          className="
                          flex
                          items-center
                          gap-2
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

                          <FaTrash />

                          Delete

                        </button>

                      </div>

                    </div>

                  )
                )

              )
            }

          </div>

        )
      }

    </DashboardLayout>

  );

};

export default AdminMessages;