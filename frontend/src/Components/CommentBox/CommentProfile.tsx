type T_CommentProfile = { name: string, role: "ADMIN" | "USER", createdAt: string, profile?: string }

function CommentProfile({ name, role, createdAt, profile }: T_CommentProfile) {
  return (
    <div className="flex gap-4">
      <div className="sm:block hidden">
        <div
          className={`${
            role === "ADMIN" ? "border-notf" : "border-amber-500"
          } size-[3.25rem] rounded-full grid place-content-center border-2`}
        >
          <img className="size-12 rounded-full" src={profile ? profile : "/img/user.png"} />
        </div>
      </div>
      <div className="flex flex-col justify-evenly">
        <div className="">
          {name}{" "}
          <span className="font-[dana-b]">
            | {role === "ADMIN" ? "مدیر" : "کاربر"}
          </span>
        </div>
        <div className="font-[irsans] text-gray-600 dark:text-gray-400 text-sm">
          {createdAt.slice(0, 10)}
        </div>
      </div>
    </div>
  );
}

export default CommentProfile;
