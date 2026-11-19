import { useState, type ChangeEvent, type FormEvent } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../../store'
import { fechar, limpar } from '../../store/reducers/carrinho'
import { cores } from '../../styles'
import { formataPreco } from '../../utils'

const Form = styled.form`
  color: ${cores.begeEscuro};

  h3 {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 16px;
  }

  p {
    font-size: 14px;
    line-height: 22px;
    margin-bottom: 24px;
  }

  label {
    display: block;
    font-size: 14px;
    font-weight: bold;
    margin: 8px 0;
  }

  input {
    width: 100%;
    height: 32px;
    padding: 0 8px;
    border: none;
    background-color: ${cores.begeEscuro};
    color: #4b4b4b;
    font-size: 14px;
    font-weight: bold;
  }

  .linha {
    display: flex;
    gap: 34px;

    > div {
      flex: 1;
    }

    .menor {
      flex: 0 0 87px;
    }
  }

  .botoes {
    margin-top: 24px;
  }

  button {
    display: block;
    width: 100%;
    background-color: ${cores.begeEscuro};
    color: ${cores.salmao};
    border: none;
    font-size: 14px;
    font-weight: bold;
    padding: 4px;
    margin-bottom: 8px;
    cursor: pointer;
  }

  button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

type Etapa = 'entrega' | 'pagamento' | 'confirmacao'

type Props = {
  aoVoltarAoCarrinho: () => void
}

const Checkout = ({ aoVoltarAoCarrinho }: Props) => {
  const { itens } = useSelector((state: RootState) => state.carrinho)
  const dispatch = useDispatch()

  const [etapa, setEtapa] = useState<Etapa>('entrega')
  const [enviando, setEnviando] = useState(false)
  const [pedidoId, setPedidoId] = useState('')
  const [dados, setDados] = useState({
    receiver: '',
    description: '',
    city: '',
    zipCode: '',
    number: '',
    complement: '',
    cardName: '',
    cardNumber: '',
    cardCode: '',
    expiresMonth: '',
    expiresYear: ''
  })

  const total = itens.reduce((acumulador, item) => acumulador + item.preco, 0)

  const atualizar = (e: ChangeEvent<HTMLInputElement>) => {
    setDados({ ...dados, [e.target.name]: e.target.value })
  }

  const irParaPagamento = (e: FormEvent) => {
    e.preventDefault()
    setEtapa('pagamento')
  }

  const finalizar = async (e: FormEvent) => {
    e.preventDefault()
    setEnviando(true)

    try {
      const resposta = await fetch(
        'https://api-ebac.vercel.app/api/efood/checkout',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            products: itens.map((item) => ({ id: item.id, price: item.preco })),
            delivery: {
              receiver: dados.receiver,
              address: {
                description: dados.description,
                city: dados.city,
                zipCode: dados.zipCode,
                number: Number(dados.number),
                complement: dados.complement
              }
            },
            payment: {
              card: {
                name: dados.cardName,
                number: dados.cardNumber,
                code: Number(dados.cardCode),
                expires: {
                  month: Number(dados.expiresMonth),
                  year: Number(dados.expiresYear)
                }
              }
            }
          })
        }
      )

      if (!resposta.ok) throw new Error('Erro na API')

      const json = await resposta.json()
      setPedidoId(json.orderId)
      setEtapa('confirmacao')
    } catch {
      alert('Não foi possível finalizar o pedido. Tente novamente.')
    } finally {
      setEnviando(false)
    }
  }

  const concluir = (e: FormEvent) => {
    e.preventDefault()
    dispatch(limpar())
    dispatch(fechar())
    aoVoltarAoCarrinho()
  }

  if (etapa === 'confirmacao') {
    return (
      <Form onSubmit={concluir}>
        <h3>Pedido realizado - {pedidoId}</h3>
        <p>
          Estamos felizes em informar que seu pedido já está em processo de
          preparação e, em breve, será entregue no endereço fornecido.
        </p>
        <p>
          Gostaríamos de ressaltar que nossos entregadores não estão autorizados
          a realizar cobranças extras.
        </p>
        <p>
          Lembre-se da importância de higienizar as mãos após o recebimento do
          pedido, garantindo assim sua segurança e bem-estar durante a refeição.
        </p>
        <p>
          Esperamos que desfrute de uma deliciosa e agradável experiência
          gastronômica. Bom apetite!
        </p>
        <button type="submit">Concluir</button>
      </Form>
    )
  }

  if (etapa === 'pagamento') {
    return (
      <Form onSubmit={finalizar}>
        <h3>Pagamento - Valor a pagar {formataPreco(total)}</h3>

        <label htmlFor="cardName">Nome no cartão</label>
        <input id="cardName" name="cardName" value={dados.cardName} onChange={atualizar} required />

        <div className="linha">
          <div>
            <label htmlFor="cardNumber">Número do cartão</label>
            <input id="cardNumber" name="cardNumber" value={dados.cardNumber} onChange={atualizar} required />
          </div>
          <div className="menor">
            <label htmlFor="cardCode">CVV</label>
            <input id="cardCode" name="cardCode" value={dados.cardCode} onChange={atualizar} required />
          </div>
        </div>

        <div className="linha">
          <div>
            <label htmlFor="expiresMonth">Mês de vencimento</label>
            <input id="expiresMonth" name="expiresMonth" value={dados.expiresMonth} onChange={atualizar} required />
          </div>
          <div>
            <label htmlFor="expiresYear">Ano de vencimento</label>
            <input id="expiresYear" name="expiresYear" value={dados.expiresYear} onChange={atualizar} required />
          </div>
        </div>

        <div className="botoes">
          <button type="submit" disabled={enviando}>
            {enviando ? 'Finalizando...' : 'Finalizar pagamento'}
          </button>
          <button type="button" onClick={() => setEtapa('entrega')}>
            Voltar para a edição de endereço
          </button>
        </div>
      </Form>
    )
  }

  return (
    <Form onSubmit={irParaPagamento}>
      <h3>Entrega</h3>

      <label htmlFor="receiver">Quem irá receber</label>
      <input id="receiver" name="receiver" value={dados.receiver} onChange={atualizar} required />

      <label htmlFor="description">Endereço</label>
      <input id="description" name="description" value={dados.description} onChange={atualizar} required />

      <label htmlFor="city">Cidade</label>
      <input id="city" name="city" value={dados.city} onChange={atualizar} required />

      <div className="linha">
        <div>
          <label htmlFor="zipCode">CEP</label>
          <input id="zipCode" name="zipCode" value={dados.zipCode} onChange={atualizar} required />
        </div>
        <div>
          <label htmlFor="number">Número</label>
          <input id="number" name="number" value={dados.number} onChange={atualizar} required />
        </div>
      </div>

      <label htmlFor="complement">Complemento (opcional)</label>
      <input id="complement" name="complement" value={dados.complement} onChange={atualizar} />

      <div className="botoes">
        <button type="submit">Continuar com o pagamento</button>
        <button type="button" onClick={aoVoltarAoCarrinho}>
          Voltar para o carrinho
        </button>
      </div>
    </Form>
  )
}

export default Checkout