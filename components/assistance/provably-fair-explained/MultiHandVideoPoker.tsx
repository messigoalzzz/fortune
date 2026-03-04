function ProvablyFairExplainedMultiHandVideoPoker() {
  const ul_li = 'rounded-md border-[2px] border-[#393b3c] hover:border-[var(--background-elevated)] px-4 py-3 text-center hover:bg-[var(--background)] hover:text-white'
  return (
    <div className="[&_p]:text-base [&_p]:leading-7 [&_img]:mx-auto space-y-[10px] [&_h3]:text-[2rem] [&_h3]:mb-[16px]" >
      <h1 className="bg-image-clip-text text-[2.5rem] mb-[30px]">Provably Fair on our Multi-Hand Video Poker Games</h1>

      <p className="font-bold !text-2xl leading-9 mx-auto !mb-[50px]">
      Our Provably Fair system allows all video poker players to test the fairness of their games by verifying each and every result. You influence the outcome of your own game by selecting where the deck of cards is cut. </p>


      <h3>
      1. We shuffle the deck and show you its “fingerprint”
      </h3><p>
      Before the game begins, you need to select the number of hands you will be playing at once. This determines the number of decks our server will be shuffling.

   </p>
   <p>
Once you have chosen the number of hands played, our server randomly shuffles the corresponding number of decks separately using an algorithm based on the Mersenne Twister random number generator. The assortment of decks and an additional randomly generated number (this is called the server seed) is then hashed, and presented to you as the server hash.

   </p>
      <img className="!my-[40px] w-[400px] max-w-[80%]" src="/assistance/slot-next-game-server-hash.png" alt="" />
      <h3>
      2. You can cut the deck by setting the Client seed
      </h3><p>
      This is where you step in to set the client seed. In the game menu under Provably Fair’s Next game tab you can select a number from 0 to 51 (or 52, depending on the video poker variant). This determines the position at which each deck of cards will be cut.
</p>
      <img className="!my-[40px] w-[400px] max-w-[80%]" src="/assistance/client-seed-2.png" alt="" />
      <h3>
      3. Dealing and holding cards
      </h3><p>
      When you press DEAL, you are dealt 5 cards from the first deck starting from the point at which you cut the deck (by setting the client seed). By selecting cards to hold, you copy these held cards to the remaining hands. </p>
      <img className="!my-[40px] w-[500px] max-w-[80%]" src="/assistance/blazing-wilds.png" alt="" />
      <h3>
      4. Drawing the cards
      </h3>
      <p>
      When you press DRAW, the cards you have not held are discarded and replaced with cards from the respective decks. In the first hand, these are replaced from the first deck (i.e. after the 5 you have already been dealt). As any following hands use different decks, the replacement cards are those following the point at which the decks were cut. If any of these cards are identical to the held cards, they will be automatically discarded and the following card from the deck will be used.</p> <img className="!my-[40px] w-[400px] max-w-[80%]" src="/assistance/slot-verify-result.png" alt="" />
      <h3>
      5. Verifying the result
      </h3>
      <p>

   When you finish the game, you can check the fairness of the result in the game menu under Provably Fair’s Last game tab. You will be presented the original server seed, server hash (the hashed server seed) and the client seed.


 </p>
 <p>
You can now use an independent website to verify that the server seed was really presented to you as the server hash, by hashing the server seed on this independent website. If the hashed results are identical, the game was fair according to Provably Fair concept. This verifies that the results were not tampered with at any point.

 </p>
      <img className="!my-[40px] w-[400px] max-w-[80%]" src="/assistance/client-seed-6.png" alt="" />
      <h3>
      6. Play again
      </h3>
      <p>

   When you finish the game, you can check the fairness of the result in the game menu under Provably Fair’s Last game tab. You will be presented the original server seed, server hash (the hashed server seed) and the client seed.


 </p>
 <p>
 You can now set the client seed again in the game menu under Provably Fair’s Next game tab, or we will automatically pick a random number for you.
 </p>
      <img className="!my-[40px] w-[400px] max-w-[80%]" src="/assistance/client-seed-6.png" alt="" />
      


    </div>

  );
}

export default ProvablyFairExplainedMultiHandVideoPoker;
