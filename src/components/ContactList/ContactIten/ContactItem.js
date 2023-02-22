import { Items, Button } from './Styled';

export const ContactItem = ({ id, userName, userNumber, deleteContact }) => {
  return (
    <Items>
      <p>
        {userName}: {userNumber}
      </p>
      <Button type="button" id={id} onClick={deleteContact}>
        Delete
      </Button>
    </Items>
  );
};
