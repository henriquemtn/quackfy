/* eslint-disable @next/next/no-img-element */
import { Marquee } from "@/components/magicui/marquee";

const images = [
  { src: '/templates/gray.png', width: 180, height: 240 },
  { src: '/templates/provisory1.png', width: 180, height: 240 },
  { src: '/templates/provisory2.png', width: 180, height: 240 },
  { src: '/templates/gray.png', width: 180, height: 240 },
  { src: '/templates/provisory1.png', width: 180, height: 240 },
  { src: '/templates/provisory2.png', width: 180, height: 240 },
  { src: '/templates/gray.png', width: 180, height: 240 },
  { src: '/templates/provisory1.png', width: 180, height: 240 },
];

const firstRow = images.slice(0, 2);
const secondRow = images.slice(2, 4);

const ImageCard = ({
  src,
  width,
  height,
}: {
  src: string;
  width: number;
  height: number;
}) => {
  return (
    <div
      className="relative cursor-pointer overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white"
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      <img
        className="w-full h-full object-cover object-top"
        src={src}
        alt="Template preview"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );
};

export function HeroImagesBlur() {
  return (
    <div className="h-102 bg-transparent w-full flex-row items-center hidden lg:flex justify-start lg:justify-end gap-4 overflow-hidden [perspective:300px]">
      <div
        className="flex flex-row items-center gap-4"
       
      >
        <Marquee pauseOnHover vertical className="[--duration:20s]">
          {firstRow.map((image, idx) => (
            <ImageCard key={`${image.src}-${idx}`} {...image} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:20s]" vertical>
          {secondRow.map((image, idx) => (
            <ImageCard key={`${image.src}-${idx}`} {...image} />
          ))}
        </Marquee>
      </div>


    </div>
  );
}