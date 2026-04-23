import { PacmanLoader } from "react-spinners";

const Loader = ({ loading, size = 70 }) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <PacmanLoader
        color="green"
        loading={loading}
        size={size}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};
export default Loader;
