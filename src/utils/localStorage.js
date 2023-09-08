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
