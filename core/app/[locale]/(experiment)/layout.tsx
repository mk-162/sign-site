import { ReactNode } from 'react';

export default function ExperimentLayout({ children }: { children: ReactNode }) {
    return (
        <div className="theme-experiment min-h-screen bg-background text-foreground">
            {children}
        </div>
    );
}
