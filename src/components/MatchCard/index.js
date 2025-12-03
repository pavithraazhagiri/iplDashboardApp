const MatchCard = props => {
  const {details} = props
  const {competingTeam, competingTeamLogo, matchStatus, result} = details
  return (
    <li>
      <img src={competingTeamLogo} alt={`competing team ${competingTeam}`} />
      <p>{competingTeam}</p>
      <p>{result}</p>
      <p>{matchStatus}</p>
    </li>
  )
}

export default MatchCard
