import React, { useState } from 'react'
import t from 'prop-types'
import { Link, Redirect } from 'react-router-dom'
import styled from 'styled-components'
import { Button, Input as MaterialInput } from '@material-ui/core'
import {
  Content,
  Footer,
  HeaderContent,
  H4
} from 'ui'
import { useOrder } from 'hooks'
import { HOME, CHECKOUT } from 'routes'

const ChoosePizzaQuantity = ({ location }) => {
  const [quantity, setQuantity] = useState(1)
  const { addPizzaToOrder } = useOrder()
  if (!location.state) {
    return <Redirect to={HOME} />
  }

  function handleChange (e) {
    const { value } = e.target

    if (value >= 1) {
      setQuantity(Number(value))
    }
  }

  function addPizza () {
    /* size: location.state.pizzaSize.id,
    flavours: location.state.pizzaFlavours.map(flavour => flavour.id), */
    addPizzaToOrder({
      ...location.state,
      quantity
    })
  }

  return (
    <>
      <Content>
        <HeaderContent>
          <H4>
            Quantas pizzas você gostaria<br />
            de pedir, com esses sabores?
          </H4>
        </HeaderContent>
        <MainContent>
          <Input value={quantity} onChange={handleChange} autoFocus />
          <PizzaButton to={HOME} onClick={addPizza}>
            Adicionar e<br />
            montar outra
          </PizzaButton>
        </MainContent>
      </Content>
      <Footer buttons={{
        back: {
          children: 'Mudar sabores'
        },
        action: {
          to: CHECKOUT,
          onClick: addPizza,
          children: 'Finalizar Pedidos'
        }
      }}
      />
    </>
  )
}

ChoosePizzaQuantity.propTypes = {
  location: t.object.isRequired
}

const Input = styled(MaterialInput).attrs({
  type: 'number'
})`
  && {
    margin-bottom: ${({ theme }) => theme.spacing(3)}px;
  }

  & input {
    font-size: 80px;
    padding: 10px;
    text-align: center;
    width: 150px;
  }
`

const MainContent = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-top: ${({ theme }) => theme.spacing(2)}px
`

const PizzaButton = styled(Button).attrs({
  variant: 'contained',
  color: 'secondary',
  component: Link
})`
  && {
    text-align: center;
  }
`

export default ChoosePizzaQuantity
