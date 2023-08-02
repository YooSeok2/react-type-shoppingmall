import styled from '@emotion/styled';

type ImageBoxProps = {
  width: string,
  height: string
}

const ImageBox = styled.img<ImageBoxProps>`
  width: ${props => props.width};
  height: ${props=> props.height};
  object-fit: contain;
  margin: 15px 0;
`;

const CustomImage = ({src, alt, width, height}: {src:string, alt:string, width: string, height:string}) => {
  return (
    <ImageBox width={width} height={height} alt={alt} src={src} />
  )
}

export default CustomImage;