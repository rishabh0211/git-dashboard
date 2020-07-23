import styled from "styled-components";
import { theme, media } from "../../styles";

const { fonts, colors } = theme;

export default styled.div `
  padding: 10rem;
  font-family: ${fonts.mono};

  ${media.bp1024`
    padding: 2rem;
  `}
  ${media.bp760`
    padding: 10rem;
  `}
  ${media.bp560`
    padding: 1rem;
  `}

  header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
    
    ${media.bp560`
      flex-direction: column;
    `}
    h1 {
      text-transform: uppercase;
      font-size: 3rem;
      font-weight: 700;
    }
  }

  .dropdown-container {
    display: flex;
    align-items: center;
    margin-right: 2rem;

    h3 {
      margin: 0;
      font-size: 1.6rem;
    }
  }

  .repo-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(32rem, 1fr));
    grid-gap: 1.5rem;

    .repo__card {
      background: #fff;
      border-radius: 1rem;
      padding: 2rem;
      font-size: 1.4rem;
      box-shadow: 0 1rem 1rem rgba(0,0,0,.1);
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      color: ${colors.grey2};
      transition: all .3s;

      &:hover {
        transform: scale(1.04);
      }

      .repo__card-date {
        font-size: 1.3rem;
        margin-top: .4rem;
        margin-bottom: 1.4rem;
      }
      .repo__lang-color {
        height: 12px;
        width: 12px;
        border-radius: 50%;
        display: inline-block;
        margin-right: .5rem;
      }
      .repo__card-bottom {
        display: flex;
        span {
          display: flex;
          margin-right: 1rem;
          align-items: center;
          margin-top: 1.4rem;
        }
        .icon {
          margin-right: 0.5rem;
        }
      }
    }
    h2 {
      margin-bottom: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 1.8rem;
      font-weight: 700;
    }
  }
`;