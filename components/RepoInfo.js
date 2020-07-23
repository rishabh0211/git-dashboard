import { useState, useEffect } from "react";
import StyledRepoInfo from './styles/RepoInfoStyles';
import StyledDropdown from './styles/DropdownStyles';
import FlipMove from 'react-flip-move';
import { langColors } from "../utils";
import { RepoForkedIcon, StarIcon } from "@primer/octicons-react";

const RepoInfo = ({ repoData }) => {

  const [topRepos, setTopRepos] = useState([]);
  const [sortType, setSortType] = useState('stars');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    getTopRepos(sortType);
  }, []);

  useEffect(() => {
    getTopRepos(sortType);
    setDropdownOpen(false);
  }, [sortType]);

  const getTopRepos = type => {
    const LIMIT = 12;
    const map = {
      stars: 'stargazers_count',
      forks: 'forks_count',
      size: 'size',
    };
    const sortType = map[type];
    const sortedRepos = repoData
      .filter(repo => !repo.fork)
      .sort((a, b) => b[sortType] - a[sortType])
      .slice(0, LIMIT);

    setTopRepos(sortedRepos);
  };

  const changeSortType = type => {
    if (type !== sortType) {
      setSortType(type);
    }
    setDropdownOpen(!dropdownOpen);
  };

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const sortTypes = ['forks', 'stars', 'size'];

  return (
    <StyledRepoInfo>
      <header>
        <h1>Repositories</h1>
        <div className="dropdown-container">
          <h3>Sort By</h3>
          <StyledDropdown active={dropdownOpen}>
            <button className="selected-value" onClick={toggleDropdown}>
              <label>{sortType}</label>
            </button>
            <ul>
              {sortTypes.map(key => (
                <li key={key} onClick={() => changeSortType(key)}>{key}</li>
              ))}
            </ul>
          </StyledDropdown>
        </div>
      </header>
      <FlipMove typeName="ul" className="repo-list">
        {topRepos.map(repo => (
          <li key={repo.id}>
            <a className="repo__card" href={repo.html_url} target="_blank">
              <div className="repo__card-top">
                <h2>{repo.name}</h2>
                <div className="repo__card-date">Created: {new Date(repo.created_at).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}</div>
                <p>{repo.description}</p>
              </div>
              <div className="repo__card-bottom">
                <span>
                  <div className="repo__lang-color" style={{ background: langColors[repo.language] ? langColors[repo.language].color : 'transparent' }}></div>
                  {repo.language}
                </span>
                <span>
                  <StarIcon className="icon" />
                  {repo.stargazers_count}
                </span>
                <span>
                  <RepoForkedIcon className="icon" />
                  {repo.forks_count}
                </span>
              </div>
            </a>
          </li>
        ))}
      </FlipMove>
    </StyledRepoInfo>
  )
}

export default RepoInfo;