import styled from 'styled-components'
import Header from '../../components/Header'
import Product from '../../components/Product'
import banner from '../../assets/images/banner.png'
import pizza from '../../assets/images/pizza.png'
import { cores } from '../../styles'

const Banner = styled.div`
  background-image: url(${banner});
  background-size: cover;
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

const pratos = [1, 2, 3, 4, 5, 6]

const Perfil = () => (
  <>
    <Header />
    <Banner>
      <div className="container">
        <span>Italiana</span>
        <h2>La Dolce Vita Trattoria</h2>
      </div>
    </Banner>
    <div className="container">
      <Lista>
        {pratos.map((id) => (
          <li key={id}>
            <Product
              titulo="Pizza Marguerita"
              descricao="A clássica Marguerita: molho de tomate suculento, mussarela derretida, manjericão fresco e um toque de azeite. Sabor e simplicidade!"
              imagem={pizza}
            />
          </li>
        ))}
      </Lista>
    </div>
  </>
)

export default Perfil