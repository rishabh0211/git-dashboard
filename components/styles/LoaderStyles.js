import styled, { keyframes } from "styled-components";

const animate = keyframes`
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(30px);
  }
`;

const jump = keyframes`
  0% {
    transform: translate(0, 0);
  }
  10% {
    transform: translate(10px, -10px);
  }
  20% {
    transform: translate(20px, 10px);
  }
  30% {
    transform: translate(30px, -50px);
  }
  70% {
    transform: translate(-150px, -50px);
  }
  80% {
    transform: translate(-140px, 10px);
  }
  90% {
    transform: translate(-130px, -10px);
  }
  100% {
    transform: translate(-120px, 0);
  }
`;

export default styled.div`
  justify-content: center;
  vertical-align: middle;
  position: relative;
  display: flex;
  background: white;
  padding: 150px;

  span {
    display: block;
    width: 20px;
    height: 20px;
    background: #eee;
    border-radius: 50%;
    margin: 0 5px;
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
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