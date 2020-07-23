import { useState, useEffect, useRef } from "react";
import styled from 'styled-components';
import Router from 'next/router';
import Head from '../components/Head';
import { theme } from "../styles/index";
const { colors, fonts } = theme;

const StyledModalContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
  background: linear-gradient(#006d77 0%, #2b3f54 100%);

  form {
    width: 27rem;
    background: ${colors.aqua};
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 5px;
    padding: 3rem 2rem;
    box-shadow: 0 1rem 2rem rgba(27, 27, 27, .5);

    img {
      height: 10rem;
      width: 10rem;
    }
    input {
      margin-top: 4rem;
      width: 100%;
      background: ${colors.aqua};
      color: ${colors.white};
      border: none;
      border-bottom: solid 1px ${colors.white};
      font-size: 2rem;
      &::placeholder {
        color: ${colors.white}
      }
    }
    button {
      background: ${colors.white};
      color: ${colors.black};
      padding: 1rem 3rem;
      margin-top: 3rem;
      cursor: pointer;
      border-radius: 3px;
      font-size: 1.6rem;
    }
  }
`;

const Index = (props) => {

  const inputEl = useRef(null);
  useEffect(() => {
    setFocusOnInput();
  }, []);

  const setFocusOnInput = () => {
    inputEl.current.focus();
  };

  const [userId, setUserId] = useState('');
  const handleChange = event => {
    event.preventDefault();
    setUserId(event.target.value);
  };

  return (
    <main>
      <Head />
      <StyledModalContainer>
        <form autoComplete="off" onSubmit={e => {
          e.preventDefault();
          if (!userId) {
            setFocusOnInput();
            return ;
          }
          Router.push({
            pathname: '/user',
            query: {
              id: userId
            }
          })
        }}>
          <img src="/static/images/github-logo.png" />
          <input
            ref={inputEl}
            name="userId"
            type="text"
            placeholder="Enter your username"
            onChange={handleChange}
          />
          <button type="submit">Submit</button>
        </form>
      </StyledModalContainer>
    </main>
  )
};

export default Index;