import styled, { css } from "styled-components";
import { theme } from "../../styles";
const { fonts, colors } = theme;

export default styled.div `
  position: relative;
  margin-left: 1rem;

  .selected-value {
    background: #ebeff2;
    padding: 1rem 2rem;
    width: 20rem;
    border-radius: .5rem;
    text-align: left;
    border: solid 1px #90e0ef;
    &:hover {
      background: #caf0f8;
    }
  }

  label {
    text-transform: capitalize;
    font-size: 1.6rem;
  }

  ul {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    z-index: 1;
    border-radius: 0 0 .5rem .5rem;
    opacity: 0;
    visibility: hidden;
    transition: all .3s;
    border: solid 1px #90e0ef;
    background: #caf0f8;
    border-top: none;

    li {
      padding: 1rem 2rem;
      transition: all .3s;
      text-transform: capitalize;
      cursor: pointer;
      font-size: 1.5rem;

      &:hover {
        background: #48cae4;
      }
    }
  }
  ${props =>
    props.active &&
    css`
      .selected-value {
        border-radius: .5rem .5rem 0 0;
        background: #caf0f8;
      }
      ul {
        opacity: 1;
        visibility: visible;
      }
    `
  }
`;