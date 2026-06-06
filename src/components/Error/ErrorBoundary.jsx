import React from "react";

class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null, info: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("Error caught by ErrorBoundary:", error, info);
    this.setState({ info });
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, info: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary p-5 text-center">
          <h2 className="text-2xl font-bold text-red-600">
            Oops! Something went wrong.
          </h2>
          <p className="mt-2 text-gray-600">
            We apologize for the inconvenience. Please try again.
          </p>
          <button
            onClick={this.handleRetry}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Retry
          </button>
          {process.env.NODE_ENV === "development" && (
            <details className="mt-4 text-left">
              <summary className="cursor-pointer text-gray-700">
                Debug Info
              </summary>
              <pre className="mt-2 p-2 bg-gray-100 text-red-800">
                {this.state.error?.toString()}
              </pre>
              <pre className="mt-2 p-2 bg-gray-100 text-red-800">
                {this.state.info?.componentStack}
              </pre>
            </details>
          )}
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
