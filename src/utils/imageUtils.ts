import React from 'react';

export const makeImageErrorHandler = (fallback: string) =>
    (e: React.SyntheticEvent<HTMLImageElement>) => {
        (e.target as HTMLImageElement).src = import.meta.env.BASE_URL + fallback;
    };
