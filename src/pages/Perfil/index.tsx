import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import Header from '../../components/Header'
import Product from '../../components/Product'
import { cores } from '../../styles'
import Modal from '../../components/Modal'
import Cart from '../../components/Cart'
import type { Prato, Restaurante } from '../../types'

const Banner = styled.div<{ $capa: string }>`
  background-image: url(${(props) => props.$capa});
  background-size: cover;
  background-position: center;
  height: 280px;
  position: relative;
  color: ${cores.branco};
  font-size: 32px;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .container {
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 24px 0 32px;
  }

  span {
    font-weight: 100;
    text-transform: capitalize;
  }

  h2 {
    font-weight: 900;
  }
`

const Lista = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  padding: 56px 0 120px;
`

const Perfil = () => {
  const { id } = useParams()
  const [restaurante, setRestaurante] = useState<Restaurante>()
  const [pratoSelecionado, setPratoSelecionado] = useState<Prato | null>(null)

  useEffect(() => {
    fetch(`https://api-ebac.vercel.app/api/efood/restaurantes/${id}`)
      .then((res) => res.json())
      .then((res) => setRestaurante(res))
  }, [id])

  if (!restaurante) {
    return (
      <>
        <Header />
        <h3 className="container">Carregando...</h3>
      </>
    )
  }

  return (
    <>
      <Header />
      <Banner $capa={restaurante.capa}>
        <div className="container">
          <span>{restaurante.tipo}</span>
          <h2>{restaurante.titulo}</h2>
        </div>
      </Banner>
      <div className="container">
        <Lista>
          {restaurante.cardapio.map((prato) => (
            <li key={prato.id}>
              <Product
                titulo={prato.nome}
                descricao={prato.descricao}
                imagem={prato.foto}
                aoClicar={() => setPratoSelecionado(prato)}
              />
            </li>
          ))}
        </Lista>
      </div>
      {pratoSelecionado && (
        <Modal
          prato={pratoSelecionado}
          aoFechar={() => setPratoSelecionado(null)}
        />
      )}
      <Cart />
    </>
  )
}

export default Perfil