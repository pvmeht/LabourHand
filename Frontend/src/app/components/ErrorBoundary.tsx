import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertCircle } from "lucide-react";
import { Button } from "./ui/button";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[100dvh] bg-red-50 flex flex-col items-center justify-center p-6 text-center">
          <div className="bg-red-100 p-4 rounded-full mb-4">
            <AlertCircle className="h-12 w-12 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Oops! Something went wrong.</h1>
          <p className="text-red-600 bg-white p-4 rounded shadow-sm text-sm font-mono mb-6 max-w-lg overflow-auto">
            {this.state.error?.message || "An unexpected error occurred."}
          </p>
          <Button onClick={() => window.location.href = "/"} className="bg-red-600 hover:bg-red-700 text-white">
            Return to Home
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
