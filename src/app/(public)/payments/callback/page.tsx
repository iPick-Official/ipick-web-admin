'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function PaymentCallbackPage() {
    const searchParams = useSearchParams();
    const [status, setStatus] = useState<'success' | 'failed' | 'pending'>(
        'pending'
    );

    useEffect(() => {
        /**
         * 2C2P usually sends:
         * payment_status = '000' → success
         */
        const paymentStatus = searchParams.get('payment_status');

        if (paymentStatus === '000') {
            setStatus('success');
        } else if (paymentStatus) {
            setStatus('failed');
        }

        // Optional: auto-close (Capacitor / browser popup)
        setTimeout(() => {
            if (window.opener) {
                window.close();
            }
        }, 1500);
    }, [searchParams]);

    return (
        <main
            style={{
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'system-ui',
            }}
        >
            {status === 'pending' && <h3>Processing payment...</h3>}
            {status === 'success' && (
                <h3 style={{ color: 'green' }}>Payment Successful</h3>
            )}
            {status === 'failed' && (
                <h3 style={{ color: 'red' }}>Payment Failed</h3>
            )}
        </main>
    );
}
