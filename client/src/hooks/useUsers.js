import useSWR from '@zeit/swr';

export default function () {
    return useSWR(
        `{
          users {
            id,
            phone,
            createDate
          }
        }`
      );
}