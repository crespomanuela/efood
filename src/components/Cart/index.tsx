import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../../store'
import { fechar, remover } from '../../store/reducers/carrinho'
import { cores } from '../../styles'
import { formataPreco } from '../../utils'

const Container = styled.div<{ $aberto: boolean }>`
  position: fixed;
  inset: 0;
  display: ${(props) => (props.$aberto ? 'flex' : 'none')};
  justify-content: flex-end;
  z-index: 20;
`

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.7);
`

const Sidebar = styled.aside`
  position: relative;
  z-index: 1;
  width: 360px;
  max-width: 100%;
  background-color: ${cores.salmao};
  padding: 32px 8px;
  overflow-y: auto;
`

const Item = styled.li`
  position: relative;
  display: flex;
  gap: 8px;
  background-color: ${cores.begeEscuro};
  color: ${cores.salmao};
  padding: 8px 8px 12px;
  margin-bottom: 16px;

  img {
    width: 80px;
    height: 80px;
    object-fit: cover;
  }

  h3 {
    font-size: 18px;
    font-weight: 900;
    margin-bottom: 16px;
  }

  span {
    font-size: 14px;
  }

  button {
    position: absolute;
    right: 8px;
    bottom: 8px;
    border: none;
    background: none;
    color: ${cores.salmao};
    font-size: 16px;
    cursor: pointer;
  }
`

const Total = styled.p`
  display: flex;
  justify-content: space-between;
  color: ${cores.begeEscuro};
  font-size: 14px;
  font-weight: bold;
  margin: 40px 0 16px;
`

const Botao = styled.button`
  width: 100%;
  background-color: ${cores.begeEscuro};
  color: ${cores.salmao};
  border: none;
  font-size: 14px;
  font-weight: bold;
  padding: 4px;
  cursor: pointer;
`

const Cart = () => {
  const { itens, aberto } = useSelector((state: RootState) => state.carrinho)
  const dispatch = useDispatch()

  const total = itens.reduce((acumulador, item) => acumulador + item.preco, 0)

  return (
    <Container $aberto={aberto}>
      <Overlay onClick={() => dispatch(fechar())} />
      <Sidebar>
        <ul>
          {itens.map((item) => (
            <Item key={item.id}>
              <img src={item.foto} alt={item.nome} />
              <div>
                <h3>{item.nome}</h3>
                <span>{formataPreco(item.preco)}</span>
              </div>
              <button
                type="button"
                aria-label="Remover"
                onClick={() => dispatch(remover(item.id))}
              >
                ✕
              </button>
            </Item>
          ))}
        </ul>
        <Total>
          <span>Valor total</span>
          <span>{formataPreco(total)}</span>
        </Total>
        <Botao type="button">Continuar com a entrega</Botao>
      </Sidebar>
    </Container>
  )
}

export default Cart