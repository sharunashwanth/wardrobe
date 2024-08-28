"use client";

import { setToLocalStorage } from "@/utils/awesomeFuncs";
import { useSearchParamsObject } from "@/utils/awesomeHooks";
import React, { useEffect } from "react";

export default function page() {
    const searchParams = useSearchParamsObject();

    useEffect(() => {
        setToLocalStorage("user_id", searchParams.id);
    }, []);
    
    return (
        <>
            <p>User ID as been assigned: {searchParams.id}</p>
        </>
    );
};
