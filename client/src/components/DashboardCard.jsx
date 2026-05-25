const DashboardCard = ({
  title,
  value,
}) => {

  return (

    <div
      className="
      p-8
      rounded-3xl
      border
      "
      style={{
        backgroundColor:
          "var(--bg-secondary)",

        borderColor:
          "var(--border)",
      }}
    >

      <p
        className="
        opacity-70
        mb-3
        "
      >
        {title}
      </p>


      <h2
        className="
        text-5xl
        font-bold
        "
      >
        {value}
      </h2>

    </div>

  );

};

export default DashboardCard;