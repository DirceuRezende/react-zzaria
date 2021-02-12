import React, { createContext, useState } from 'react'
import t from 'prop-types'

const OrderContext = createContext()

const OrderProvider = ({ children }) => {
  const [pizzas, addPizza] = useState([])
  function addPizzaToOrder (pizza) {
    console.log(pizza)
    console.log(pizzas)
    addPizza((pizzas) => pizzas.concat(pizza))
  }
  return (
    <OrderContext.Provider value={{ order: { pizzas }, addPizzaToOrder }}>
      {children}
    </OrderContext.Provider>
  )
}

OrderProvider.propTypes = {
  children: t.node.isRequired
}

export { OrderProvider, OrderContext }
