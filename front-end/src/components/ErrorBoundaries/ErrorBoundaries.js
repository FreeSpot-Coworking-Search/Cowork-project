import './errorBoundaries.css';
import React from 'react';

class ErrorHeader extends React.Component {
    constructor(props) {
        super(props);

        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.log('ERROR: ', error);
    }

    render() {
        if (this.state.hasError) {
            return (
                <header className="header errorPage">
                    <p>
                        Se ha generado un error en el header. Prueba recargando
                        la página.
                    </p>
                </header>
            );
        }

        return this.props.children;
    }
}

class ErrorMain extends React.Component {
    constructor(props) {
        super(props);

        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.log('ERROR: ', error);
    }

    render() {
        if (this.state.hasError) {
            return (
                <header className="mainSection errorPage">
                    <p>
                        Se ha generado un error en el Main. Prueba recargando la
                        página o volviendo a la página anterior
                    </p>
                </header>
            );
        }

        return this.props.children;
    }
}

export { ErrorHeader, ErrorMain };
