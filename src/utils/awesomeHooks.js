import { useSearchParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";

export const useFetch = (url) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url, {
          // mode: "no-cors"
        });
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const json = await res.json();
        setResponse(json);
      } catch (err) {
        setError(err.message);
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return [response, error, loading];
};

export const useSearchParamsObject = () => {
  let searchParams = useSearchParams();

  return Array.from(searchParams.entries()).reduce((acc, [key, value]) => {
    acc[key] = value;
    return acc;
  }, {});
};

export const useViewTime = () => {
  const [totalViewTime, setTotalViewTime] = useState(0);
  const [maxViewTime, setMaxViewTime] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const currentViewTime = useRef(0);
  const timerRef = useRef(null);

  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.5 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      timerRef.current = setInterval(() => {
        setTotalViewTime((prev) => prev + 1);
        currentViewTime.current += 1;
      }, 1000);
    } else {
      clearInterval(timerRef.current);

      if (currentViewTime.current > maxViewTime) {
        setMaxViewTime(currentViewTime.current);
      }

      currentViewTime.current = 0;
    }

    return () => clearInterval(timerRef.current);
  }, [isVisible, maxViewTime]);

  return {
    elementRef,
    isVisible,
    totalViewTime,
    maxViewTime: maxViewTime === 0 ? totalViewTime : maxViewTime,
  };
};
