import React, { Component, ReactNode } from "react";

export class ErrorBoundary extends Component<
  { children?: ReactNode },
  { error: Error | null }
> {
  constructor(props: any) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render(): ReactNode {
    if (this.state.error) {
      return (
        <div>
          <h2>This went into an error!</h2>
          <h3>{this.state.error.message}</h3>
          <button type="button" onClick={() => this.setState({ error: null })}>
            Try again?
          </button>
          <button onClick={() => location.replace("/")}>Home page</button>
        </div>
      );
    }
    return this.props.children;
  }
}
