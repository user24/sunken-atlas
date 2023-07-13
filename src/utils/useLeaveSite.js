import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const useLeaveSite = (test, deps) => {
    console.log('init', deps, test());
    const router = useRouter();
    const [dirty, setDirty] = useState(test());

    const confirmClose = (e) => {
        console.log({dirty});
        if (dirty) {
            e.preventDefault();
            e.returnValue = '';
        }
    };

    useEffect(() => {
        const d = test();
        console.log({d});
        setDirty(d);
    }, deps);

    useEffect(() => {
        router.events.on("routeChangeStart", confirmClose);
        window.addEventListener('beforeunload', confirmClose);
        return () => {
            router.events.off("routeChangeStart", confirmClose);
            window.removeEventListener('beforeunload', confirmClose);
        };
    },
    []);
};

export default useLeaveSite;

export { useLeaveSite };