import React from 'react';
import { withRouter } from 'next/router';
import { WithRouterProps } from 'next/dist/client/with-router';

interface IProps extends WithRouterProps {
  children: React.ReactNode | React.ReactNode[];
}

interface IState {
  hasError: boolean;
  currentRoute: string;
}

class ErrorBoundary extends React.Component<IProps, IState> {
  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  static getDerivedStateFromProps(props: IProps, preState: IState): Partial<IState> | null {
    if (props.router.pathname !== preState.currentRoute) {
      return {
        hasError: false,
        currentRoute: props.router.pathname,
      };
    }
    return null;
  }

  constructor(props: IProps) {
    super(props);
    this.state = { hasError: false, currentRoute: '/' };
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong. This is crash page</h1>;
    }

    return this.props.children;
  }
}

export default withRouter(ErrorBoundary);
