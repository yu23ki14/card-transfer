import { Box, Button, Flex, Image, Spinner, Text } from "@chakra-ui/react"
import { FC, useEffect, useState } from "react"
import { createPublicClient, formatEther, getContract, http } from "viem"
import { degen } from "viem/chains"
import { MarketPlaceABI } from "../constants/MarketPlaceABI"

type Props = {
  id: number
}

export const Card: FC<Props> = ({ id }) => {
  const [tokenId, setTokenId] = useState<number>()
  const [isLoading, setIsLoading] = useState(true)
  const [status, setStatus] = useState<number>()
  const [price, setPrice] = useState<string>()

  useEffect(() => {
    const fetch = async () => {
      const client = createPublicClient({
        chain: degen,
        transport: http(),
      })
      const marketPlaceContract = getContract({
        abi: MarketPlaceABI,
        address: "0x6FaE5F3a204aB0c461caB9164F3860B20092f09b",
        client,
      })
      const totalListings = await marketPlaceContract.read.getListing([
        BigInt(id),
      ])

      if (
        totalListings.assetContract !==
        "0x860160c7f0EBBf2FA911bE099E7BB0752002A211"
      ) {
        setIsLoading(false)
        return
      }

      setTokenId(Number(totalListings.tokenId))
      setStatus(Number(totalListings.status))
      setPrice(formatEther(totalListings.pricePerToken))
      setIsLoading(false)
    }
    fetch()
  }, [])

  return (
    <Box
      p={5}
      width={300}
      borderRadius={5}
      boxShadow="0 0 3px 0 gray"
      position="relative"
      overflow="hidden"
    >
      <Image
        margin="auto"
        borderRadius={5}
        width="240px"
        height="240px"
        src={`/${tokenId}.png`}
      />

      <Text textAlign="center" my={2}>
        {price} $DEGEN
      </Text>

      <Box mt={2}>
        <a href={`/?listing_id=${id}`} target="_blank">
          <Button width={200} background="#472c8e" color="white">
            Buy
          </Button>
        </a>
      </Box>

      {status === 3 && (
        <Flex
          justifyContent="center"
          alignItems="center"
          width="100%"
          height="100%"
          background="rgba(0, 0, 0, .7)"
          position="absolute"
          top={0}
          left={0}
          fontSize="3xl"
          fontWeight="bold"
          color="white"
        >
          Cancelled
        </Flex>
      )}
      {status === 2 && (
        <Flex
          justifyContent="center"
          alignItems="center"
          width="100%"
          height="100%"
          background="rgba(0, 0, 0, .7)"
          position="absolute"
          top={0}
          left={0}
          fontSize="3xl"
          fontWeight="bold"
          color="white"
        >
          Sold
        </Flex>
      )}
      {isLoading && (
        <Flex
          justifyContent="center"
          alignItems="center"
          width="100%"
          height="100%"
          background="rgba(0, 0, 0, .7)"
          position="absolute"
          top={0}
          left={0}
          fontSize="3xl"
          fontWeight="bold"
          color="white"
        >
          <Spinner color="white" />
        </Flex>
      )}
      {!isLoading && typeof tokenId === "undefined" && (
        <Flex
          justifyContent="center"
          alignItems="center"
          width="100%"
          height="100%"
          background="rgba(0, 0, 0, .7)"
          position="absolute"
          top={0}
          left={0}
          fontSize="3xl"
          fontWeight="bold"
          color="white"
        >
          Invalid
        </Flex>
      )}
    </Box>
  )
}
