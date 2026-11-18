import styled from 'styled-components'
import logo from '../../assets/images/logo.svg'
import fundo from '../../assets/images/fundo.png'

const Container = styled.header`
  background-image: url(${fundo});
  background-size: cover;
  height: 384px;
  padding-top: 40px;
  text-align: center;

  h1 {
    font-size: 36px;
    font-weight: 900;
    margin-top: 138px;
  }
`

const Hero = () => (
  <Container>
    <img src={logo} alt="efood" />
    <h1>
      Viva experiências gastronômicas
      <br />
      no conforto da sua casa
    </h1>
  </Container>
)

export default Hero