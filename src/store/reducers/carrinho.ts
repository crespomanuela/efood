import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Prato } from '../../types'

type CarrinhoState = {
  itens: Prato[]
  aberto: boolean
}

const initialState: CarrinhoState = {
  itens: [],
  aberto: false
}

const carrinhoSlice = createSlice({
  name: 'carrinho',
  initialState,
  reducers: {
    adicionar: (state, action: PayloadAction<Prato>) => {
      const jaExiste = state.itens.find((item) => item.id === action.payload.id)
      if (jaExiste) {
        alert('Este prato já está no carrinho')
      } else {
        state.itens.push(action.payload)
      }
    },
    remover: (state, action: PayloadAction<number>) => {
      state.itens = state.itens.filter((item) => item.id !== action.payload)
    },
    abrir: (state) => {
      state.aberto = true
    },
    fechar: (state) => {
      state.aberto = false
    }
  }
})

export const { adicionar, remover, abrir, fechar } = carrinhoSlice.actions
export default carrinhoSlice.reducer