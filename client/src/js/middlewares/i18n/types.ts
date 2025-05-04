interface TranslationI18N {
    label: string,
    text: string
}

interface ReduxState {
    type: string,
    payload?: any
}

interface I18N {
    translation?: { [ key: string ]: string} | null,
    languages?: string[] | null
}

export type {
    TranslationI18N,
    I18N,
    ReduxState
};
