import styled from "styled-components";

export const Button = styled.button<{ size?: number }>`
  width: ${({ size = 2.92 }) => size}vw;
  aspect-ratio: 1;
  border-radius: 50%;
  border: 1px solid var(--black-blue);
  background-color: var(--background);
  color: var(--black-blue);
  font-size: 1.04vw;
  cursor: pointer;

  @media (max-width: 768px) {
    width: 7.81vw;
  }

  &:disabled {
    opacity: 50%;
  }
`;
