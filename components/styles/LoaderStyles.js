import styled, { keyframes } from "styled-components";

const animate = keyframes`
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(3rem);
  }
`;

const jump = keyframes`
  0% {
    transform: translate(0, 0);
  }
  10% {
    transform: translate(1rem, -1rem);
  }
  20% {
    transform: translate(2rem, 1rem);
  }
  30% {
    transform: translate(3rem, -5rem);
  }
  70% {
    transform: translate(-15rem, -5rem);
  }
  80% {
    transform: translate(-14rem, 1rem);
  }
  90% {
    transform: translate(-13rem, -1rem);
  }
  100% {
    transform: translate(-12rem, 0);
  }
`;

export default styled.div`
  justify-content: center;
  vertical-align: middle;
  position: relative;
  display: flex;
  background: white;
  padding: 15rem;

  span {
    display: block;
    width: 2rem;
    height: 2rem;
    background: #eee;
    border-radius: 50%;
    margin: 0 .5rem;
    box-shadow: 0 .2rem .2rem rgba(0, 0, 0, 0.2);
  }

  span:nth-child(2) {
    background: #f07e6e;
  }

  span:nth-child(3) {
    background: #84cdfa;
  }

  span:nth-child(4) {
    background: #5ad1cd;
  }

  span:not(:last-child) {
    animation: ${animate} 1.5s linear infinite;
  }

  span:last-child {
    animation: ${jump} 1.5s ease-in-out infinite;
  }
`;