import { useState } from 'react';

const useVideoModal = () => {
    const [isShowingVideoModal, setIsShowingVideoModal] = useState(false);

    function toggleVideoModal() {
        setIsShowingVideoModal(!isShowingVideoModal);
    }

    return {
        isShowingVideoModal,
        toggleVideoModal,
    };
};

export default useVideoModal;
