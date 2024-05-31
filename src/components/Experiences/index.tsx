/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import * as Accordion from '@radix-ui/react-accordion';
import classNames from 'classnames';
import { forwardRef } from 'react';
import { AiOutlineArrowDown } from 'react-icons/ai';
import { useWidth } from '../../hooks/useWidth';
import { experiencesData } from '../../utils/experiencesData';
import { Container } from '../Container';
import { Overlay } from '../Overlay';
import Activities from './Activities';
import { AccordionContainer, Content, Title } from './styles';

const AccordionTrigger = forwardRef(({ children, className, ...props }: any, forwardedRef) => (
  <Accordion.Header className="AccordionHeader">
    <Accordion.Trigger
      className={classNames('AccordionTrigger', className)}
      {...props}
      ref={forwardedRef}
    >
      {children}
      <AiOutlineArrowDown className="AccordionChevron" aria-hidden />
    </Accordion.Trigger>
  </Accordion.Header>
));

export default function Experiences() {
  const width = useWidth();

  return (
    <Container id="experience">
      <Overlay bg="#000512">
        <Content>
          <h2>Experiências</h2>

          <AccordionContainer>
            <Accordion.Root className="AccordionRoot" type="single" collapsible>
              {experiencesData.map((experience, i) => (
                <Accordion.Item key={experience.id} className="AccordionItem" value={`item-${i}`}>
                  <AccordionTrigger>
                    <Title bgSvg={experience.imgCompany}>
                      <svg />
                      <p>
                        {width > 500 ? experience.company : experience.abreviation}

                        <span>{experience.duration}</span>
                      </p>
                    </Title>
                  </AccordionTrigger>
                  <Activities
                    jobRole={experience.jobRole}
                    activities={experience.activities}
                    description={experience?.description}
                  />
                </Accordion.Item>
              ))}
            </Accordion.Root>
          </AccordionContainer>

        </Content>
      </Overlay>
    </Container>
  );
}
