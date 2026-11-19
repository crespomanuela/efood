import { useEffect, useState } from 'react'
import styled from 'styled-components'
import Hero from '../../components/Hero'
import Restaurant from '../../components/Restaurant'
import type { Restaurante } from '../../types'

const Lista = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px 80px;
  padding: 80px 0 120px;
`

const Home = () => {
  const [restaurantes, setRestaurantes] = useState<Restaurante[]>([])

  useEffect(() => {
    fetch('https://api-ebac.vercel.app/api/efood/restaurantes')
      .then((res) => res.json())
      .then((res) => setRestaurantes(res))
  }, [])

  return (
    <>
      <Hero />
      <div className="container">
        <Lista>
          {restaurantes.map((r) => (
            <li key={r.id}>
              <Restaurant
                id={r.id}
                titulo={r.titulo}
                nota={r.avaliacao}
                descricao={r.descricao}
                imagem={r.capa}
                tags={r.destacado ? ['Destaque da semana', r.tipo] : [r.tipo]}
              />
            </li>
          ))}
        </Lista>
      </div>
    </>
  )
}

export default Home