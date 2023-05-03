import styled from 'styled-components';

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

export const AccordionContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  padding: 0 2rem;

  button, h3 {
    all: unset;
  }

.AccordionRoot {
  border-radius: 4px;
  width: 100%;
  background-color: #00020C;
}

.AccordionHeader {
  display: flex;
}

.AccordionContent {
  overflow: hidden;
}

.AccordionContent[data-state='open'] {
  animation: slideDown 300ms cubic-bezier(0.87, 0, 0.13, 1);
}

.AccordionContent[data-state='closed'] {
  animation: slideUp 300ms cubic-bezier(0.87, 0, 0.13, 1);
}

.AccordionChevron {
  transition: transform 300ms cubic-bezier(0.87, 0, 0.13, 1);
}
.AccordionItem {
  background-color: #00020C;
  overflow: hidden;
}
.AccordionTrigger {
  border: 1px solid rgba(174, 218, 255, 0.1);
  border-radius: 4px;
  padding: 4rem 3rem;
  height: 45px;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #00020C;
  transition: 0.3s ease-in ;
}

.AccordionTrigger:hover {
  background: rgba(174, 218, 255, 0.1);

}
.AccordionTrigger[data-state='open'] > .AccordionChevron {
  transform: rotate(180deg);
}


@keyframes slideDown {
  from {
    height: 0;
  }
  to {
    height: var(--radix-accordion-content-height);
  }
}

@keyframes slideUp {
  from {
    height: var(--radix-accordion-content-height);
  }
  to {
    height: 0;
  }
}
`;

export const Title = styled.div<{ bgSvg: string }>`
  display: flex;
  flex: 1;
  gap: 1.6rem;
  align-items: center;

  svg {
    background: url(${({ bgSvg }) => bgSvg}) center center no-repeat;
    background-size: cover;
    width: 80px;
    height: 80px;
    transition: 1s ease-in;
    border-radius: 4px;
  }


    p {
      font-size: 2.4rem;
      display: flex;
      align-items: center;
      font-weight: bold;
      color: ${({ theme }) => theme.colors.details};
      opacity: 0.8;
      word-wrap: break-word;

      span {
        margin-left: 8px;
        font-weight: 300;
        opacity: 0.6;
        font-size: 1.4rem;
        font-style: italic;
      }
    }

  @media screen and (max-width: 925px) {
    p {
      flex-direction: column;
      align-items: flex-start;
      margin-bottom: 0.8rem;
      transition: 0.5s ease-in;
      span {
        margin-left: initial;
      }
    }
  }


  @media screen and (max-width: 625px) {
    p {
      font-size: 2.2rem;
      max-width: 55%;
    }
  }

  @media screen and (max-width: 500px) {
    svg {
      width: 70px;
      height: 70px;
    }
  }
`;
