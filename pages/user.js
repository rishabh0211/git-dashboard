import React, { useState, useEffect } from 'react';
import GhPolyglot from 'gh-polyglot';
import Head from '../components/Head';
import UserInfo from '../components/UserInfo';
import Charts from '../components/Charts';
import RepoInfo from '../components/RepoInfo';
import styled from "styled-components";
// import { mockLangData, mockProfileSummaryData, mockRateLimit, mockRepoData, mockUserData } from "../utils";

const StyledUser = styled.div`
  background: #ebeff2;
`;

const User = props => {
  const username = props.query.id;
  const [repoData, setRepoData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [profileSummaryData, setProfileSummaryData] = useState(null);
  const [langData, setLangData] = useState(null);
  
  useEffect(() => {
    getLangData();
    getRepoData();
    getUserDetails();
    getProfileSummaryData();
    // setUserData(mockUserData);
    // setLangData(mockLangData);
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
      .then(res => res.json())
      .then(data => {
        console.log('here');
        setRepoData(data);
      }).catch(err => {
        console.log(err);
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
      .then(res => res.json())
      .then(data => {
        setUserData(data);
      }).catch(err => {
        console.log(err);
      });
  };

  const getProfileSummaryData = () => {
    fetch(`/api/profile-summary/${username}`)
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
      {userData && <UserInfo userData={userData} />}
      {langData && profileSummaryData && repoData &&
        <Charts repoData={repoData} langData={langData} profileSummaryData={profileSummaryData} />
      }
      {repoData && <RepoInfo repoData={repoData} />}
    </StyledUser>
  )
}

export default User;