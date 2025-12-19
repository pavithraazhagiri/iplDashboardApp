import './index.css'
import {Link} from 'react-router-dom'

const TeamCard = props => {
  const {details} = props
  const {id, name, teamImageUrl} = details
  return (
    <li className="match-card-container">
      <Link to={`/team-matches/${id}`} className="match-card-link">
        <img src={teamImageUrl} alt={name} className="team-logo" />
        <p className="team-name">{name}</p>
      </Link>
    </li>
  )
}
export default TeamCard
