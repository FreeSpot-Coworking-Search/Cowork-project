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
                <header className="header">
                    <p>
                    Se ha generado un error en el header. Vuelve a cargar la
                    página
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
                <header className="mainSection">
                    <p>
                    Se ha generado un error en el Main. Vuelve a cargar la
                    página
                    </p>
                </header>
            );
        }

        return this.props.children;
    }
}

export { ErrorHeader, ErrorMain };
