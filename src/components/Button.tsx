import styled from "styled-components";

interface ButtonProps  {
  objectID: number;
  onRemoveItem: (objectID: number) => void;
}

const Button = ({onRemoveItem, objectID}: ButtonProps) => {
  return (
    <StyledButton type="button" onClick={() => onRemoveItem(objectID)}>
      Dismiss
    </StyledButton>
  );
};

const StyledButton = styled.button`
  background: var(--clr-primary-II);
  padding: .35em 1.125em;
  border: none;
  text-transform: uppercase;
  cursor: pointer;
`;


export default Button;
