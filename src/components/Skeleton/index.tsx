import { Box, Skeleton, SkeletonProps } from '@chakra-ui/react'

interface iProps extends SkeletonProps {
    repeatCount: number;
}

const CardSkeleton = ({repeatCount=1, ...rest}: iProps) => {
    const howMany = Array.from(Array(repeatCount).keys())
  return (
    <>
    {howMany.map((item) => (
        <Skeleton key={item} {...rest} speed={1} startColor='gray.100' endColor='gray.300'>
            <Box w="420px" h="190px" padding='7'  />
        </Skeleton>
    ))}
    </>
  )
}

export default CardSkeleton