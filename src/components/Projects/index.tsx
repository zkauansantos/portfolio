import { Swiper, SwiperSlide } from 'swiper/react';
import {
  FreeMode, A11y, Navigation, Pagination,
} from 'swiper';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/swiper-bundle.css';

import { SiGithub } from 'react-icons/si';
import { FcDeployment } from 'react-icons/fc';

import { projects } from '../../mocks/projects';

import {
  Card, CardProject, Container, DescriptionCard,
} from './styles';
import test from '../../assets/imgs/detailAbout.svg';

export default function Projects() {
  return (
    <Container id='projects'>
      <h3>Projetos</h3>

      <Swiper
        data-aos='fade-up'
        data-aos-duration='1800'
        mousewheel={{ releaseOnEdges: true }}
        freeMode
        navigation={{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }}
        pagination={{ clickable: true, el: '.swiper-pagination' }}
        grabCursor
        modules={[FreeMode, A11y, Navigation, Pagination]}
        className='swiper'
        slidesPerView={1.2}
        speed={0.1}

      >
        {projects.map((project) => (
          <SwiperSlide key={project.id}>
            <Card>
              <CardProject>
                <img src={test} alt='' />

                <strong>{project.name}</strong>

                <div className='links'>
                  <a href={project.deploy} target='_blank' rel='noreferrer'>
                    <FcDeployment />
                    <span>Deploy</span>
                  </a>
                  <a href={project.gitUrl} target='_blank' rel='noreferrer'>
                    <SiGithub />
                    <span>Repositório</span>
                  </a>
                </div>
              </CardProject>

              <DescriptionCard>
                <strong>Descrição</strong>

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
