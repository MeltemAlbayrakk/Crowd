export default function Freelancers() {
  const freelancers = [
    {
      freelancer: {
        id: "161c5548-996e-47bc-b311-a5e673acee27",
        firstName: "Erkan",
        lastName: "Yeter",
        userTitle: "asd",
        skills: [
          {
            label: "Angular",
            value: "angular",
          },
          {
            label: "Graphic Design",
            value: "design",
          },
          {
            label: "Information Architecture",
            value: "ia",
          },
        ],
      },
      job: {
        title: "sefsdfds",
        description: "sdfsdfdsf",
      },
    },
    {
      freelancer: {
        id: "161c5548-996e-47bc-b311-a5e673acee27",
        firstName: "Erkan",
        lastName: "Yeter",
        userTitle: null,
        skills: [
          {
            label: "Angular",
            value: "angular",
          },
          {
            label: "Graphic Design",
            value: "design",
          },
          {
            label: "Information Architecture",
            value: "ia",
          },
        ],
      },
      job: {
        title: "sefsdfds",
        description: "sdfsdfdsf",
      },
    },
    {
      freelancer: {
        id: "161c5548-996e-47bc-b311-a5e673acee27",
        firstName: "Erkan",
        lastName: "Yeter",
        userTitle: null,
        skills: [
          {
            label: "Angular",
            value: "angular",
          },
          {
            label: "Graphic Design",
            value: "design",
          },
          {
            label: "Information Architecture",
            value: "ia",
          },
        ],
      },
      job: {
        title: "sefsdfds",
        description: "sdfsdfdsf",
      },
    },
  ];

  return (
    <div className="freelancers">
      <div className="freelancers__header title">Freelancers</div>

      <ul className="freelancers__list">
        {freelancers.map((freelancer) => (
          <li className="freelancers__list__item">
            <div className="freelancers__list__name">
              {freelancer.freelancer.firstName +
                " " +
                freelancer.freelancer.lastName}
            </div>

            <ul className="freelancers__list__skills">
              {freelancer.freelancer.skills.map((free, index) => (
                <li>
                  {free.label}{" "}
                  {freelancer.freelancer.skills.length != index + 1 && <i>,</i>}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
