import { useEffect, useState } from "react";

const useLeaveSite = (test, deps) => {
    console.log('init', test());
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
        window.addEventListener('beforeunload', confirmClose);
        return () => {
            window.removeEventListener('beforeunload', confirmClose);
        };
    },
    []);
};

export default useLeaveSite;

export { useLeaveSite };