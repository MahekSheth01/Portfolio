const SkillCard = ({
  icon,
  title,
}) => {

  return (

    <div
      className="
      p-6
      rounded-3xl
      border
      transition
      duration-300
      hover:-translate-y-2
      hover:shadow-2xl
      cursor-pointer
      "
      style={{
        backgroundColor:
          "var(--bg-secondary)",

        borderColor:
          "var(--border)",
      }}
    >

      <div
        className="
        text-5xl
        mb-5
        "
        style={{
          color:
            "var(--accent)",
        }}
      >
        {icon}
      </div>


      <h3
        className="
        text-xl
        font-semibold
        "
      >
        {title}
      </h3>

    </div>

  );

};

export default SkillCard;