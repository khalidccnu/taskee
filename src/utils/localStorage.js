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
    users: [],
  };
  const teams = getTeams();

  teams.push(teamConstruct);
  localStorage.setItem("teams", JSON.stringify(teams));
};
