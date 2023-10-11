const database = (
  <svg
    viewBox="0 0 16 16"
    width="18"
    height="18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3.502 6h8.996v4H3.502V6ZM3 10.002h10v4H3v-4ZM3 2h10v4H3V2Z"
      stroke="currentColor"
      stroke-miterlimit="10"
      stroke-linejoin="bevel"
    ></path>
  </svg>
);

const authentication = (
  <svg
    viewBox="0 0 16 16"
    width="18"
    height="18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3.49414 9.97461H8.49414M3.49414 9.97461V11.9746H8.49414V9.97461M3.49414 9.97461V7.97461H8.49414V9.97461M10 5V3C10 1.89543 9.10457 1 8 1C6.89543 1 6 1.89543 6 3V5M3.47266 7L3.47266 12C3.47266 13.1046 4.36809 14 5.47266 14H10.4727C11.5772 14 12.4727 13.1046 12.4727 12V7C12.4727 5.89543 11.5772 5 10.4727 5L5.47266 5C4.36809 5 3.47266 5.89543 3.47266 7Z"
      stroke="currentColor"
      stroke-miterlimit="10"
      stroke-linejoin="bevel"
    ></path>
  </svg>
);

const storage = (
  <svg
    viewBox="0 0 16 16"
    width="18"
    height="18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.9997 7.50869V5.60119L9.38151 2.00024H3.99967C3.44739 2.00024 2.99967 2.44796 2.99967 3.00024V5.99976M12.9645 5.58447L9.38004 2L9.38004 4.58447C9.38004 5.13676 9.82776 5.58447 10.38 5.58447L12.9645 5.58447ZM4.44135 5.99976H2.97363C2.42135 5.99976 1.97363 6.44747 1.97363 6.99976V11.9998C1.97363 13.1043 2.86906 13.9998 3.97363 13.9998H11.9736C13.0782 13.9998 13.9736 13.1043 13.9736 11.9998V8.50869C13.9736 7.95641 13.5259 7.50869 12.9736 7.50869H6.79396C6.53157 7.50869 6.27968 7.40556 6.09263 7.22153L5.14268 6.28692C4.95563 6.10289 4.70375 5.99976 4.44135 5.99976Z"
      stroke="currentColor"
      stroke-miterlimit="10"
      stroke-linejoin="bevel"
    ></path>
  </svg>
);

const realtime = (
  <svg
    viewBox="0 0 16 16"
    width="18"
    height="18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5.362.984v2.35m-1.866.144L1.365 1.282m2.052 3.92H1.052m8.023 9.653L4.557 4.523 15 9.115l-4.748 1.182-1.177 4.558Z"
      stroke="currentColor"
      stroke-miterlimit="10"
      stroke-linejoin="bevel"
    ></path>
  </svg>
);

const edgeFunctions = (
  <svg
    viewBox="0 0 16 16"
    width="18"
    height="18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1.857 11.36a7 7 0 0 1 9.41-9.551M4.774 14.212a7 7 0 0 0 9.41-9.497m-8.812 7.845a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm9.296-9.13a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM12.5 8a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Z"
      stroke="currentColor"
      stroke-miterlimit="10"
      stroke-linejoin="bevel"
    ></path>
  </svg>
);

export const icons: Record<string, JSX.Element> = {
  database,
  authentication,
  storage,
  realtime,
  edgeFunctions,
};
