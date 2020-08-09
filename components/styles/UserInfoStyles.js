import styled from "styled-components";
import { media } from "../../styles";

export default styled.section `
  position: relative;
  background-image: linear-gradient(to right, #6565657a, #6b6b6b9e), url(../static/images/hero.jpg);
  background-size: contain;
  padding: 4rem;
  ${media.bp560`
    padding: 2rem;
  `}

  .user__row {
    color: #fff;
    max-width: 60rem;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;

    &:not(:first-child) {
      margin-top: 2rem;
    }

    ${media.bp560`
      &:first-child {
        flex-direction: column;
        align-items: center;
        .user__info {
          border-left: solid .5rem;
        }
      }
    `}

    .user__image {
      width: 20rem;
      align-self: stretch;
      border: solid .5rem #fff;
      ${media.bp560`
        border-bottom: none;
        align-self: center;
      `}
    }

    img {
      width: 20rem;
    }
    .user__info {
      font-size: 2rem;
      color: #fff;
      font-weight: 500s;
      flex-grow: 1;
      background: linear-gradient(to right bottom, black, #0e0c0c75);
      border: solid .5rem;
      border-left: none;
      padding: 1rem;

      ${media.bp560`
        font-size: 1.6rem;
      `}

      a {
        color: #4c81f9;
      }
    }
    .user__item {
      display: flex;
      align-items: center;
      
      &:not(:first-child) {
        margin-top: .5rem;
      }

      .icon {
        margin-right: 0.4rem;
      }
      a:hover {
        text-decoration: underline;
      }
    }
    .user__card {
      background: #0000008a;
      color: #fff;
      font-weight: 700;
      font-size: 2rem;
      padding: 1rem;
      border-radius: 1rem;
      box-shadow: 0 1rem 3rem rgba(255, 255, 255, 0.1);
      width: 32%;
      height: 8rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      text-transform: uppercase;

      ${media.bp560`
        font-size: 1.2rem;
        height: 6rem;
      `}
    }
  }
`;