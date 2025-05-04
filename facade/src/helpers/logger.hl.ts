import { MongoError } from 'mongodb';
import clc from 'cli-color';

interface IErrorLogInput {
  ref: string;
  entityId?: string;
  userId?: string;
  payload?: any;
  message?: string;
  model?: string;
  error: string | {
      message: string;
      error: string;
      response: any;
  };
}
interface IInfoLogInput {
  ref: string;
  userId?: string;
  entityId?: string;
  message: string;
  payload?: any;
  response?: any;
}


const date = (): string => {
  const now = new Date();
  const setFullValue = (value: string | number) => String(value).length < 2 ? `0${value}` : value;
  return `
    ${setFullValue(now.getDate())}/${setFullValue(now.getMonth() + 1)}/${now.getFullYear()} 
    ${setFullValue(now.getHours())}:${setFullValue(now.getMinutes())}:${setFullValue(now.getSeconds())}
  `.replace(/\n/g, '').trim().replace(/\s+/g, " ");
}

export const error = (data: IErrorLogInput) => {
  const { ref, userId, error, message: customMessage, model } = data;
  if (typeof error === 'string') {
    console.log(`${clc.red('[ERROR]')} - [${date()}] - ${ref}${userId ? ` - ${userId} -` : ''} ${error}`)
  } else {
    const {
      message,
      error: errorString,
      response: {
        data = {}
      } = {}
    } = error || {};
    console.log(`${clc.red(`[${error instanceof MongoError ? 'MONGO ERROR' : 'ERROR'}]`)} - [${date()}] - ${model ? `${model} ` : ''}${ref}${userId ? ` - ${userId} -` : ''}${customMessage ? ` ${customMessage}` : ''} ${message || errorString} ${data?.payload ? `- ${JSON.stringify(data?.payload)}` : ''} ${data?.errors ? `- ${JSON.stringify(data?.errors)}` : ''} `);
  }
}

export const info = (data: IInfoLogInput) => {
  const { ref, userId, message } = data;
  console.log(`${clc.blueBright('[INFO]')} - [${date()}] - ${ref}${userId ? ` - ${userId} -` : ''} ${message} ${data?.response ? `- ${JSON.stringify(data?.response)}` : ''} ${data?.payload ? `- ${JSON.stringify(data?.payload)}` : ''}`)
}
