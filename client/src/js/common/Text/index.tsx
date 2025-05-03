import React from 'react';
import { TextProps } from './types';

const TextComponent = (props: TextProps) => {
  const {
    tag = 'p',
    id,
    weight = '500',
    size = 'default',
    color = 'dark',
    transform = 'none',
    className,
    children,
    title = ''
  } = props;

  const getSize = () => {
    const classes = [];
    switch (size) {
      case 'small':
        classes.push('text--small');
        break;
      case 'default':
        classes.push('text--default');
        break;
      case 'x-default':
        classes.push('text--x-default');
        break;
      case 'medial':
        classes.push('text--medial');
        break;
      case 'middle':
        classes.push('text--middle');
        break;
      case 'medium':
        classes.push('text--medium');
        break;
      case 'x-medium':
        classes.push('text--x-medium');
        break;
      case 'y-medium':
        classes.push('text--y-medium');
        break;
      case 'big':
        classes.push('text--big');
        break;
      case 'x-big':
        classes.push('text--x-big');
        break;
      case 'y-big':
        classes.push('text--y-big');
        break;
      case 'xy-big':
        classes.push('text--xy-big');
        break;
      case 'huge':
        classes.push('text--huge');
        break;
      case 'largest':
        classes.push('text--largest');
        break;
      default:
        break;
    }
    return classes;
  };
  const getWeight = () => {
    const classes = [];
    switch (weight) {
      case '400':
        classes.push('font--400');
        break;
      case '500':
        classes.push('font--500');
        break;
      case '600':
        classes.push('font--600');
        break;
      case '700':
        classes.push('font--700');
        break;
      default:
        break;
    }
    return classes;
  };

  const getColors = () => {
    const classes = [];
    switch (color) {
      case 'gray':
        classes.push('color--gray');
        break; // 
      case 'dark':
        classes.push('color--dark');
        break; // dark
      default:
        classes.push(color);
        break;
    }
    return classes;
  };
  const getTextTransform = () => {
    const classes = [];
    switch (transform) {
      case 'uppercase':
        classes.push('font--uppercase');
        break;
      case 'lowercase':
        classes.push('font--lowercase');
        break;
      case 'capitalize':
        classes.push('font--capitalize');
        break;
      case 'break-line':
        classes.push('font--break-line');
        break;
      default:
        break;
    }
    return classes;
  };

  const setDefaultTextClasses = () => {
    return [
      ...getSize(),
      ...getWeight(),
      ...getColors(),
      ...getTextTransform(),
      className
    ].join(' ');
  };

  return React.createElement(
    tag,
    {
      className: setDefaultTextClasses(),
      'id': id,
      'title': title
    },
    children
  );
};

export default TextComponent;
