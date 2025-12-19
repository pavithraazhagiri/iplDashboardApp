import './index.css'

const MatchCard = props => {
  const {details} = props
  const {competingTeam, competingTeamLogo, matchStatus, result} = details
  const colourClass = matchStatus === 'Lost' ? 'lost' : 'won'
  return (
    <li className="each-match-card-container">
      <img
        src={competingTeamLogo}
        alt={`competing team ${competingTeam}`}
        className="each-match-card-logo"
      />
      <p className="each-match-card-heading">{competingTeam}</p>
      <p className="each-match-card-result">{result}</p>
      <p className={`each-match-card-status ${colourClass}`}>{matchStatus}</p>
    </li>
  )
}

export default MatchCard
