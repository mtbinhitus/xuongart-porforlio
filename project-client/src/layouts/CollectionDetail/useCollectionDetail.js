import { useState } from 'react';

const useCollectionDetail = () => {
    const [isShowingCollectionDetail, setIsShowingCollectionDetail] = useState(false);

    function toggleCollectionDetail() {
        setIsShowingCollectionDetail(!isShowingCollectionDetail);
    }

    return {
        isShowingCollectionDetail,
        toggleCollectionDetail,
    };
};

export default useCollectionDetail;
