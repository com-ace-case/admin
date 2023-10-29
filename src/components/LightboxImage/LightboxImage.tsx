import type { ImageProps } from "next/image";
import type { RenderSlideProps, Slide, SlideImage } from "yet-another-react-lightbox";

import type { FC } from "react";
import { isImageFitCover, isImageSlide, useLightboxProps } from "yet-another-react-lightbox";

import { cn } from "@/lib/utils";

import { CaseImage } from "../CaseImage";

const isNextJsImage = (slide: SlideImage) => {
  return isImageSlide(slide) && typeof slide.width === "number" && typeof slide.height === "number";
};

export const LightboxImage: FC<RenderSlideProps<Slide & Pick<ImageProps, "blurDataURL">>> = ({
  slide,
  rect,
}) => {
  const { imageFit } = useLightboxProps().carousel;

  const cover = isImageSlide(slide) && isImageFitCover(slide, imageFit);

  if (!isNextJsImage(slide)) {
    return;
  }

  const width = cover
    ? rect.width
    : Math.round(Math.min(rect.width, (rect.height / (slide.height ?? 1)) * (slide.width ?? 0)));

  const height = cover
    ? rect.height
    : Math.round(Math.min(rect.height, (rect.width / (slide.width ?? 1)) * (slide.height ?? 0)));

  return (
    <div className="relative" style={{ width, height }}>
      <CaseImage
        fill
        alt={slide.alt || ""}
        src={slide.src}
        loading="eager"
        draggable={false}
        placeholder={slide.blurDataURL ? "blur" : undefined}
        className={cn(cover ? "object-cover" : "object-contain")}
        sizes={`${Math.ceil((width / window.innerWidth) * 100)}vw`}
      />
    </div>
  );
};
