import { Component, ErrorInfo, ReactNode } from "react";
import { Link } from "react-router-dom";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    if (import.meta.env.DEV) {
      console.error("ErrorBoundary caught:", error, info);
    }
  }

  reset = () => this.setState({ hasError: false });

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="max-w-md text-center space-y-6">
          <h1 className="text-3xl font-serif font-semibold text-foreground">
            Something went wrong
          </h1>
          <p className="text-muted-foreground">
            We hit an unexpected error. Try refreshing the page, or return to the homepage.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 rounded-full bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
            >
              Refresh
            </button>
            <Link
              to="/"
              onClick={this.reset}
              className="px-6 py-3 rounded-full border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default ErrorBoundary;
