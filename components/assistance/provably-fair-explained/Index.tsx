function ProvablyFairExplainedIndex() {
  const ul_li = 'rounded-md border-[2px] border-[#393b3c] hover:border-[var(--background-elevated)] px-4 py-3 text-center hover:bg-[var(--background)] hover:text-white'
  const pageHref = (name: string) => `/provably-fair-explained?name=${name}`

  return (
    <div className="[&_p]:text-base [&_p]:leading-7 [&_img]:mx-auto space-y-[10px] ">
      <h1 className="bg-image-clip-text text-[2.5rem] mb-[30px]">Provably Fair Explained</h1>

      <p className="font-bold !text-2xl leading-9 mx-auto !mb-[50px]">
        All games at FortuneX.com are Provably Fair, which means you can easily verify the randomness and fairness of all game results you play. Check out our Provably Fair games now.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_minmax(120px,300px)] gap-8">
        <p>
          The Provably Fair system is a mathematical method that is used to ensure that no one, neither players nor casinos, can know the result of the game before it starts and that the casino cannot tamper with the random operation of the game.

          We do this by presenting you a concealed set of the possible outcomes of the upcoming game, all before you even start playing. We then allow you to step into the game by selecting a simple value that will influence the final result of the game. When the game ends, you can verify the initial data and also check how your input affected the result of the game.

          To better grasp how it works, try imagine dice in a black cup, which we will shake, and place on a table upside down in front of you. The position of the dice is recorded by a hidden camera and the image is darkened so that you cannot see the number on the dice.

          In Provably Fair terminology, this darkened image of the dice is called a server hash. It is a cryptographically hashed set of initial game data. The actual position of the dice is called a server seed and will be revealed when the game ends.
        </p>
        <div className="rounded-md border-[0.625rem] border-[#dadbdc] px-[7%] py-[1.825rem] text-center h-fit place-self-center">
          <h2 className="font-bold text-2xl">
            How Provably Fair Works On Our:
          </h2>
          <ol className="list-decimal list-inside text-left mx-auto w-fit space-y-2 mt-8 text-primary font-medium">
            <li>
              <a href={pageHref('slot-machines')}>Slot Machines</a>
            </li>
            <li>
              <a href={pageHref('video-poker')}>Video Poker Games</a>
            </li>
            <li>
              <a href={pageHref('multi-hand-video-poker')}>Multi-Hand Poker Games</a>
            </li>
            <li>
              <a href={pageHref('keno-games')}>Keno Games</a>
            </li>
            <li>
              <a href={pageHref('verification')}>Verification</a>
            </li>
          </ol>
        </div>
      </div>
      <img className="my-[40px]" src="/assistance/server-seed-server-hash.png" alt="" />
      <p>
        Now you can step in and pick any number between 1 and 6 that will be added to the number on the dice. The final result will be the sum of the number you picked and the number on the dice. In Provably Fair terminology, you picked your client seed: data that has an impact on the game result.
      </p>
      <img src="/assistance/client-seed-3.png" alt="" />
      <img src="/assistance/game-result.png" alt="" />
      <p>
        The cup is then removed to reveal the result, and you can verify that the position of the dice hasn't been changed by looking at the original, now enlightened camera image.
      </p>
      <p>
        When the game ends you can verify it by checking that the server hash (the camera image) really corresponds to the initial set of data (the server seed or in our example the position of the dice), if they match you know the game was fair.
      </p>
      <img src="/assistance/verifivation.png" alt="" />
      <p>
        Interested in delving deeper into this topic? Explore the comprehensive <a href="#" className="text-primary">Provably Fair article</a> series, which not only covers the fundamentals and advantages but also delves into the intricacies of the technology:
      </p>

      <ul className="flex flex-col mx-auto w-[300px] space-y-4 ">
        <li className={ul_li}>
          Provably Fair 1: An Introduction
        </li>
        <li className={ul_li}>
          Provably Fair 2: The Basics & Hashing
        </li>
        <li className={ul_li}>
          Provably Fair 3: Diverse Implementations
        </li>
      </ul>
      <p className="!text-[24px] font-bold text-center py-4">Read how Provably Fair works on our games here:
      </p>
      <ul className="flex flex-col w-[300px] mx-auto space-y-4 ">
        <li className={ul_li}>
          <a href={pageHref('slot-machines')}>Provably Fair Slot Machines</a>
        </li>
        <li className={ul_li}>
          <a href={pageHref('video-poker')}>Provably Fair Video Poker Games</a>
        </li>
        <li className={ul_li}>
          <a href={pageHref('multi-hand-video-poker')}>Provably Fair Multi-Hand Video Poker Games</a>
        </li>
        <li className={ul_li}>
          <a href={pageHref('keno-games')}>Provably Fair Keno Games</a>
        </li>
      </ul>
      <p className="py-4 text-center"  >Read detailed instructions on how you can verify the results of games you played.</p>
      <ul className="flex flex-col w-[300px] mx-auto space-y-4 !mb-16">
        <li className={ul_li}>
          <a href={pageHref('verification')}>Verification</a>
        </li>
      </ul>
      {/* <div className="w-full my-[60px] bg-black h-[1px]" />
      <h2 className="bg-image-clip-text text-[2.5rem] !my-[30px] uppercase">
        More About Provably Fair
      </h2>
      <p>Interested in delving deeper into this topic? Explore the comprehensive Provably Fair article series, which not only covers the fundamentals and advantages but also delves into the intricacies of the technology.</p>
      <div>
      </div> */}
    </div>

  );
}

export default ProvablyFairExplainedIndex;
