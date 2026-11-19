import styled from 'styled-components'
import { cores } from '../../styles'

const Card = styled.div`
  background-color: ${cores.salmao};
  color: ${cores.begeEscuro};
  padding: 8px;
  height: 100%;
  display: flex;
  flex-direction: column;

  img {
    width: 100%;
    height: 167px;
    object-fit: cover;
    display: block;
  }

  h3 {
    font-size: 16px;
    font-weight: 900;
    margin: 8px 0;
  }

  p {
    font-size: 14px;
    line-height: 22px;
    margin-bottom: 8px;
    flex: 1;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  button {
    width: 100%;
    background-color: ${cores.begeEscuro};
    color: ${cores.salmao};
    border: none;
    font-size: 14px;
    font-weight: bold;
    padding: 4px;
    cursor: pointer;
  }
`

type Props = {
  titulo: string
  descricao: string
  imagem: string
  aoClicar: () => void
}

const Product = ({ titulo, descricao, imagem, aoClicar }: Props) => (
  <Card>
    <img src={imagem} alt={titulo} />
    <h3>{titulo}</h3>
    <p>{descricao}</p>
    <button type="button" onClick={aoClicar}>
      Adicionar ao carrinho
    </button>
  </Card>
)

export default Product