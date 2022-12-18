interface Props {
  state?: string;
  children?: React.ReactNode;
}

export const Button: React.FC<Props> = ({ state, children }) => (
  <button disabled={state === "pending"}>
    {state === "pending" ? "loading" : children}
  </button>
);
