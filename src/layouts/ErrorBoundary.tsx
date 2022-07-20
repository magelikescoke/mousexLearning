import React from 'react';
import { Result, Button } from 'dw-mx';

export interface ErrorBoundaryState {
    hasError: boolean;
}

export default class ErrorBoundary extends React.Component<any, ErrorBoundaryState> {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        console.error(error);
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return <Result status="error" title="程序出错了" />;
        }
        return this.props.children;
    }
}
