import {
  useEffect,
  useState,
} from "react";

import DashboardLayout from
"../layouts/DashboardLayout";

import DashboardCard from
"../components/DashboardCard";

import API from
"../services/api";


const Admin = () => {

  const [stats, setStats] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");


  // FETCH DASHBOARD STATS
  useEffect(() => {

    const fetchStats =
      async () => {

        try {

          const { data } =
            await API.get(
              "/dashboard/stats"
            );

          setStats(data);

        } catch (err) {

          setError(
            "Failed to load dashboard"
          );

        } finally {

          setLoading(false);

        }

      };

    fetchStats();

  }, []);


  // LOADING
  if (loading) {

    return (

      <DashboardLayout>

        <h2>
          Loading Dashboard...
        </h2>

      </DashboardLayout>

    );

  }


  // ERROR
  if (error) {

    return (

      <DashboardLayout>

        <h2>
          {error}
        </h2>

      </DashboardLayout>

    );

  }


  const dashboardData = [

    {
      title: "Projects",
      value:
        stats.totalProjects,
    },

    {
      title: "Skills",
      value:
        stats.totalSkills,
    },

    {
      title: "Achievements",
      value:
        stats.totalAchievements,
    },

    {
      title: "Messages",
      value:
        stats.totalMessages,
    },

    {
      title:
        "Unread Messages",
      value:
        stats.unreadMessages,
    },

    {
      title: "Timeline",
      value:
        stats.timelineItems,
    },

  ];


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
          Dashboard
        </h1>


        <p
          className="
          opacity-70
          "
        >
          Welcome back,
          Mahek 👋
        </p>

      </div>


      {/* STATS */}
      <div
        className="
        grid
        sm:grid-cols-2
        lg:grid-cols-3
        gap-6
        "
      >

        {
          dashboardData.map(
            (
              item,
              index
            ) => (

              <DashboardCard
                key={index}

                title={
                  item.title
                }

                value={
                  item.value
                }
              />

            )
          )
        }

      </div>

    </DashboardLayout>

  );

};

export default Admin;