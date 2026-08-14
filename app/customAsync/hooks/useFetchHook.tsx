import { useEffect, useState } from "react";

let totalUsers = ["ashad", "sanju", "abhishek", "aman", "amit", "vikram"];

export default function useFetchhook(searchQuery: string) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [err, setErr] = useState<Record<string, any>>({});

  useEffect(() => {
    const controller = new AbortController();

    getData(controller.signal);

    return () => {
        controller.abort();
    };
}, [searchQuery]);

  async function getData(signal : AbortSignal) {
    setLoading(true);
    try {
      let newUsers = await new Promise<string[]>((res, rej) => {
        setTimeout(() => {
          setLoading(false);
          if (searchQuery === "404") {
            rej(new Error("404 no user found"));
          }
          let newUsers: string[] = totalUsers.filter((user) =>
            user.toLowerCase().includes(searchQuery.toLowerCase()),
          );
          res(newUsers);
        }, 3000);
      });
      setData(newUsers);
    } catch (e: any) {
      setErr(e);
    }
  }

  return { loading, data, err };
}
