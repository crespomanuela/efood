import styled from 'styled-components'
import logo from '../../assets/images/logo.svg'
import redes from '../../assets/images/redes-sociais.svg'
import { cores } from '../../styles'

const Rodape = styled.footer`
  background-color: ${cores.begeEscuro};
  padding: 40px 0;
  text-align: center;

  .redes {
    display: block;
    margin: 32px auto 80px;
  }

  p {
    font-size: 10px;
    max-width: 480px;
    margin: 0 auto;
  }
`

const Footer = () => (
  <Rodape>
    <img src={logo} alt="efood" />
    <img className="redes" src={redes} alt="Redes sociais" />
    <p>
      A efood é uma plataforma para divulgação de estabelecimentos, a
      responsabilidade pela entrega, qualidade dos produtos é toda do
      estabelecimento contratado.
    </p>
  </Rodape>
)

export default Footer