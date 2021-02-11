import React, { useState } from 'react'
import t from 'prop-types'
import styled from 'styled-components'
import { Redirect } from 'react-router-dom'
import { Card as MaterialCard, Grid, Typography } from '@material-ui/core'
import { CardLink, Content, Divider, Footer, H4, HeaderContent, PizzasGrid } from 'ui'
import { singularOrPlural, toMoney } from 'utils'
import { HOME, CHOOSE_PIZZA_QUANTITY } from 'routes'

import pizzasFlavours from 'fake-data/pizzas-flavours'

const ChoosePizzaFlavours = ({ location }) => {
  const [checkboxes, setCheckboxes] = useState(() => ({}))

  console.log('checkboxes', checkboxes)
  if (!location.state) {
    return <Redirect to={HOME} />
  }

  const { flavours, id } = location.state.pizzaSize

  const handleChangeCheckbox = (pizzaId) => (e) => {
    if (checkboxesChecked(checkboxes).length === flavours && e.target.checked === true) {
      return
    }

    setCheckboxes((checkboxes) => {
      return {
        ...checkboxes,
        [pizzaId]: !checkboxes[pizzaId]
      }
    })
  }

  return (
    <>
      <Content>
        <HeaderContent>
          <H4>
            Escolha até {flavours} {' '}
            {singularOrPlural(flavours, 'sabor', 'sabores')}
          </H4>
        </HeaderContent>
        <PizzasGrid>
          {pizzasFlavours.map(pizza => (
            <Grid item key={pizza.id} xs>
              <Card checked={!!checkboxes[pizza.id]}>
                <Label>
                  <Checkbox
                    checked={!!checkboxes[pizza.id]}
                    onChange={handleChangeCheckbox(pizza.id)}
                  />
                  <Img src={pizza.image} alt={pizza.name} />

                  <Divider />

                  <Typography variant='h5'>{pizza.name}</Typography>
                  <Typography variant='h5'>
                    {toMoney(pizza.value[id])}
                  </Typography>
                </Label>
              </Card>
            </Grid>
          ))}
        </PizzasGrid>
      </Content>
      <Footer buttons={{
        back: {
          children: 'Mudar tamanho'
        },
        action: {
          to: { pathname: CHOOSE_PIZZA_QUANTITY, state: { ...location.state, pizzaFlavours: getFlavoursNameAndId(checkboxes) } },
          children: 'Quantas Pizza?',
          disabled: checkboxesChecked(checkboxes).length === 0
        }
      }}
      />
    </>
  )
}

ChoosePizzaFlavours.propTypes = {
  location: t.object.isRequired
}

const checkboxesChecked = (checkboxes) => {
  return Object.values(checkboxes).filter(Boolean)
}
function getFlavoursNameAndId (checkboxes) {
  return Object.entries(checkboxes)
    .filter(([_, value]) => !!value)
    .map(([id]) => ({
      id: id,
      name: pizzasFlavours.find(flavour => flavour.id === id).name
    }))
}

const Card = styled(MaterialCard)`
  && {
    border: 2px solid transparent;
    border-color: ${({ theme, checked }) => checked ? theme.palette.primary.main : ''};
  }
`

const Label = styled(CardLink).attrs({
  component: 'label'
})``

const Checkbox = styled.input.attrs({
  type: 'checkbox'
})`
  display: none;
`

const Img = styled.img`
  width: 300px;
`

export default ChoosePizzaFlavours
