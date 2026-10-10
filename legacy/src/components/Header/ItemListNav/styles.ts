import styled from 'styled-components';

export const Item = styled.li`
  font-size: 2rem;
  font-weight: 700;
  position: relative;
  cursor: pointer;

  &::after {
    content: "";
    position: absolute;
    width: 100%;
    transform: scaleX(0);
    height: 1px;
    bottom: -7px;
    left: 0;
    background: linear-gradient(
      270deg,
      ${({ theme }) => theme.colors.markText} 0%,
      #17161d 100%
    );
    transform-origin: bottom right;
    transition: transform 0.5s cubic-bezier(0.86, 0, 0.07, 1);
    }

    &:hover::after {
      transform: scaleY(1);
      transform: scaleX(1);
      transform-origin: bottom left;
    }
`;
