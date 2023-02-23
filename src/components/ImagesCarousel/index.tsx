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
        enableAutoPlay
        autoPlaySpeed={1500}
        transitionMs={500}
        itemPadding={[0, 10]}
        easing='ease'
      >
        {images.map((image) => (
          <ContainerImage key={`${image} - ${Math.random()}`}>
            <img src={image} alt='foto do projeto' />
          </ContainerImage>
        ))}
      </Carousel>
    </Container>
  );
}
