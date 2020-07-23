import StyledUserInfo from "./styles/UserInfoStyles";
import { LocationIcon, CalendarIcon } from "@primer/octicons-react";

const UserInfo = ({ userData }) => {
  const { name, followers, following, created_at, location, login, avatar_url, public_repos } = userData;
  return (
    <StyledUserInfo>
      <div className="user">
        <div className="user__row">
          <div className="user__image">
            <a href={`https://github.com/${login}`} target="_blank">
              <img src={avatar_url} />
            </a>
          </div>
          <div className="user__info">
            <div className="user__item">{name}</div>
            <div className="user__item"><a href={`https://github.com/${login}`} target="_blank">@{login}</a></div>
            <div className="user__item">
              <LocationIcon className="icon" />
              {location}
            </div>
            <div className="user__item">
              <CalendarIcon className="icon" />
              Joined {new Date(created_at).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}</div>
          </div>
        </div>
        <div className="user__row">
          <div className="user__card">
            <div>Followers</div>
            {followers}
          </div>
          <div className="user__card">
            <div>Following</div>
            {following}
          </div>
          <div className="user__card">
            <div>Repositories</div>
            {public_repos}
          </div>
        </div>
      </div>
    </StyledUserInfo>
  )
}

export default UserInfo;