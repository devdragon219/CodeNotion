import { Box } from '@mui/material';
import { useCallback } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { DEFAULT_BORDER_RADIUS } from '../../configs/defaults';
import { SliderProps } from './Slider.types';

export const Slider = ({ height = 180, images, useExpand = false }: SliderProps) => {
  const handleClick = useCallback(
    (url: string) => {
      if (!useExpand) return undefined;

      return () => {
        const newWindow = window.open('', '_blank');
        newWindow?.document.write(`<img src="${url}">`);
      };
    },
    [useExpand],
  );

  return (
    <Box
      sx={(theme) => ({
        '& .swiper-slide': {
          height: `${height}px`,
          width: `${height * (16 / 9)}px !important`,
        },
        '& .swiper-pagination-bullet': {
          cursor: 'pointer',
          backgroundColor: theme.palette.grey[800],
          '&.swiper-pagination-bullet-active': {
            backgroundColor: theme.palette.blue[500],
          },
        },
      })}
    >
      <Swiper
        modules={[Pagination]}
        spaceBetween={24}
        slidesPerView={3}
        slidesPerGroup={3}
        speed={500}
        grabCursor
        loop={images.length > 3}
        lazy="true"
        lazyPreloaderClass="swiper-custom-lazy-preloader"
        lazyPreloadPrevNext={3}
        pagination={{
          el: '.swiper-custom-pagination',
          clickable: true,
        }}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image}
              onClick={handleClick(image)}
              loading="lazy"
              style={{
                cursor: useExpand ? 'pointer' : 'default',
                display: 'block',
                width: '100%',
                aspectRatio: '16/9',
                borderRadius: `${DEFAULT_BORDER_RADIUS}px`,
                userSelect: 'none',
              }}
            />
            <Box
              className="swiper-custom-lazy-preloader"
              sx={(theme) => ({
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: theme.palette.grey[300],
                borderRadius: `${DEFAULT_BORDER_RADIUS}px`,
                animation: 'lazy-blink 1.5s infinite',
              })}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Box
        className="swiper-custom-pagination"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mt: '24px',
          gap: '20px',
        }}
      />
    </Box>
  );
};
