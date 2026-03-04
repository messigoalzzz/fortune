function ProvablyFairExplainedVideoPoker() {
  const ul_li = 'rounded-md border-[2px] border-[#393b3c] hover:border-[var(--background-elevated)] px-4 py-3 text-center hover:bg-[var(--background)] hover:text-white'
  return (
    <div className="[&_p]:text-base [&_p]:leading-7 [&_img]:mx-auto space-y-[10px] [&_h3]:text-[2rem] [&_h3]:mb-[16px]" >
      <h1 className="bg-image-clip-text text-[2.5rem] mb-[30px]">Provably Fair on our Video Poker Games</h1>

      <p className="font-bold !text-2xl leading-9 mx-auto !mb-[50px]">
      Our Provably Fair system allows all video poker players to test the fairness of their games by verifying the results. You can influence your game by selecting where the deck of cards is cut. </p>


      <h3>
      1. We shuffle the deck and show you its “fingerprint”
      </h3><p>
      Before you are dealt cards, our server randomly shuffles the deck of cards using an algorithm based on the Mersenne Twister random number generator. The assortment of cards and an additional random number (this is called the server seed) is then hashed and presented to you as the server hash.

   </p>
      <img className="!my-[40px] w-[400px] max-w-[80%]" src="/assistance/slot-next-game-server-hash.png" alt="" />
      <h3>
      2. You can cut the deck by setting the Client seed
      </h3><p>
      This is when you can step in. You can now set the client seed. In the game menu under Provably Fair’s Next game tab you can select a number from 0 to 51 (or 52, depending on the video poker variant). This sets the card position where the deck of cards will be cut, before dealing the cards to you.

</p>
      <img className="!my-[40px] w-[400px] max-w-[80%]" src="/assistance/client-seed-2.png" alt="" />
      <h3>
      3. Dealing the cards
      </h3><p>
      When you press the DEAL/DRAW button, the cards are dealt to you starting from the position the deck was cut.  </p>
      <img className="!my-[40px] w-[500px] max-w-[80%]" src="/assistance/blazing-wilds.png" alt="" />
      <h3>
      4. Verifying the result
      </h3><p>
      When you finish the game, you can check the fairness of the game in the game menu under Provably Fair’s Last game tab. You will be presented the original server seed, server hash (the hashed server seed) and the client seed.</p><p>
      You can use an independent website to verify that the server seed was really presented to you as the server hash by hashing the server seed on this independent website. If the hashed results are identical, the game was fair according to Provably Fair concept which means no one tampered with the result.  </p>
      <img className="!my-[40px] w-[400px] max-w-[80%]" src="/assistance/slot-verify-result.png" alt="" />
      <h3>
      5. Play again
      </h3>
      <p>
      You can now set the client seed again in the game menu under Provably Fair’s Next game tab or we will automatically pick a random number for you.
      </p>
      <img className="!my-[40px] w-[400px] max-w-[80%]" src="/assistance/client-seed-6.png" alt="" />
      


    </div>

  );
}

export default ProvablyFairExplainedVideoPoker;
