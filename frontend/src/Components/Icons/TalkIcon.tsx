function TalkIcon({ color }: { color?: string }) {
  return (
    <svg className={`${color} size-13 translate-y-1/2 lg:translate-y-0 lg:-translate-x-1/2`}>
      <use href="#chat-bubble-left-right-services"></use>
    </svg>
  );
}

export default TalkIcon;
