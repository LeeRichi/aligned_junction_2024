export const issues = [
  {
    id: 1,
    name: "Connection closed after 15min",
    tag: "fingrid",
    start: "2024-01-08",
    update: "2024-01-16",
    finish: "2024-01-22",
    status: { start: "unsuccessful", update: "successful", finish: "successful" }
  },
  {
    id: 2,
    name: "Compatibilty",
    tag: "Forum",
    start: "2024-01-16",
    update: "2024-01-26",
    finish: "2024-01-31",
    status: { start: "successful", update: "unsuccessful", finish: "successful" }
  },
  {
    id: 3,
    name: "UI improvements",
    tag: "Fingrid",
    start: "2024-06-11",
    update: "2024-06-21",
    finish: "2024-07-03",
    status: { start: "successful", update: "successful", finish: "successful" }
  },
  {
    id: 4,
    name: "Database connection will be changed",
    tag: "Vare",
    start: "2024-02-28",
    update: "2024-06-21",
    finish: "2024-07-03",
    status: { start: "unsuccessful", update: "unsuccessful", finish: "unsuccessful" }
  },
  {
    id: 5,
    name: "AI and Automated features",
    tag: "fingrid",
    start: "2024-01-08",
    update: "2024-11-21",
    finish: "2024-12-03",
    status: { start: "successful", update: "successful", finish: "successful" }
  },
  {
    id: 6,
    name: "Optimize experience on mobile web",
    tag: "Forum",
    start: "2024-01-08",
    update: "2024-11-21",
    finish: "2024-12-03",
    status: { start: "unsuccessful", update: "unsuccessful", finish: "unsuccessful" }
  },
  {
    id: 7,
    name: "Additional customisation options",
    tag: "Vare",
    start: "2024-11-14",
    update: "2024-11-21",
    finish: "2024-12-03",
    status: { start: "successful", update: "successful", finish: "unsuccessful" }
  },
];

export const mockRequests = [
	{
		id: 1,
		issue: 'Login not working',
		type: 'Bug',
		createdAt: '2024-11-01',
		updatedAt: '2024-11-02',
		status: 'Open',
		action: 'View',
	},
	{
		id: 2,
		issue: 'Add feature X',
		type: 'Feature',
		createdAt: '2024-10-30',
		updatedAt: '2024-11-01',
		status: 'In Progress',
		action: 'View',
	},
	// Add more sample requests here
	{
		id: 3,
		issue: 'Update documentation',
		type: 'Task',
		createdAt: '2024-11-05',
		updatedAt: '2024-11-06',
		status: 'Closed',
		action: 'View',
	},
];
