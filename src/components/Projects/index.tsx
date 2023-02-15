import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, A11y } from 'swiper';
import 'swiper/css';
import 'swiper/css/free-mode';

import { projects } from '../../mocks/projects';

import {
  Card, CardProject, Container, DescriptionCard,
} from './styles';
import test from '../../assets/imgs/detailAbout.svg';

export default function Projects() {
  return (
    <Container>
      <h3>Projetos</h3>

      <Swiper
        mousewheel={{ releaseOnEdges: true }}
        freeMode
        grabCursor
        modules={[FreeMode, A11y]}
        className='swiper'
        slidesPerView={1.2}
      >
        {projects.map((project) => (
          <SwiperSlide key={project.id}>
            <Card>
              <CardProject>
                <img src={test} alt='' />

                <p>{project.name}</p>

                <div className='links'>
                  <a href={project.deploy}>Deploy</a>
                  <a href={project.gitUrl}>Repositório</a>
                </div>
              </CardProject>

              <DescriptionCard>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Ipsa fugit labore, iste aspernatur sit rerum illo nostrum consectetur,
                  unde voluptates perspiciatis minima cupiditate debitis quidem architecto incidunt,
                  dolores numquam fuga.
                </p>
              </DescriptionCard>
            </Card>
          </SwiperSlide>

        ))}
      </Swiper>
    </Container>
  );
}
