import { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import { useDispatch } from "react-redux";
import { showChatModalTagle } from "../../Redux/slices/isShowChatModalSlice";

function ChatModal() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  const sendMessageHandler = () => {
    setMessages((prevMessage) => [...prevMessage, message]);
    setMessage("");
  };

  const dispatch = useDispatch();

  return (
    <div className="chat_container fixed sm:bottom-24 sm:h-auto sm:top-auto sm:left-8 overflow-hidden bg-neut-prim z-30 sm:rounded-lg sm:w-[370px] w-full h-full top-0 bottom-0 left-0 shadow-lg">
      <div
        onClick={() => dispatch(showChatModalTagle())}
        className="sm:hidden block absolute top-1 left-1"
      >
        <img
          className="close_chatmodal w-11"
          src="/img/button-close.svg"
          alt=""
        />
      </div>
      <div className="bg-notf sm:pt-8 pt-12 px-4 py-6">
        <div className="text-center text-2xl pb-4 text-neut-prim">
          چت آنلاین
        </div>
        <div className="text-neut-seco text-sm text-center leading-7 opacity-90">
          لطفا در صورتی که مشکل فنی یا در خصوص پیشیبانی دوره دارید، در بخش پرسش
          پاسخ خود دوره ارسال کنید.
        </div>
      </div>
      <div className="show_chat_container sm:max-h-52 overflow-auto mb-12 text-d-neut-seco sm:min-h-28 max-h-none p-2">
        <div>
          {messages.length > 0 &&
            messages.map((message) => (
              <div className="py-3 px-5 shadow-md m-3 text-sm bg-notf/5 w-fit max-w-[70%] rounded-2xl leading-6">
                {message}
              </div>
            ))}
        </div>
      </div>
      <div className="absolute bottom-0 text-d-neut-seco left-0 w-full flex items-center content-center border-t-2 py-1 bg-neut-seco border-gray-300">
        <textarea
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          className="chat_box text-sm w-full resize-none h-11 border-none px-4 py-3 outline-none bg-neut-seco"
          placeholder="یک پیغام بنویسید..."
        ></textarea>
        {message && (
          <div
            onClick={sendMessageHandler}
            className="rotate-180 text-notf hover:-translate-x-0.5 active:text-notf-seco ps-4 cursor-pointer"
          >
            <SendIcon fontSize="small" />
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatModal;
