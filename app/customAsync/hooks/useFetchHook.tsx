import { useEffect, useState } from "react";

const totalUsers = ["ashad", "sanju", "abhishek", "aman", "amit", "vikram"];

export default function useFetchhook(searchQuery: string) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<string[]>([]);
  const [err, setErr] = useState<Error | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function getData() {
      setLoading(true);
      try {
        const newUsers = await new Promise<string[]>((res, rej) => {
          setTimeout(() => {
            setLoading(false);
            if (searchQuery === "404") {
              rej(new Error("404 no user found"));
            }
            const filteredUsers: string[] = totalUsers.filter((user) =>
              user.toLowerCase().includes(searchQuery.toLowerCase()),
            );
            res(filteredUsers);
          }, 3000);
        });
        setData(newUsers);
      } catch (e: unknown) {
        setErr(e instanceof Error ? e : new Error(String(e)));
      }
    }

    getData();

    return () => {
        controller.abort();
    };
}, [searchQuery]);

  return { loading, data, err };
}
