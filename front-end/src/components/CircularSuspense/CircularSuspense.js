import { Suspense } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function CircularSuspense({ children, className }) {
    return (
        <Suspense fallback={<CircularProgress className={className} />}>
            {children}
        </Suspense>
    );
}
