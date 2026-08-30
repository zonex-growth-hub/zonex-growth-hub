import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: { componentStack: string }) {
    // Log the exact error so devtools reveal the real cause
    console.error("[ZoneX ErrorBoundary] Caught runtime error:", error.message);
    console.error("[ZoneX ErrorBoundary] Stack:", error.stack);
    console.error("[ZoneX ErrorBoundary] Component tree:", info.componentStack);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      const errMsg = this.state.error?.message ?? "Unknown error";

      return (
        <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center text-center px-4">
          <div className="max-w-sm w-full">
            <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mx-auto mb-4 text-2xl select-none">
              ⚡
            </div>
            <h2 className="text-white font-bold text-xl mb-2">Something went wrong</h2>
            <p className="text-zinc-400 text-sm mb-3 leading-relaxed">
              A component failed to load. Our team has been notified.
            </p>
            {process.env.NODE_ENV !== "production" && (
              <pre className="text-left text-[10px] text-red-400 bg-red-950/30 border border-red-500/20 rounded-xl p-3 mb-4 overflow-auto max-h-32 whitespace-pre-wrap break-all">
                {errMsg}
              </pre>
            )}
            <div className="flex gap-3 justify-center">
              <button
                onClick={this.handleReset}
                className="px-5 py-2.5 rounded-xl border border-purple-500/30 text-purple-400 text-sm font-bold uppercase tracking-wider hover:bg-purple-500/10 transition-all cursor-pointer"
              >
                Try Again
              </button>
              <button
                onClick={() => window.location.reload()}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm font-bold uppercase tracking-wider hover:from-purple-500 hover:to-indigo-500 transition-all cursor-pointer"
              >
                Reload Page
              </button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
