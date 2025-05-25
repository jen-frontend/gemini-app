import React, { useEffect, useState } from "react";

const TestPage: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/hello")
      .then((res) => {
        console.log(res, "<<<<res");
        if (!res.ok) {
          throw new Error("Network response not ok");
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err: Error) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Test API Page</h1>
      <pre>{JSON.stringify(data)}</pre>
    </div>
  );
};

export default TestPage;
