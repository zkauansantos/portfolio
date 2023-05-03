import styled from 'styled-components';
import 'flickity/css/flickity.css';

export const Content = styled.div`
  width: 100%;
  max-width: 124rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12.8rem 0;

  h2 {
    font-size: 4.8rem;
    margin-bottom: 6.4rem;
    color:  ${({ theme }) => theme.colors.markText};
  }
`;

export const GridProjects = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, auto);
  grid-template-rows: repeat(3 auto);
  gap: 2rem;
  padding: 0 1rem;

  @media screen and (max-width: 1024px){
    padding: 0 2rem;
    grid-template-columns: repeat(1, auto);
  }
`;
