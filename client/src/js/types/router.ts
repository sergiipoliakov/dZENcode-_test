import { JSX } from "react";

export interface RoutesDefaultInterface {
    path: string,
    component: React.FC | JSX.Element
}

export enum RoutesVisibilityTypes {
    public = 'public',
    private = 'private',
}
