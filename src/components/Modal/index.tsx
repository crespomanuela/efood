import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { abrir, adicionar } from '../../store/reducers/carrinho'
import { cores } from '../../styles'
import type { Prato } from '../../types'
import { formataPreco } from '../../utils'

const Fundo = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;

  .overlay {
    position: absolute;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.73);
  }
`

const Conteudo = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  gap: 24px;
  padding: 32px;
  background-color: ${cores.salmao};
  color: ${cores.branco};

  > img {
    width: 280px;
    height: 280px;
    object-fit: cover;
  }

  h4 {
    font-size: 18px;
    font-weight: 900;
    margin-bottom: 16px;
  }

  p {
    font-size: 14px;
    line-height: 22px;
    margin-bottom: 16px;
  }

  button.comprar {
    background-color: ${cores.begeEscuro};
    color: ${cores.salmao};
    border: none;
    font-size: 14px;
    font-weight: bold;
    padding: 4px 8px;
    cursor: pointer;
  }
`

const Fechar = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  background: none;
  border: none;
  color: ${cores.branco};
  font-size: 18px;
  cursor: pointer;
`

type Props = {
  prato: Prato
  aoFechar: () => void
}

const Modal = ({ prato, aoFechar }: Props) => {
  const dispatch = useDispatch()

  const adicionarAoCarrinho = () => {
    dispatch(adicionar(prato))
    aoFechar()
    dispatch(abrir())
  }

  return (
    <Fundo>
      <Conteudo className="container">
        <img src={prato.foto} alt={prato.nome} />
        <div>
          <h4>{prato.nome}</h4>
          <p>{prato.descricao}</p>
          <p>Serve: de {prato.porcao}</p>
          <button
            type="button"
            className="comprar"
            onClick={adicionarAoCarrinho}
          >
            Adicionar ao carrinho - {formataPreco(prato.preco)}
          </button>
        </div>
        <Fechar type="button" onClick={aoFechar}>
          ✕
        </Fechar>
      </Conteudo>
      <div className="overlay" onClick={aoFechar} />
    </Fundo>
  )
}

export default Modal