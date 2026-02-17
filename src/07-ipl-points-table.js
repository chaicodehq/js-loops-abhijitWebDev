/**
 * 🏆 IPL Season Points Table
 *
 * IPL ka season chal raha hai aur tujhe points table banana hai!
 * Tujhe match results ka array milega, aur tujhe har team ke points
 * calculate karke sorted table return karna hai.
 *
 * Match result types:
 *   - "win": Winning team gets 2 points, losing team gets 0
 *   - "tie": Both teams get 1 point each
 *   - "no_result": Both teams get 1 point each (rain/bad light)
 *
 * Each match object: { team1: "CSK", team2: "MI", result: "win", winner: "CSK" }
 *   - For "tie" and "no_result", the winner field is absent or ignored
 *
 * Rules (use for loop with object accumulator):
 *   - Loop through matches array
 *   - Build an object accumulator: { "CSK": { team, played, won, lost, tied, noResult, points }, ... }
 *   - After processing all matches, convert to array and sort:
 *     1. By points DESCENDING
 *     2. If points are equal, by team name ASCENDING (alphabetical)
 *
 * Validation:
 *   - Agar matches array nahi hai ya empty hai, return []
 *
 * @param {Array<{team1: string, team2: string, result: string, winner?: string}>} matches
 * @returns {Array<{team: string, played: number, won: number, lost: number, tied: number, noResult: number, points: number}>}
 *
 * @example
 *   iplPointsTable([
 *     { team1: "CSK", team2: "MI", result: "win", winner: "CSK" },
 *     { team1: "RCB", team2: "CSK", result: "tie" },
 *   ])
 *   // CSK: played=2, won=1, tied=1, points=3
 *   // MI: played=1, won=0, lost=1, points=0
 *   // RCB: played=1, tied=1, points=1
 *   // Sorted: CSK(3), RCB(1), MI(0)
 */
export function iplPointsTable(matches) {
  // Your code here
  if(!Array.isArray(matches) || matches.length === 0) return [];

  const table = {};
  
  for(let match of matches) {
    const {team1, team2, result, winner} = match;

    // initliaze teams1 in table if not already present
    if(!table[team1]) {
      table[team1] = {team:team1, played:0, won:0, lost:0, tied:0, noResult:0, points:0}
    }
    // initliaze teams2 in table if not already present
    if(!table[team2]) {
      table[team2] = {team:team2, played:0, won:0, lost:0, tied:0, noResult:0, points:0}
    }

    // update stats for both teams
    table[team1].played++;
    table[team2].played++;

    if(result === "win") {
      if(winner === team1) {
        table[team1].won++;
        table[team1].points += 2;
        table[team2].lost++;
      } else {
        table[team2].won++;
        table[team2].points += 2;
        table[team1].lost++;
      }
    } else if(result === "tie") {
      table[team1].tied++;
      table[team1].points += 1;
      table[team2].tied++;
      table[team2].points += 1;
    } else if(result === "no_result") {
      table[team1].noResult++;
      table[team1].points += 1;
      table[team2].noResult++;
      table[team2].points += 1;
    }
  };

  // convert table object to array
  const pointsTable = Object.values(table);

  // sort by points DESC, then by team name ASC
  pointsTable.sort((a, b) => {
    if(b.points !== a.points) {
      return b.points - a.points; // sort by points descending order
    }
    return a.team.localeCompare(b.team); // sort by team name ascending order
  });

  return pointsTable;   
}
