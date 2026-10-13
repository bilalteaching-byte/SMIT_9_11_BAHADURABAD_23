import { useCallback, useEffect, useState } from "react";

const API_URL = "https://jsonplaceholder.typicode.com/";

function useFetch(url) {
  let userUrl = API_URL + url;
  const [state, setState] = useState({ data: [], error: null, loading: true });
  const [trigger, setTrigger] = useState(0);

  useEffect(() => {
    fetch(userUrl)
      .then((res) => {
        if (!res.ok) throw new Error("Backend se response nahn aya");
        return res.json();
      })
      .then((data) => {
        setState({ data, loading: false, error: null });
      })
      .catch((err) => {
        setState({ data: [], loading: false, error: err.message });
      });
  }, [trigger]);

  const refetch = useCallback(() => {
    setTrigger((t) => t + 1);
  }, []);

  return { ...state, refetch };
}

export default useFetch;
