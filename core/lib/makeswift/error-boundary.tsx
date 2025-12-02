'use client';

import { Component, ReactNode } from 'react';

export class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
    constructor(props: { children: ReactNode }) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="flex h-full w-full items-center justify-center bg-red-50 p-4 text-red-800">
                    <div className="text-center">
                        <h3 className="text-lg font-semibold">Something went wrong</h3>
                        <p className="text-sm">The component could not be rendered.</p>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export function Loading() {
    return (
        <div className="flex h-full w-full items-center justify-center p-10">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
        </div>
    );
}
