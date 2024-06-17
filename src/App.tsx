import "./App.css"

function App() {
  // get query params
  const urlParams = new URLSearchParams(window.location.search)
  const listingId = urlParams.get("listing_id")

  return (
    <>
      <iframe
        src={`https://embed.ipfscdn.io/ipfs/bafybeigdie2yyiazou7grjowoevmuip6akk33nqb55vrpezqdwfssrxyfy/marketplace-v3.html?contract=0x6FaE5F3a204aB0c461caB9164F3860B20092f09b&chain=%7B%22name%22%3A%22Degen+Chain%22%2C%22chain%22%3A%22Degen%22%2C%22rpc%22%3A%5B%22https%3A%2F%2F666666666.rpc.thirdweb.com%2F%24%7BTHIRDWEB_API_KEY%7D%22%5D%2C%22nativeCurrency%22%3A%7B%22name%22%3A%22DEGEN%22%2C%22symbol%22%3A%22DEGEN%22%2C%22decimals%22%3A18%7D%2C%22shortName%22%3A%22degen-chain%22%2C%22chainId%22%3A666666666%2C%22testnet%22%3Afalse%2C%22slug%22%3A%22degen-chain%22%2C%22icon%22%3A%7B%22url%22%3A%22ipfs%3A%2F%2FQmb6yAe4wXeBkxjfhxzoUT9TzETcmE7Vne59etm9GJaQf7%22%2C%22width%22%3A789%2C%22height%22%3A668%2C%22format%22%3A%22svg%22%7D%7D&clientId=36b7637235916cf26161b24ea87a1324&directListingId=${listingId}&theme=light&primaryColor=purple`}
        width="600px"
        height="600px"
        frameBorder="0"
      />
      <br />
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          gap: "10px",
          justifyContent: "center",
        }}
      >
        <a href="https://thirdweb.com/degen-chain/0x6FaE5F3a204aB0c461caB9164F3860B20092f09b/direct-listings">
          <button>You can list from here</button>
        </a>
        <a href="">
          <button>How to list your card</button>
        </a>
      </div>
    </>
  )
}

export default App
