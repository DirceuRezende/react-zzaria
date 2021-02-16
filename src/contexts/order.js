import React, { createContext, useState } from 'react'
import t from 'prop-types'
import { v4 } from 'uuid'
import firebase, { db } from 'services/firebase'
import { useAuth } from 'hooks'

const OrderContext = createContext()

const OrderProvider = ({ children }) => {
  const [pizzas, addPizza] = useState([])
  const [orderInProgress, setOrderInProgress] = useState(false)
  const [address, addAddress] = useState({})
  const [phone, addPhone] = useState('')
  const { userInfo } = useAuth()
  function addPizzaToOrder (pizza) {
    console.log(pizza)
    console.log(pizzas)
    if (orderInProgress) {
      return addPizza((pizzas) => pizzas.concat(newPizza(pizza)))
    }

    setOrderInProgress(true)
    addPizza([newPizza(pizza)])
  }

  function newPizza (pizza) {
    return {
      id: v4(),
      ...pizza
    }
  }

  function removePizzaFromOrder (id) {
    addPizza((pizzas) => pizzas.filter(p => p.id !== id))
  }

  async function sendOrder () {
    try {
      await db.collection('orders').add({
        userId: userInfo.user.uid,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        address,
        phone,
        pizzas: pizzas.map(pizza => ({
          size: pizza.pizzaSize,
          flavours: pizza.pizzaFlavours,
          quantity: pizza.quantity
        }))
      })
    } catch (e) {
      console.log('erro ao salvar pedido:', e)
    }

    setOrderInProgress(false)
  }

  return (
    <OrderContext.Provider value={{ order: { pizzas, address, phone }, addPizzaToOrder, removePizzaFromOrder, addAddress, addPhone, sendOrder }}>
      {children}
    </OrderContext.Provider>
  )
}

OrderProvider.propTypes = {
  children: t.node.isRequired
}

export { OrderProvider, OrderContext }
