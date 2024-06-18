import { useEffect, useState } from "react"
import "./App.css"
import { createPublicClient, getContract, http } from "viem"
import { MarketPlaceABI } from "./constants/MarketPlaceABI"
import { degen } from "viem/chains"
import {
  Button,
  ChakraProvider,
  Divider,
  Flex,
  Heading,
  Text,
  UnorderedList,
} from "@chakra-ui/react"
import { Card } from "./components/Card"

function App() {
  // get query params
  const urlParams = new URLSearchParams(window.location.search)
  const listingId = urlParams.get("listing_id")

  const [totalListings, setTotalListings] = useState(0)

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
      const totalListings = await marketPlaceContract.read.totalListings()

      setTotalListings(Number(totalListings))
    }
    fetch()
  }, [])

  return (
    <ChakraProvider>
      <Heading textAlign="center" fontSize="4xl">
        Card Popup Shop
      </Heading>

      <Text maxW={450} margin="10px auto" fontSize="lg">
        Welcome to the Card Popup Shop!
        <br />
        Here you can list your cards for sale! Click the "List My Card" button
        to list your card.
        <br />
        If you need help, click the "How to list cards" button.
      </Text>

      <Flex justifyContent="center" gap={3} my={5}>
        <a
          target="_blank"
          href="https://thirdweb.com/degen-chain/0x6FaE5F3a204aB0c461caB9164F3860B20092f09b/direct-listings"
        >
          <Button background="#472c8e" color="white">
            List My Card
          </Button>
        </a>
        <a target="_blank" href="https://tinyurl.com/23stubzy">
          <Button background="white" color="#472c8e" borderColor="#472c8e">
            How to list cards
          </Button>
        </a>
      </Flex>

      <Text maxW={450} margin="0 auto" p={2} backgroundColor="yellow.400">
        Buy me a coffee you like the idea!
        <br />
        0xdCb93093424447bF4FE9Df869750950922F1E30B
      </Text>

      <Divider borderWidth={3} my={10} />

      {listingId && (
        <iframe
          src={`https://embed.ipfscdn.io/ipfs/bafybeigdie2yyiazou7grjowoevmuip6akk33nqb55vrpezqdwfssrxyfy/marketplace-v3.html?contract=0x6FaE5F3a204aB0c461caB9164F3860B20092f09b&chain=%7B%22name%22%3A%22Degen+Chain%22%2C%22chain%22%3A%22Degen%22%2C%22rpc%22%3A%5B%22https%3A%2F%2F666666666.rpc.thirdweb.com%2F%24%7BTHIRDWEB_API_KEY%7D%22%5D%2C%22nativeCurrency%22%3A%7B%22name%22%3A%22DEGEN%22%2C%22symbol%22%3A%22DEGEN%22%2C%22decimals%22%3A18%7D%2C%22shortName%22%3A%22degen-chain%22%2C%22chainId%22%3A666666666%2C%22testnet%22%3Afalse%2C%22slug%22%3A%22degen-chain%22%2C%22icon%22%3A%7B%22url%22%3A%22ipfs%3A%2F%2FQmb6yAe4wXeBkxjfhxzoUT9TzETcmE7Vne59etm9GJaQf7%22%2C%22width%22%3A789%2C%22height%22%3A668%2C%22format%22%3A%22svg%22%7D%7D&clientId=36b7637235916cf26161b24ea87a1324&directListingId=${listingId}&theme=light&primaryColor=purple`}
          width="600px"
          height="600px"
          frameBorder="0"
        />
      )}
      {!listingId && totalListings && (
        <UnorderedList
          display="flex"
          flexWrap="wrap"
          justifyContent="center"
          gap={5}
          listStyleType="none"
          margin={0}
        >
          {Array(totalListings)
            .fill(0)
            .map((_, index) => (
              <Card id={totalListings - index - 1} />
            ))}
        </UnorderedList>
      )}
    </ChakraProvider>
  )
}

export default App
