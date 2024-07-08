import { useState } from 'react';

const useModalYoutube = () => {
    const [isShowingYoutube, setIsShowingYoutube] = useState(false);

    function toggleYoutube() {
        setIsShowingYoutube(!isShowingYoutube);
    }

    return {
        isShowingYoutube,
        toggleYoutube,
    };
};

export default useModalYoutube;
