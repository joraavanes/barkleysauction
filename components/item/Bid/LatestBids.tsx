import { useBid } from "./Bid";

export const LatestBids: React.FC = () => {
  const { state } = useBid();
  const { bids } = state;
  return (
    <>
      <h3>Bids: {bids ? bids.length : null}</h3>
      {/* {bids?.length ? (
        <ul>
          {bids
            .sort((a, b) => b - a)
            .map((bid) => (
              <li key={Math.round(Math.random() * 10000)}>{bid}</li>
            ))}
        </ul>
      ) : null} */}
    </>
  );
};
