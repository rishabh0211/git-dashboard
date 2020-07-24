import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import GhPolyglot from 'gh-polyglot';
import Head from '../components/Head';
import UserInfo from '../components/UserInfo';
import Charts from '../components/Charts';
import RepoInfo from '../components/RepoInfo';
import styled from "styled-components";
import Loader from '../components/Loader';
// import { mockLangData, mockProfileSummaryData, mockRateLimit, mockRepoData, mockUserData } from "../utils";
import { theme } from "../styles/index";
const { colors, fonts } = theme;

const StyledUser = styled.div`
  background: #ebeff2;

  .error-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100%;
    background: linear-gradient(#006d77 0%, #2b3f54 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    img {
      height: 10rem;
      width: 10rem;
    }
    p {
      font-size: 2.4rem;
      color: #fff;
    }
    button {
      background: ${colors.white};
      color: ${colors.black};
      padding: 1rem 3rem;
      margin-top: 3rem;
      cursor: pointer;
      border-radius: 3px;
      font-size: 1.6rem;
      font-weight: 700;
    }
  }
`;

const User = props => {
  const username = props.query.id;
  const [repoData, setRepoData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [profileSummaryData, setProfileSummaryData] = useState(null);
  const [langData, setLangData] = useState();
  const [error, setError] = useState({ active: false, code: 200 });

  useEffect(() => {
    getLangData();
    getRepoData();
    getUserDetails();
    getProfileSummaryData();
    // setUserData(mockUserData);
    // setLangData(mockLangDatas);
    // setProfileSummaryData(mockProfileSummaryData);
    // setRepoData(mockRepoData);
  }, []);

  const getRateLimit = () => {
    const url = `https://api.github.com/rate_limit`;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        return { err, data };
      }).catch(err => {
        return { err, data };
      });
  };

  const getRepoData = () => {
    const url = `https://api.github.com/users/${username}/repos?per_page=100`;
    fetch(url)
      .then(res => {
        if (res.status === 404) {
          return setError({ active: true, code: 404 });
        }
        if (res.status === 403) {
          return setError({ active: true, code: 403 });
        }
        return res.json();
      })
      .then(data => {
        setRepoData(data);
      }).catch(err => {
        setError({ active: true, code: 400 });
      });
  };

  const getLangData = () => {
    const me = new GhPolyglot(username);
    me.userStats((err, stats) => {
      if (err) {
        console.error('Error:', err);
      }
      setLangData(stats);
    });
  };

  const getUserDetails = () => {
    const url = `https://api.github.com/users/${username}`;
    fetch(url)
      .then(res => {
        if (res.status === 404) {
          return setError({ active: true, code: 404 });
        }
        if (res.status === 403) {
          return setError({ active: true, code: 403 });
        }
        return res.json();
      })
      .then(data => {
        setUserData(data);
      }).catch(err => {
        setError({ active: true, code: 400 });
      });
  };

  const getProfileSummaryData = () => {
    fetch(`/api/profile-summary?username=${username}`)
      .then(res => res.json())
      .then(data => {
        setProfileSummaryData(data);
      }).catch(err => {
        console.log(err);
      });
  };

  return (
    <StyledUser>
      <Head title={`${username} Profile`} />
      {
        error.active ? (
          <div className="error-container">
            <img src="/static/images/github-logo.png" />
            {error.code === 404 &&
              <>
                <p>Cant find the user!</p>
                <button onClick={() => Router.push('/')}>
                  Go to home page
                </button>
              </>
            }
            {error.code === 403 && 
              <p>Oops! You've hit the rate limit for Github API. Try again Later!</p>
            }
            {error.code === 400 &&
              <>
               <p>Oops! Something went wrong</p>
                <button onClick={() => Router.push('/')}>
                  Go to home page
                </button>
              </>
            }
          </div>
        ) : (
            <>
              {userData && <UserInfo userData={userData} />}
              {(langData && langData.length && profileSummaryData && repoData) ?
                <Charts repoData={repoData} langData={langData} profileSummaryData={profileSummaryData} />
                :
                <div className="loader-container">
                  <Loader />
                </div>
              }
              {repoData && <RepoInfo repoData={repoData} />}
            </>
          )
      }
    </StyledUser>
  )
}

export default User;