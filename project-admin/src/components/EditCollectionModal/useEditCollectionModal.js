import { useEffect } from "react";
import { useState } from "react";

const useEditCollectionModal = () => {
  const [isShow, setIsShow] = useState(false);

  const toggle = () => {
    setIsShow(!isShow);
  };

  return {
    isShow,
    toggle,
  };
};

export default useEditCollectionModal;
