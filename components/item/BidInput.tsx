import { Button } from "./Button";

export const BidInput: React.FC = () => (
  <>
    <form>
      <input type="number" name="bid" id="bid" />
      <Button state="success">Add bid</Button>
    </form>
  </>
);
