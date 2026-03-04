function ProvablyFairExplainedSlotMachines() {
  const ul_li = 'rounded-md border-[2px] border-[#393b3c] hover:border-[var(--background-elevated)] px-4 py-3 text-center hover:bg-[var(--background)] hover:text-white'
  return (
    <div className="[&_p]:text-base [&_p]:leading-7 [&_img]:mx-auto space-y-[10px] [&_h3]:text-[2rem] [&_h3]:mb-[16px]" >
      <h1 className="bg-image-clip-text text-[2.5rem] mb-[30px]">Provably Fair on our Slot Machines</h1>

      <p className="font-bold !text-2xl leading-9 mx-auto !mb-[50px]">
        Our Provably Fair system allows all slot players to test the fairness of their spins by verifying the results. You can select one spin result out of nine possible outcomes and with every spin we guarantee that at least one possible spin outcome is a winning one!  </p>


      <h3>
        1. We prepare nine random spin results
      </h3><p>
        Before you spin, our server randomly generates a set of nine spin results (this is called a server seed) and presents them to you in an encrypted form, which is called the server hash. We also add a random number to the server seed text string before we hash it.
      </p>
      <img className="!my-[40px] w-[400px] max-w-[80%]" src="/assistance/slot-next-game-server-hash.png" alt="" />
      <h3>
        2. Influence spin result by setting the Client seed
      </h3><p>
        This is when you can step in. You can now set your client seed; your input that can influence the game result. In the game menu under Provably Fair’s Next game tab, you enter a number from 1 to 9. Each number corresponds to one possible spin result. Remember, at least one spin result is a guaranteed win!   </p>
      <img className="!my-[40px] w-[400px] max-w-[80%]" src="/assistance/client-seed-2.png" alt="" />
      <h3>
        3. Spinning and checking the result of the game
      </h3><p>
        When you press the SPIN button, your chosen spin result is revealed to show you the game outcome.   </p>
      <img className="!my-[40px] w-[500px] max-w-[80%]" src="/assistance/blazing-wilds.png" alt="" />
      <h3>
        4. Verifying the result
      </h3><p>
        When the spin has finished, you can check the game results in the game menu under Provably Fair’s Last game tab. All nine possible spin results are graphically presented to you, and the one you have chosen by setting your client seed is highlighted.
      </p><p>
        You can also check that the server seed was really shown to you before you spun, simply by copying the server seed text string and using an independent hash calculator to verify it.
      </p><p>

        If the hash is identical to the one presented to you before you spun, it means no one tampered with the result and the game was fair. The server seed text string contains the same data that is displayed graphically, but in text form.    </p>
      <img className="!my-[40px] w-[400px] max-w-[80%]" src="/assistance/slot-verify-result.png" alt="" />
      <h3>
      5. Play again
      </h3>
      <p>
      Before you make another spin, you can set the client seed again. Otherwise we will change it randomly for you.
      </p>
      <img className="!my-[40px] w-[400px] max-w-[80%]" src="/assistance/client-seed-6.png" alt="" />
      
      <h3>
      How can we guarantee at least one winning spin among the preliminary generated spins?

      </h3>
      <p>
      Before you make another spin, you can set the client seed again. Otherwise we will change it randomly for you.

      </p>
      <p>
        How can we guarantee at least one winning spin among the preliminary generated spins?
      </p>
      <p>
        Before you spin we generate a set of 9 spin results and check them for possible wins. If there is no winner, this outcome is discarded and another is randomly created. If there are multiple winning results, the set will indeed be used. These outcomes are then assorted at random and you then play to find out your game’s outcome.

        This guarantees a possible win in every spin.    </p>

    </div>

  );
}

export default ProvablyFairExplainedSlotMachines;
