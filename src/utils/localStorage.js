export const getTeams = () => {
  let teams = [];
  const getTeams = localStorage.getItem("teams");

  if (getTeams) teams = JSON.parse(getTeams);

  return teams;
};

export const addToTeams = (team) => {
  const teamConstruct = {
    id: Math.random().toString(36).substring(2, 7),
    ...team,
  };
  const teams = getTeams();

  teams.push(teamConstruct);
  localStorage.setItem("teams", JSON.stringify(teams));
};

export const getInviteUsers = () => {
  let inviteUsers = [];
  const getInviteUsers = localStorage.getItem("inviteUsers");

  if (getInviteUsers) inviteUsers = JSON.parse(getInviteUsers);

  return inviteUsers;
};

export const addToInviteUsers = (data) => {
  const dataConstruct = {
    id: Math.random().toString(36).substring(2, 7),
    ...data,
  };
  const inviteUsers = getInviteUsers();

  inviteUsers.push(dataConstruct);
  localStorage.setItem("inviteUsers", JSON.stringify(inviteUsers));
};

export const removeFromInviteUsers = (id) => {
  const inviteUsers = getInviteUsers();

  const findIndex = inviteUsers.findIndex((invite) => invite.id === id);
  inviteUsers.splice(findIndex, 1);

  localStorage.setItem("inviteUsers", JSON.stringify(inviteUsers));
};

export const acceptToTeams = (uid, teamID) => {
  const teams = getTeams();

  const team = teams.find((team) => team.id === teamID);
  team.users.push(uid);

  const findIndex = teams.findIndex((team) => team.id === teamID);
  teams.splice(findIndex, 1, team);

  localStorage.setItem("teams", JSON.stringify(teams));
};

export const getTasks = () => {
  let tasks = [];
  const getTasks = localStorage.getItem("tasks");

  if (getTasks) tasks = JSON.parse(getTasks);

  return tasks;
};

export const addToTasks = (task) => {
  const taskConstruct = {
    id: Math.random().toString(36).substring(2, 7),
    ...task,
    status: "pending",
  };
  const tasks = getTasks();

  tasks.push(taskConstruct);
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

export const updateTasks = (id, status) => {
  const tasks = getTasks();

  const findIndex = tasks.findIndex((task) => task.id === id);
  const constructTask = { ...tasks[findIndex], status };
  tasks.splice(findIndex, 1, constructTask);

  localStorage.setItem("tasks", JSON.stringify(tasks));
};
