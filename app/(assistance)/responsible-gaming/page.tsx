function ResponsibleGamingPage() {
  return (
    <div className="space-y-8 [&_p]:text-base [&_p]:leading-7 [&_li]:text-base [&_li]:leading-7">
      <h1 className="bg-image-clip-text text-[2.5rem] mb-[30px]">Responsible Gaming</h1>

      <p className="font-bold !text-2xl leading-9">
        CryptoSlots is here to provide an excellent and enjoyable gaming experience and recognize our responsibility in
        preventing problematic activity.
      </p>

      <p>We advise all players to take into account the following, and not game irresponsibly:</p>
      <ul className="list-disc pl-8 space-y-2">
        <li>Play for entertainment, not to make money.</li>
        <li>Avoid chasing losses.</li>
        <li>Establish limits for yourself.</li>
        <li>Do not let gambling interfere with your daily responsibilities.</li>
        <li>Never gamble unless you can cover losses.</li>
        <li>Take breaks.</li>
      </ul>

      <p>
        See the below questions. If your answer to the majority of them is "YES", we advise you take action to prevent
        gambling from negatively impacting your life:
      </p>
      <ul className="list-disc pl-8 space-y-2">
        <li>Does gambling affect your work?</li>
        <li>Has gambling caused arguments with family/friends?</li>
        <li>Do you always return to win back your losses?</li>
        <li>Have you borrowed money to gamble?</li>
        <li>Do you see gambling as a source of income?</li>
        <li>Do you find it difficult to limit your gambling?</li>
      </ul>

      <h2 className="text-[2rem] leading-none">What to do?</h2>
      <p>
        Listed below are reputed organizations committed to helping those who struggle with gambling problems, and can
        be contacted at any time:
      </p>
      <div className="max-w-[400px] mx-auto flex flex-col gap-4">
        <a className="border-2 border-[#43474c] rounded-md h-[52px] flex items-center justify-center text-[1.8rem]" href="#">
          Gamblers Anonymous
        </a>
        <a className="border-2 border-[#43474c] rounded-md h-[52px] flex items-center justify-center text-[1.8rem]" href="#">
          Gambling Therapy
        </a>
        <a className="border-2 border-[#43474c] rounded-md h-[52px] flex items-center justify-center text-[1.8rem]" href="#">
          GamCare
        </a>
      </div>

      <h2 className="text-[2rem] leading-none">How we can help</h2>
      <p>
        We advise all players who are concerned about their gambling behavior to take a break by excluding themselves
        from their gaming account. Self exclusion will lock your account for a minimum of 6 months and no promotional
        material will be sent.
      </p>
      <p>
        Contact our experienced <a className="text-primary underline" href="/support">Customer Support</a> team at any
        time to request this and they will kindly assist you. A 7 day cooling off period is also available. We
        recommend that you contact all other gambling sites where you have an account and request self-exclusion there
        also.
      </p>

      <h2 className="text-[2rem] leading-none">Underage gambling</h2>
      <p>
        Players must be of legal gambling age in their jurisdiction (at least 18+) in order to play at CryptoSlots. It
        is their responsibility to be aware of the age restriction where they reside and play, and to confirm their
        legitimacy when creating an account at CryptoSlots. We also advise parents to do the following:
      </p>
      <ul className="list-disc pl-8 space-y-2">
        <li>Password protect computer, mobile, and/or tablet.</li>
        <li>Do not leave device unattended when logged into your account.</li>
        <li>Make sure all account details and credit cards are inaccessible to children.</li>
        <li>Do not save passwords on your computer, write them down and keep somewhere out of reach.</li>
        <li>
          Download filtering software (e.g. <a className="text-primary underline" href="#">Net Nanny</a>) to prevent
          minors from accessing inappropriate sites.
        </li>
      </ul>
    </div>
  );
}

export default ResponsibleGamingPage;
