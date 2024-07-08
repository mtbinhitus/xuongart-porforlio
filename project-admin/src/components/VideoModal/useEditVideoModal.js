import { useEffect } from "react";
import { useState } from "react";

const useVideoModal = () => {
  const [isShowVideoModal, setIsShowVideoModal] = useState(false);

  const toggleVideoModal = () => {
    setIsShowVideoModal(!isShowVideoModal);
  };

  return {
    isShowVideoModal,
    toggleVideoModal,
  };
};

export default useVideoModal;
