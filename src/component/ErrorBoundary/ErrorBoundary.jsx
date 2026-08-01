import React from 'react';
import './ErrorBoundary.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null,
      showDetails: false 
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service here
    console.error("ErrorBoundary caught an error", error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReload = () => {
    window.location.reload();
  };

  toggleDetails = () => {
    this.setState(prevState => ({ showDetails: !prevState.showDetails }));
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary-container">
          <div className="error-boundary-card">
            <div className="error-icon-wrapper">
              <svg className="error-svg-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 9V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 18.01H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10.29 3.86L1.82 18C1.64537 18.3024 1.55299 18.6453 1.55194 18.9945C1.5509 19.3437 1.64127 19.6866 1.81412 19.9893C1.98696 20.292 2.23608 20.5434 2.53676 20.7188C2.83744 20.8942 3.17937 20.9873 3.528 20.99H20.47C20.8186 20.9873 21.1606 20.8942 21.4612 20.7188C21.7619 20.5434 22.011 20.292 22.1839 19.9893C22.3567 19.6866 22.4471 19.3437 22.4461 18.9945C22.445 18.6453 22.3526 18.3024 22.178 18L13.71 3.86C13.5317 3.55938 13.2778 3.3106 12.9737 3.13843C12.6696 2.96626 12.3259 2.87622 12.001 2.87622C11.6761 2.87622 11.3324 2.96626 11.0283 3.13843C10.7242 3.3106 10.4703 3.55938 10.29 3.86Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h1 className="error-title">Something went wrong</h1>
            <p className="error-subtitle">
              An unexpected error occurred. We apologize for the inconvenience.
            </p>
            
            <div className="error-actions">
              <button className="error-btn btn-primary" onClick={this.handleReload}>
                Reload Application
              </button>
              {this.state.error && (
                <button className="error-btn btn-secondary" onClick={this.toggleDetails}>
                  {this.state.showDetails ? "Hide details" : "Show details"}
                </button>
              )}
            </div>

            {this.state.showDetails && this.state.error && (
              <div className="error-details-accordion">
                <div className="error-details-header">
                  <strong>Error Summary:</strong>
                </div>
                <div className="error-details-body">
                  <p className="error-message-text">{this.state.error.toString()}</p>
                  {this.state.errorInfo && (
                    <pre className="error-stack-trace">
                      {this.state.errorInfo.componentStack}
                    </pre>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
