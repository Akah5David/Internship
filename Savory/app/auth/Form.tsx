"use client";

type ChildFormProps = {
  message: string;
  errors: { [key: string]: string };
  handleFormSubmission: (
    event: React.FormEvent<HTMLFormElement>
  ) => void | Promise<void>;
  formType: string;
  title: string;
};
export default function Form({
  message,
  errors,
  handleFormSubmission,
  formType,
  title,
}: ChildFormProps) {
  const formDivStyle = "bg-yellow-500 flex flex-col gap-2 px-2.5 ";
  const inputStyle =
    "p-2.5 border-1 border-black outline-none focus:outline-2 focus:border-2 radius-md";
  const labelStyle = "text-2xl font-semibold";
  return (
    <div className="flex flex-col justify-center items-center gap-3 bg-green-600 h-screen">
      <h2 className="font-bold text-3xl">{title}</h2>
      <form
        onSubmit={handleFormSubmission}
        className="flex flex-col gap-4 w-[60%] bg-pink-500"
      >
        <div className={formDivStyle}>
          <label htmlFor="email" className={labelStyle}>
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your Email"
            defaultValue=""
            className={inputStyle}
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}
        </div>
        <div className={formDivStyle}>
          <label htmlFor="password" className={labelStyle}>
            Password
          </label>
          <div className="">
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              defaultValue=""
              className={inputStyle}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 64 64"
              width="20"
              height="20"
              className="hidden"
            >
              <path
                fill="none"
                stroke="#000"
                stroke-width="3"
                stroke-miterlimit="10"
                d="M1,32c0,0,11,15,31,15s31-15,31-15S52,17,32,17 S1,32,1,32z"
              />
              <circle
                fill="none"
                stroke="#000"
                stroke-width="2"
                stroke-miterlimit="10"
                cx="32"
                cy="32"
                r="7"
              />
              <line
                fill="none"
                stroke="#000"
                stroke-width="2"
                stroke-miterlimit="10"
                x1="9"
                y1="55"
                x2="55"
                y2="9"
              />
            </svg>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 36 36"
              width="20"
              height="20"
              fill="#000"
              className="hidden"
            >
              <title>eye-line</title>
              <path d="M33.62,17.53c-3.37-6.23-9.28-10-15.82-10S5.34,11.3,2,17.53L1.72,18l.26.48c3.37,6.23,9.28,10,15.82,10s12.46-3.72,15.82-10l.26-.48ZM17.8,26.43C12.17,26.43,7,23.29,4,18c3-5.29,8.17-8.43,13.8-8.43S28.54,12.72,31.59,18C28.54,23.29,23.42,26.43,17.8,26.43Z" />
              <path d="M18.09,11.17A6.86,6.86,0,1,0,25,18,6.86,6.86,0,0,0,18.09,11.17Zm0,11.72A4.86,4.86,0,1,1,23,18,4.87,4.87,0,0,1,18.09,22.89Z" />
            </svg>
          </div>

          {errors.password && <p className="text-red-500">{errors.password}</p>}
        </div>
        {formType === "signup" && (
          <div className={formDivStyle}>
            <label htmlFor="confirm-password" className={labelStyle}>
              Confirm Password
            </label>
            <input
              type="password"
              name="confirm-password"
              id="confirm-password"
              placeholder="Confirm your password"
              defaultValue=""
              className={inputStyle}
            />
            {errors["confirm-password"] && (
              <p className="text-red-500">{errors["confirm-password"]}</p>
            )}
          </div>
        )}
        <button type="submit" className="bg-green-700 text-white p-2 rounded">
          Submit
        </button>
        {message && <p className="text-green-500 mt-2">{message}</p>}
      </form>
    </div>
  );
}
