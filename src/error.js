import { PureComponent } from 'react'

class ErrorBoundary extends PureComponent {
    state = {
        hasError: false
    }

    /*Quando ocorrer um erro no react, ele cai aqui, como se fosse um catch do try catch.
      O error recebido é um erro padrão do JavaScript. */
    static getDerivedStateFromError (error) {
        console.log('error getDerivedStateFromError:', error)
        return { hasError: true }
    }

    // Local para fazer o um log ou algo do gênero.
    componentDidCatch(error, info) {
        console.log('error:', error)
        console.log('info:', info)
    }

    render() {
        return this.props.children(this.state.hasError)
    }
}

export default ErrorBoundary