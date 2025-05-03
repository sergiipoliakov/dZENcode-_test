import * as React from 'react';

export interface TextProps {
    id?: string,
    tag?: 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    weight?: '400' | '500' | '600' | '700';
    size?: 'small' | 'default' | 'x-default' | 'medial' | 'middle' | 'medium' | 'x-medium' | 'y-medium' | 'big' | 'x-big' | 'y-big' | 'xy-big' | 'huge' | 'largest'
    color?: 'gray' | 'dark',
    transform?: 'uppercase' | 'lowercase' | 'capitalize' | 'break-line'
    className?: string,
    children: React.ReactNode,
    title?: string,
}
