import ITeamName from '../interfaces/IteamName';
import IGoals from '../interfaces/Igoals';
import ILeaderB from '../interfaces/IleaderB';

class LeaderboardService {
  private teams: ITeamName[];
  private matches: IGoals[];

  constructor(teams: ITeamName[], matches: IGoals[]) {
    this.teams = teams;
    this.matches = matches;
  }

  public doneGoals = (teamId: number, teamMatches: IGoals[]): number => {
    const doneGoals = teamMatches.reduce((totalGoals: number, match) => {
      if (match.homeTeam === teamId) {
        return totalGoals + match.homeTeamGoals;
      }
      if (match.awayTeam === teamId) {
        return totalGoals + match.awayTeamGoals;
      }
      return totalGoals;
    }, 0);
    return doneGoals;
  };

  public takenGoals = (teamId: number, teamMatches: IGoals[]): number => {
    const taken = teamMatches.reduce((totalGoals: number, match) => {
      if (match.homeTeam === teamId) {
        return totalGoals + match.awayTeamGoals;
      }
      if (match.awayTeam === teamId) {
        return totalGoals + match.homeTeamGoals;
      }
      return totalGoals;
    }, 0);
    return taken;
  };

  public wins = (teamId: number, teamMatches: IGoals[]): number => {
    const wins = teamMatches.reduce((totalWins: number, match) => {
      if (match.homeTeam === teamId && match.homeTeamGoals > match.awayTeamGoals) {
        return totalWins + 1;
      }
      if (match.awayTeam === teamId && match.awayTeamGoals > match.homeTeamGoals) {
        return totalWins + 1;
      }
      return totalWins;
    }, 0);
    return wins;
  };

  public losts = (teamId: number, teamMatches: IGoals[]): number => {
    const losts = teamMatches.reduce((totalLosses: number, match) => {
      if (match.homeTeam === teamId && match.homeTeamGoals < match.awayTeamGoals) {
        return totalLosses + 1;
      }
      if (match.awayTeam === teamId && match.awayTeamGoals < match.homeTeamGoals) {
        return totalLosses + 1;
      }
      return totalLosses;
    }, 0);
    return losts;
  };

  public draws = (teamId: number, teamMatches: IGoals[]): number => {
    const draws = teamMatches.reduce((totalDraws: number, match) => {
      if (match.homeTeamGoals === match.awayTeamGoals) {
        return totalDraws + 1;
      }
      return totalDraws;
    }, 0);
    return draws;
  };

  public leaderBSoarter = (leaderB: ILeaderB[]) => {
    const orderedLeaderB = leaderB.sort((a, b) => {
      if (a.totalPoints < b.totalPoints) return 1;
      if (a.totalPoints > b.totalPoints) return -1;

      if (a.totalVictories < b.totalVictories) return 1;
      if (a.totalVictories > b.totalVictories) return -1;

      if (a.goalsBalance < b.goalsBalance) return 1;
      if (a.goalsBalance > b.goalsBalance) return -1;

      if (a.goalsFavor < b.goalsFavor) return 1;
      if (a.goalsFavor > b.goalsFavor) return -1;

      if (a.goalsOwn < b.goalsOwn) return 1;
      if (a.goalsOwn > b.goalsOwn) return -1;
      return 0;
    });
    return orderedLeaderB;
  };

  public allScores = (teamName:string, teamId: number, teamMatches: IGoals[]) => {
    const goalsFavor = this.doneGoals(teamId, teamMatches);
    const goalsOwn = this.takenGoals(teamId, teamMatches);
    const totalVictories = this.wins(teamId, teamMatches);
    const totalDraws = this.draws(teamId, teamMatches);
    const totalLosses = this.losts(teamId, teamMatches);
    const points = totalVictories * 3 + totalDraws;
    return {
      name: teamName,
      totalPoints: points,
      totalGames: teamMatches.length,
      totalVictories,
      totalDraws,
      totalLosses,
      goalsFavor,
      goalsOwn,
      goalsBalance: goalsFavor - goalsOwn,
      efficiency: Number(((points / ((teamMatches.length * 3))) * 100).toFixed(2)),
    };
  };

  public createHomeLeaderB = async () => {
    const { teams, matches } = this;
    const leaderB = teams
      .map((team) => {
        const teamMatches = matches.filter((match) => match.homeTeam === team.id);
        const teamData = this.allScores(team.teamName, team.id, teamMatches);
        return teamData;
      });

    const homeLeaderB = this.leaderBSoarter(leaderB);
    return homeLeaderB;
  };

  public createAwayLeaderB = async () => {
    const { teams, matches } = this;
    const leaderB = teams.map((team) => {
      const teamMatches = matches.filter((match) => match.awayTeam === team.id);
      const teamData = this.allScores(team.teamName, team.id, teamMatches);
      return teamData;
    });

    const awayLeaderB = this.leaderBSoarter(leaderB);
    return awayLeaderB;
  };

  public createLeaderboard = async () => {
    const { teams, matches } = this;
    const leaderB = teams.map((team) => {
      const teamMatches = matches.filter((match) => match.homeTeam === team.id
      || match.awayTeam === team.id);
      const teamData = this.allScores(team.teamName, team.id, teamMatches);
      return teamData;
    });

    const newLeaderB = this.leaderBSoarter(leaderB);
    return newLeaderB;
  };
}

export default LeaderboardService;
