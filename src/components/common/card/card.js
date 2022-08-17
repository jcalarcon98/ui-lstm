import tw from "twin.macro";
import { css } from "styled-components/macro"; 

export const Card = ({
  title,
  description,
  image,
  border = true,
  imageFirst = false
}) => {
  const Title = tw.p`text-gray-700 font-bold`;
  const Description = tw.p`text-gray-500 mt-4`;

  return (
    <div css={[tw`rounded-xl w-3/5 py-6 px-5 my-5`, border && tw`border-gray-300 border-2`]}>
      <div css={[tw`flex`, imageFirst ? tw`flex-row-reverse`: tw`flex-row`]}>
        <div tw='w-4/5'>
          <Title>{title}</Title>
          <Description>{description}</Description>
        </div>
        <div tw='w-1/5 mx-4'>
          <img src={image} />
        </div>
      </div>
    </div>
  )
};