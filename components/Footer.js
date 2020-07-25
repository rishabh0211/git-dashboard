import styled from "styled-components";

const StyledFooter = styled.footer`
  padding: 3rem 4rem;
  background: #353535;
  color: #fff;
  font-size: 1.4rem;
  text-align: right;

  a {
    color: #0c9a9a;

    &:hover {
      color: #0cd4d4;
      text-decoration: underline;
    }
  }
`;

const Footer = () => {
  return (
    <StyledFooter>
      Designed & Built with <span style={{color: '#0c9a9a'}}>&hearts;</span> by <a href="https://www.linkedin.com/in/rishabh-rastogi-955868103/" target="_blank">Rishabh Rastogi</a>.
      &copy; 2020
    </StyledFooter>
  )
}

export default Footer;