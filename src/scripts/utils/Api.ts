import { Options } from './types.ts';

export const fetcher = async function(URL: string, requestQuantity?: string, options: Options = {method: 'GET', body: null}) {
  const responses = [];
  for (let i = 1; i <= Number(requestQuantity); i++) {
    const response = await fetch(URL, options);
    responses.push(response);
  }
  return responses;
}