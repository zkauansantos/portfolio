import Carousel from 'react-elastic-carousel';

import { ContainerImage, Container } from './styles';

interface ImagesCarouselProps {
  images: string[]
}

export default function ImagesCarousel({ images }: ImagesCarouselProps) {
  return (
    <Container>
      <Carousel
        itemsToShow={1}
        itemsToScroll={1}
        transitionMs={500}
        easing='ease'
      >
        {images.map((image) => (
          <ContainerImage key={`${image} - ${Math.random()}`} src={image} />
        ))}
      </Carousel>
    </Container>
  );
}
