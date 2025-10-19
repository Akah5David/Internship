type ShowPasswordSvgProps = {
  showPassword: boolean;
  showPasswordHandler: () => void;
  passwordInputStyle: string;
  inputStyle: string;
  type: string;
  labelStyle: string;
  formDivStyle: string;
  formType: string;
  errors: { [key: string]: string };
};

export default function ShowPasswordSvg({
  showPassword,
  showPasswordHandler,
  inputStyle,
  type,
  labelStyle,
  formDivStyle,
  passwordInputStyle,
  formType,
  errors,
}: ShowPasswordSvgProps) {
  const signinInputStyle =
    formType === "signin" && type === "confirm-password" ? " hidden" : "";
  return (
    <div className={formDivStyle}>
      <label htmlFor="password" className={`${labelStyle} ${signinInputStyle}`}>
        {type === "confirm-password" ? "Confirm Password" : "Password"}
      </label>
      <div
        className={`relative m-0 flex justify-between items-center px-2.5 border border-border ${inputStyle} ${signinInputStyle}`}
      >
        <input
          type={showPassword ? "text" : "password"}
          name={type}
          id={type}
          placeholder={
            type === "confirm-password" ? "Confirm Password" : "Enter Password"
          }
          defaultValue=""
          className={passwordInputStyle}
        />
        <div className="flex">
          {showPassword === false ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 64 64"
              width="20"
              height="20"
              onClick={showPasswordHandler}
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
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 36 36"
              width="20"
              height="20"
              fill="#000"
              //   className="hidden"
              onClick={showPasswordHandler}
            >
              <title>eye-line</title>
              <path d="M33.62,17.53c-3.37-6.23-9.28-10-15.82-10S5.34,11.3,2,17.53L1.72,18l.26.48c3.37,6.23,9.28,10,15.82,10s12.46-3.72,15.82-10l.26-.48ZM17.8,26.43C12.17,26.43,7,23.29,4,18c3-5.29,8.17-8.43,13.8-8.43S28.54,12.72,31.59,18C28.54,23.29,23.42,26.43,17.8,26.43Z" />
              <path d="M18.09,11.17A6.86,6.86,0,1,0,25,18,6.86,6.86,0,0,0,18.09,11.17Zm0,11.72A4.86,4.86,0,1,1,23,18,4.87,4.87,0,0,1,18.09,22.89Z" />
            </svg>
          )}
        </div>
      </div>
      {errors.password && type === "password" && (
        <p className="text-sm text-destructive">{errors.password}</p>
      )}
      {errors.confirmPassword && type === "confirm-password" && (
        <p className="text-sm text-destructive">{errors.confirmPassword}</p>
      )}
    </div>
  );
}
