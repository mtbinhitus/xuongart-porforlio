import { useEffect } from "react";
import { useState } from "react";

const useEditVideoModal = () => {
  const [isShowEditVideoModal, setIsShowVideoModal] = useState(false);

  const toggleEditVideoModal = () => {
    setIsShowVideoModal(!isShowEditVideoModal);
  };

  return {
    isShowEditVideoModal,
    toggleEditVideoModal,
  };
};

export default useEditVideoModal;
