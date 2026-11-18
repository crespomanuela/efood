import styled from 'styled-components'
import Hero from '../../components/Hero'
import Restaurant from '../../components/Restaurant'
import sushi from '../../assets/images/sushi.png'
import macarrao from '../../assets/images/macarrao.png'

const Lista = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px 80px;
  padding: 80px 0 120px;
`

const textoItaliano =
  'A La Dolce Vita Trattoria leva a autêntica cozinha italiana até você! Desfrute de massas caseiras, pizzas deliciosas e risotos incríveis, tudo no conforto do seu lar. Entrega rápida, pratos bem embalados e sabor inesquecível. Peça já!'

const restaurantes = [
  {
    id: 1,
    titulo: 'Hioki Sushi',
    nota: 4.9,
    descricao:
      'Peça já o melhor da culinária japonesa no conforto da sua casa! Sushis frescos, sashimis deliciosos e pratos quentes irresistíveis. Entrega rápida, embalagens cuidadosas e qualidade garantida. Experimente o Japão sem sair do lar com nosso delivery!',
    imagem: sushi,
    tags: ['Destaque da semana', 'Japonesa']
  },
  { id: 2, titulo: 'La Dolce Vita Trattoria', nota: 4.6, descricao: textoItaliano, imagem: macarrao, tags: ['Italiana'] },
  { id: 3, titulo: 'La Dolce Vita Trattoria', nota: 4.6, descricao: textoItaliano, imagem: macarrao, tags: ['Italiana'] },
  { id: 4, titulo: 'La Dolce Vita Trattoria', nota: 4.6, descricao: textoItaliano, imagem: macarrao, tags: ['Italiana'] },
  { id: 5, titulo: 'La Dolce Vita Trattoria', nota: 4.6, descricao: textoItaliano, imagem: macarrao, tags: ['Italiana'] },
  { id: 6, titulo: 'La Dolce Vita Trattoria', nota: 4.6, descricao: textoItaliano, imagem: macarrao, tags: ['Italiana'] }
]

const Home = () => (
  <>
    <Hero />
    <div className="container">
      <Lista>
        {restaurantes.map((r) => (
          <li key={r.id}>
            <Restaurant
              titulo={r.titulo}
              nota={r.nota}
              descricao={r.descricao}
              imagem={r.imagem}
              tags={r.tags}
            />
          </li>
        ))}
      </Lista>
    </div>
  </>
)

export default Home