import React from 'react';
import { typography } from "../styles/typography";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 p-6">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
            <h1 className={`${typography.heading2} text-gray-900 mb-4`}>
              Oops! Something went wrong
            </h1>
            <p className={`${typography.body1} text-gray-600 mb-6`}>
              We're sorry for the inconvenience. Please try refreshing the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className={`${typography.button} bg-gradient-to-r from-blue-500 to-blue-600
                text-white px-6 py-3 rounded-xl shadow-md hover:shadow-lg
                transition-all duration-300`}
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;