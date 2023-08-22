import Image, {ImageProps} from 'next/image';
import styled from '@emotion/styled';

type ImageLoaderProps = {
  src: string,
  width: number,
  quality: number
}

const onImageError = (error: unknown) => console.error(error);
const imageLoader = ({
  src, 
  width, 
  quality,
} : 
  ImageLoaderProps) => {
    return `${src}?w=${width}&q=${quality || 75}`
}

type ImageBoxProps = {
  propHeight: string | null
}

const ImageBox = styled.div`
  position: relative;
  width: 100%;
  margin: 15px auto;
  height: ${(props: ImageBoxProps) => props.propHeight};
  & img {
    margin: auto;
  }
`;

const CustomImage = ({
  fill = false, 
  src, 
  alt,
  width,
  height,
  propHeight, 
  ...props} :
  ImageProps & { propHeight?: string } ) => {
  return (
    <ImageBox propHeight={propHeight}>
      <Image
        css={{
          height: '100%',
          objectFit: 'contain',
          objectPosition: 'center',
        }}
        width={width}
        height={height}
        fill={fill}
        alt={alt || 'image'}
        src={src}
        {...props}
        onError={onImageError}
        loader={imageLoader}
      />
    </ImageBox>
  )
}

export default CustomImage;