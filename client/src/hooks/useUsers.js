import useSWR from '@zeit/swr';

export default function () {
    return useSWR(
        `{
          getUsers {
            id,
            phone,
            createDate
          }
        }`
      );
}