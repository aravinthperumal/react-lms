export const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const isValidEmail = (value: string): boolean => {
    return emailRegex.test(value);
};

export const isEmpty = (value: string | null): boolean => {
    return value === null || value === '';
};

export const stringOnly = (value: string): string => {
    return value.trim().replace(/[^a-zA-Z\s]/g, '');
};

export const alphaNumeric = (value: string): string => {
    return value.trim().replace(/[^a-zA-Z0-9\s]/g, '');
};

export const numbersOnly = (value: string): string => {
    return value.trim().replace(/[^0-9]/g, '');
};

export const sanitizeAndValidateFilters = (params: Record<string, string>): Record<string, string> => {
    const sanitizedParams: Record<string, string> = {};

    Object.entries(params).forEach(([key, value]) => {
        if (key === 'id') {
            sanitizedParams[key] = alphaNumeric(value); //alpha numeric
        } else if (key === 'isbn') {
            sanitizedParams[key] = numbersOnly(value); //keep numbers only
        } else {
            sanitizedParams[key] = stringOnly(value); // Keep only letters and spaces
        }
    });

    return sanitizedParams;
};
