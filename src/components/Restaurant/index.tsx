import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { cores } from '../../styles'
import estrela from '../../assets/images/estrela.svg'

const Card = styled.div`
  background-color: ${cores.branco};
  border: 1px solid ${cores.salmao};
  position: relative;

  > img {
    width: 100%;
    height: 217px;
    object-fit: cover;
    display: block;
  }
`

const Tags = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  display: flex;
  gap: 8px;

  span {
    background-color: ${cores.salmao};
    color: ${cores.begeEscuro};
    font-size: 12px;
    font-weight: bold;
    padding: 6px 4px;
  }
`

const Conteudo = styled.div`
  padding: 8px;

  .titulo {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 16px;
  }

  .titulo span {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  p {
    font-size: 14px;
    line-height: 22px;
    margin-bottom: 16px;
  }
`

const Botao = styled(Link)`
  display: inline-block;
  background-color: ${cores.salmao};
  color: ${cores.begeEscuro};
  font-size: 14px;
  font-weight: bold;
  padding: 4px 6px;
  text-decoration: none;
`

type Props = {
  titulo: string
  nota: number
  descricao: string
  imagem: string
  tags: string[]
}

const Restaurant = ({ titulo, nota, descricao, imagem, tags }: Props) => (
  <Card>
    <img src={imagem} alt={titulo} />
    <Tags>
      {tags.map((tag) => (
        <span key={tag}>{tag}</span>
      ))}
    </Tags>
    <Conteudo>
      <div className="titulo">
        <h3>{titulo}</h3>
        <span>
          {nota} <img src={estrela} alt="estrela" />
        </span>
      </div>
      <p>{descricao}</p>
      <Botao to="/perfil">Saiba mais</Botao>
    </Conteudo>
  </Card>
)

export default Restaurant