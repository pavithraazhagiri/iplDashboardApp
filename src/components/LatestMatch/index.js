import './index.css'

const LatestMatch = props => {
  const {details} = props
  const {
    competingTeam,
    competingTeamLogo,
    date,
    firstInnings,
    manOfTheMatch,
    result,
    secondInnings,
    umpires,
    venue,
  } = details
  const getLeftContainer = () => (
    <div className="latest-match-left-container">
      <p className="latest-match-competing-team">{competingTeam}</p>
      <p className="latest-match-competing-date">{date}</p>
      <p>{venue}</p>
      <p>{result}</p>
    </div>
  )
  const getMiddleContainer = () => (
    <div className="latest-match-middle-container">
      <img
        src={competingTeamLogo}
        alt={`latest match ${competingTeam}`}
        className="competing-team-logo"
      />
    </div>
  )
  const getRightContainer = () => (
    <div className="latest-match-right-container">
      <h1 className="latest-match-right-heading">First Innings</h1>
      <p className="latest-match-right-description">{firstInnings}</p>
      <h1 className="latest-match-right-heading">Second Innings</h1>
      <p className="latest-match-right-description">{secondInnings}</p>
      <h1 className="latest-match-right-heading">Man Of The Match</h1>
      <p className="latest-match-right-description">{manOfTheMatch}</p>
      <h1 className="latest-match-right-heading">Umpires</h1>
      <p className="latest-match-right-description">{umpires}</p>
    </div>
  )
  return (
    <>
      <div className="latest-match-container-small-devices">
        <div className="latest-match-container-small-devices-top-container">
          {getLeftContainer()}
          {getMiddleContainer()}
        </div>
        <hr className="small-devices-line" />
        {getRightContainer()}
      </div>
      <div className="latest-match-container-medium-large-devices">
        {getLeftContainer()}
        {getMiddleContainer()}
        {getRightContainer()}
      </div>
    </>
  )
}
export default LatestMatch
