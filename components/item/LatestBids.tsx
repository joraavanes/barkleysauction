interface Props {
  bids?: number[];
}

export const LatestBids: React.FC<Props> = ({ bids = [53, 23, 91, 16, 6] }) => {
  return (
    <>
      <h3>Bids: {bids ? bids.length : null}</h3>
      {bids?.length ? (
        <ul>
          {bids
            .sort((a, b) => b - a)
            .map((bid) => (
              <li>{bid}</li>
            ))}
        </ul>
      ) : null}
    </>
  );
};
