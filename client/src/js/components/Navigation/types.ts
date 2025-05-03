export interface NavigatiosTypes {
    className?: string
    dataCy?: string
    onNavClick?: () => void
}

interface MenuChild {
    path?: string;
    icon?: string;
    link: string;
}

interface Menu {
    label: string;
    account?: true;
    path?: any;
    icon?: string;
    link: string;
    collapsed?: boolean;
    children?: MenuChild[]
}

export type {
    Menu
};
