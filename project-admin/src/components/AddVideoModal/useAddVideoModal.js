import { useEffect } from "react";
import { useState } from "react";

const useAddVideoModal = () => {
  const [isShowAddVideoModal, setIsShowVideoModal] = useState(false);

  const toggleAddVideoModal = () => {
    setIsShowVideoModal(!isShowAddVideoModal);
  };

  return {
    isShowAddVideoModal,
    toggleAddVideoModal,
  };
};

export default useAddVideoModal;
