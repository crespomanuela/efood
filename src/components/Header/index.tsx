import styled from 'styled-components'
import { Link } from 'react-router-dom'
import logo from '../../assets/images/logo.svg'
import fundo from '../../assets/images/fundo-2.png'
import { cores } from '../../styles'

const Container = styled.header`
  background-image: url(${fundo});
  background-size: cover;
  height: 163px;
  font-size: 18px;
  font-weight: 900;

  .container {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  a {
    color: ${cores.salmao};
    text-decoration: none;
  }
`

const Header = () => (
  <Container>
    <div className="container">
      <Link to="/">Restaurantes</Link>
      <img src={logo} alt="efood" />
      <span>0 produto(s) no carrinho</span>
    </div>
  </Container>
)

export default Header