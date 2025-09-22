interface I_TimeButton {
  time: number;
  label: string;
  isOutline?: boolean;
}

function TimeButton({ time, label, isOutline }: I_TimeButton) {
  return (
    <button
      className={`${
        isOutline
          ? "border-neut-prim"
          : "border-neut-prim bg-neut-prim text-d-neut-seco"
      } grid place-content-center border-2 rounded-full sm:size-12 size-10`}
    >
      <div className="font-[irsans] sm:text-lg text-sm font-bold translate-y-0.5">{time}</div>
      <div className="sm:text-[11px] text-[9px]">{label}</div>
    </button>
  );
}

export default TimeButton;
