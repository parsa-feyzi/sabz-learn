type T_PaymentDetailsBox = {
  title: string;
  price: number | "رایگان!";
  isLarge?: boolean;
  precent?: number
};

function PaymentDetailsBox({
  title,
  price,
  isLarge,
  precent
}: T_PaymentDetailsBox) {
  return (
    <div className="flex justify-between items-center">
      <div
        className={
          isLarge ? "text-lg font-[dana-b]" : "font-[dana-b] text-[15px]"
        }
      >
        {title}
      </div>
      <div className="flex gap-1 items-end">
        <div
          className={`${
            isLarge && price !== "رایگان!" ? "!text-2xl" : ""
          } flex gap-0.5 items-center`}
        >
          <div
            className={
              price === "رایگان!"
                ? "!font-[dana-xl] "
                : "font-[irsans] font-bold"
            }
          >
            {precent && <span className="text-sm pe-1 font-[irsans] font-bold">({precent.toFixed(1)}%)</span>}
            {price.toLocaleString()}
          </div>
        </div>
        {price !== "رایگان!" && <div className="text-sm">تومان</div>}
      </div>
    </div>
  );
}

export default PaymentDetailsBox;
