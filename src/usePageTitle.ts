import { useEffect } from 'react';

const SITE = 'UCME';

export function usePageTitle(title?: string) {
    useEffect(() => {
        document.title = title ? `${title} · ${SITE}` : 'Ukrainian Chamber Music Encyclopedia';
        return () => { document.title = 'Ukrainian Chamber Music Encyclopedia'; };
    }, [title]);
}
