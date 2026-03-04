function ProvablyFairExplainedVerification() {
  return (
    <div className="[&_p]:text-base [&_p]:leading-7 space-y-[20px]">
      <h1 className="bg-image-clip-text text-[2.5rem] mb-[30px]">How Can I Verify My Result?</h1>

      <p className="font-bold !text-2xl leading-9 mx-auto !mb-[50px]">
        You can verify that the server seed was truly displayed to you in hashed form as the server hash by using an
        independent website.
      </p>

      <p>Follow these easy steps:</p>

      <ol className="list-decimal pl-8 space-y-4 [&_li]:text-base [&_li]:leading-7">
        <li>
          In the game menu under Provably Fair&apos;s Last game tab, copy the &quot;Server seed&quot; field, you can use the copy
          button next to the field.
        </li>
        <li>
          Paste the &quot;Server seed&quot; in the &quot;Data&quot; field here: http://www.xorbin.com/tools/sha256-hash-calculator
          (alternatively https://md5calc.com/hash/sha256)
        </li>
        <li>Press the &quot;Calculate SHA256 hash&quot; button.</li>
        <li>
          Compare the &quot;Server hash&quot; displayed at FortuneX to the computed <em>SHA-256 Hash</em> on the independent
          website. When identical, the result of your game was generated in accordance to the Provably Fair concept and
          no one tampered with the result.
        </li>
        <li>
          To verify that the game result was the one you should have received, you need to take into account the server
          and client seeds.
        </li>
      </ol>

      <p>
        The client seed influences the game result. In case of slot machines it picks one of the 9 pregenerated game
        results, for video poker games it determines the position at which the deck of cards was cut.
      </p>

      <p>
        The server seed for slot machine games is a text representation of 9 pregenerated game results. You can copy it
        to a text editor for a better arrangement and understanding. Each game result is an assorted list of symbols
        that appear in the slot machine.
      </p>

      <p>
        The server seed for card games is a text representation of a sequenced card deck. For example, 7S = seven of
        spades, AH = Ace of Hearts, etc.
      </p>
    </div>
  )
}

export default ProvablyFairExplainedVerification

