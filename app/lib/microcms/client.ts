import { createClient } from 'microcms-js-sdk';

export const client = createClient({
  serviceDomain: process.env.NEXT_PUBLIC_MICROCMS_DOMAIN!,
  apiKey: process.env.NEXT_PUBLIC_MICROCMS_APIKEY!
});

export const getAllBooks = async () => {
    const allBooks = await client.getList({
        endpoint: "ebook"
    });

    return allBooks;
}