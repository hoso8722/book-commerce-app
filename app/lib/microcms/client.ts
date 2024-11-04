import { createClient } from 'microcms-js-sdk';
import { BookType } from '@/app/types/types';

export const client = createClient({
  serviceDomain: process.env.NEXT_PUBLIC_MICROCMS_DOMAIN!,
  apiKey: process.env.NEXT_PUBLIC_MICROCMS_APIKEY!
});

export const getAllBooks = async () => {
    const allBooks = await client.getList<BookType>({
        endpoint: "ebook",
        customRequestInit: {
          cache: "no-cache"
        },
    });

    return allBooks;
}

export const getDetailBook = async(contentId: string) => {
  const detailBook = await client.getListDetail<BookType>({
    endpoint: "ebook",
    contentId,
    customRequestInit: {
      cache: "no-cache"
    },
  });

  return detailBook;
}

export const getAllBookIds = async() => {
  const bookIds = await client.getAllContentIds({
    endpoint: "ebook",
  });
  console.log(bookIds);
  return bookIds
}