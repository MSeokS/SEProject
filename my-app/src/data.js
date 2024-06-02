const data = [
  {
    id: 1,
    title: "Project 1",
    author: "John Doe",
    date: "2024-05-28",
    positions: ["Front-end", "Back-end"],
    recruitmentNumber: 5,
    startDate: "2024-06-01",
    endDate: "2024-08-31",
    location: "Remote",
    detail: `
        Project 1 is a web application aimed at revolutionizing online collaboration. 
        It provides a platform for teams to work together seamlessly, with features 
        such as real-time chat, task management, and file sharing. Built with modern 
        technologies such as React and Node.js, Project 1 offers a smooth and efficient 
        user experience. Join us and be part of the future of teamwork!
      `,
    status: "recruiting",
    isUserParticipant: false,
    isEvaluationPending: false,
  },
  {
    id: 2,
    title: "Project 2",
    author: "Jane Smith",
    date: "2024-05-29",
    positions: ["Full Stack Developer"],
    recruitmentNumber: 3,
    startDate: "2024-06-15",
    endDate: "2024-09-15",
    location: "Office",
    detail: `
        Project 2 is a mobile application designed to simplify task management for 
        busy professionals. With an intuitive user interface and powerful features, 
        it helps users organize their tasks, set reminders, and track progress. 
        Whether you're a freelancer juggling multiple projects or a team leader 
        overseeing a complex workflow, Project 2 has you covered. Join us and 
        experience productivity like never before!
      `,
    status: "closed",
    isUserParticipant: true,
    isEvaluationPending: true,
  },
];

export default data;
