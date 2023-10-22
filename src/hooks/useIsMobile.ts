import { useState, useEffect, useLayoutEffect } from "react";

function useIsMobile(maxWidth: number) {
    const [width, setWidth] = useState<number>(1000);

    function handleWindowSizeChange() {
        setWidth(window.innerWidth);
    }
    useLayoutEffect(() => {
        handleWindowSizeChange();
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);

    return width <= maxWidth;
}

export default useIsMobile;