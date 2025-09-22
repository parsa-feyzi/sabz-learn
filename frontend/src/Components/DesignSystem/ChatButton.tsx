import { useDispatch, useSelector } from "react-redux";

import type { T_isShowChatModalSlice } from "../../Types/type";
import ChatModal from "../ChatModal/ChatModal";
import { showChatModalTagle } from "../../Redux/slices/isShowChatModalSlice";

function ChatButton() {
  const isShow = useSelector(
    (state: T_isShowChatModalSlice) => state.isShowChatModal.isShow
  );

  const dispatch = useDispatch();

  return (
    <>
      {isShow && <ChatModal />}
      <div
        onClick={() => dispatch(showChatModalTagle())}
        className="fixed sm:bottom-5 sm:left-5 text-neut-prim bottom-4 shadow-lg left-4 sm:size-16 size-[3.25rem] cursor-pointer hover:bg-notf-seco rounded-full grid place-content-center bg-notf z-20"
      >
        {isShow ? (
          <img
            className="close_chatmodal w-full"
            src="/img/button-close.svg"
            alt=""
          />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="bi bi-chat-left-text sm:size-7 size-6"
            viewBox="0 0 16 16"
          >
            <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
            <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6m0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5" />
          </svg>
        )}
      </div>
    </>
  );
}

export default ChatButton;
