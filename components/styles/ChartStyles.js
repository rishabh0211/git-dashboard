import styled from "styled-components";
import { media } from "../../styles";

export default styled.section `
  margin: 10rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(40rem, 1fr));
  grid-gap: 1.5rem;

  ${media.bp1024`
    margin: 2rem;
  `}
  ${media.bp900`
    grid-template-columns: repeat(auto-fit, minmax(36rem, 1fr));
  `}
  ${media.bp760`
    margin: 10rem;
  `}
  ${media.bp560`
    margin: 1rem;
  `}
  ${media.bp375`
    grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
  `}

  .chart {
    background: #fff;
    border-radius: 1rem;
    box-shadow: 0 1rem 10rem rgba(0,0,0,.2);
    padding: 3rem;
    display: flex;
    flex-direction: column;

    header {
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 2rem;
      background-image: linear-gradient(to right, #3166a9, #088032);
      -webkit-background-clip: text;
      color: transparent;
      display: inline-block;
      text-transform: uppercase;
    }

    .nodata-msg {
      font-size: 2rem;
      font-weight: 300;
      -webkit-background-clip: text;
      color: #000;
      display: inline-block;
    }

    .chart__canvas {
      position: relative;
      flex-grow: 1;
      display: flex;
      align-items: center;
      &.error {
        flex-grow: unset;
      }
    }
  }

  .chart-1 {
    grid-column: span 2;

    ${media.bp760`
      grid-column: span 1;
    `}
  }
`;