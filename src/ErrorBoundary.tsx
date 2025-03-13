import  { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error atrapado por ErrorBoundary: ", error, errorInfo);
    console.log("Error: ", error.message);
    console.log("Información del Error: ", errorInfo.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-screen flex items-center justify-center bg-red-100">
          <h1 className="text-3xl font-bold text-red-500">¡Algo salió mal!</h1>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
