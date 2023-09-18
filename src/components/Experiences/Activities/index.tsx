import * as Accordion from '@radix-ui/react-accordion';
import classNames from 'classnames';
import { forwardRef, ForwardedRef } from 'react';
import { ActivitiesContainer } from './styles';

type AccordionContentProps = {
  children: React.ReactNode;
  className?: string;
};

const AccordionContent = forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ children, className = '', ...props }, forwardedRef: ForwardedRef<HTMLDivElement>) => (
    <Accordion.Content
      className={classNames('AccordionContent', className)}
      {...props}
      ref={forwardedRef}
    >
      <div className="AccordionContentText">{children}</div>
    </Accordion.Content>
  ),
);

interface ActivitiesProps {
  activities: string[];
  description?: string;
  jobRole: string;
}

export default function Activities({ activities, description, jobRole }: ActivitiesProps) {
  return (
    <AccordionContent>
      <ActivitiesContainer>
        <div>
          <h3><span>{jobRole}</span></h3>
          {!!description && <p>{description}</p>}
        </div>

        <ul>
          {activities.map((activite) => (
            <li key={activite}>{activite}</li>
          ))}
        </ul>
      </ActivitiesContainer>
    </AccordionContent>
  );
}
