'use client';

import { useState } from "react";

type FaqItem = { q: string; a: string | JSX.Element };
type FaqSection = { key: string; title: string; items: FaqItem[] };

const sections: FaqSection[] = [
  {
    key: "general",
    title: "General",
    items: [
      {
        q: "How old must I be to play?",
        a: "All players must confirm upon creating an account that they are of legal gambling age in their jurisdiction (at least 18).",
      },
      {
        q: "Are your games provably fair?",
        a: (
          <>
            Yes, all CryptoSlots games are{" "}
            <a className="text-primary underline" href="/provably-fair-explained">
              provably fair
            </a>
            . This concept uses cryptographic technology to prove that neither the player nor the casino have had
            control over the outcome of a bet. It is the best and easiest way to ensure that your bets are secure and
            the game is fair when you are playing online.
          </>
        ),
      },
      {
        q: "Is all my information secure on CryptoSlots?",
        a: (
          <>
            As per our{" "}
            <a className="text-primary underline" href="/privacy-policy">
              Privacy Policy
            </a>
            , all of your data is safe at CryptoSlots and is protected at all times by advanced security technology.
          </>
        ),
      },
      {
        q: "Can I play for free at CryptoSlots?",
        a: "All games except for Jackpot Trigger require bets made from your cash balance and cannot be played for free. Jackpot Trigger can only be played with Jackpot Tokens.",
      },
      {
        q: "What should I do if the game I am playing freezes or I get an error message in the middle of play?",
        a: (
          <>
            In the unlikely event that you get an error message or the game freezes during play, first refresh the page,
            and if this has no effect then log out and log back in again. The correct outcome of each bet is saved, even
            if it is not displayed. If you still believe there is an error then please contact{" "}
            <a className="text-primary underline" href="/support">
              Customer Support
            </a>
            .
          </>
        ),
      },
      {
        q: "What are Mega Matrix games?",
        a: (
          <>
            The{" "}
            <a className="text-primary underline" href="#">
              Mega Matrix
            </a>{" "}
            slot series is a range of exclusive games created by Slotland Entertainment's very own studio. This
            series stands out for its wide range of extra bonus features, themes, innovative reel layout, and bold
            graphics. The games are fully optimized for use on mobile devices, and come with standardized and easy-to-use
            game controls, making them enjoyable for both newcomers and seasoned slot players.
          </>
        ),
      },
    ],
  },
  {
    key: "account",
    title: "Account",
    items: [
      {
        q: "How can I register an account?",
        a: "Click \"Sign up\" at the top right of the screen to register, then choose your username, password, and enter your email address.",
      },
      {
        q: "How can I change my password?",
        a: "When logged in, select the \"Change password\" tab in your Account menu. Enter your current password in the required field, then your desired new password of 8 to 32 characters, before confirming. Please note that if you change your password, you will be unable to withdraw for 72 hours due to security reasons.",
      },
      {
        q: "What should I do if I forget my password and/or username?",
        a: "Please click \"Forgot password\" on the CryptoSlots log in screen to be redirected to reset your password. First enter the email linked to your CryptoSlots account, then follow the instructions in the email sent to this address.",
      },
      {
        q: "Can I register multiple accounts?",
        a: "CryptoSlots allows only one account per person. Additional accounts may be subject to limitations or cancelation.",
      },
      {
        q: "Is it possible to close my account for a certain period of time?",
        a: (
          <>
            All players can self-exclude at any time, temporarily blocking access to their account and any promotional
            data. Please{" "}
            <a className="text-primary underline" href="/support">
              contact support
            </a>{" "}
            to request this.
          </>
        ),
      },
      {
        q: "Can I permanently close my CryptoSlots account?",
        a: (
          <>
            You can decide to close your account at any time and have all data permanently deleted from CryptoSlots by
            contacting{" "}
            <a className="text-primary underline" href="/support">
              Customer Support
            </a>
            . CryptoSlots promotes responsible gaming and recommends any player concerned about their gambling habits to
            consult{" "}
            <a className="text-primary underline" href="/responsible-gaming">
              this page
            </a>{" "}
            for advice and helpful links.
          </>
        ),
      },
    ],
  },
  {
    key: "deposits",
    title: "Deposits & Withdrawals",
    items: [
      {
        q: "What currencies and payment methods does CryptoSlots accept?",
        a: "You can withdraw and deposit in Bitcoin (BTC), Litecoin (LTC), Ether (ETH), Monero (XMR), Tether (USDT) and USD Coin (USDC).",
      },
      {
        q: "Where can I purchase cryptocurrency?",
        a: (
          <>
            All of these currencies can easily be purchased online. Please read our easy to use guides on how to
            purchase <a className="text-primary underline" href="#">Bitcoin</a>,{" "}
            <a className="text-primary underline" href="#">Bitcoin Cash</a>,{" "}
            <a className="text-primary underline" href="#">Litecoin</a>.
          </>
        ),
      },
      {
        q: "Will I need to verify my account before or after I make a deposit or withdrawal?",
        a: "Your email address must be verified before making deposits and withdrawals, and claiming bonuses. You will be prompted to do so upon creating your account, and in the Cashier section before taking these actions.",
      },
      {
        q: "How long will my deposit take to be credited to my account?",
        a: "The deposited amount will show in your CryptoSlots account balance in a matter of seconds after you have initiated the transaction from your cryptocurrency wallet. Despite this, each deposit is only considered fully complete when it reaches a certain number of confirmations in the blockchain.",
      },
      {
        q: "What should I do if I have made a deposit and the amount has not been credited to my account?",
        a: (
          <>
            First check your "History" in the Cashier section of your account to see if the deposit is displayed. If you
            still think there is an error then please contact{" "}
            <a className="text-primary underline" href="/support">
              Customer Support
            </a>
            .
          </>
        ),
      },
      {
        q: "Will I be charged any fees?",
        a: "Sender or network fees may apply and vary depending on currency.",
      },
      {
        q: "What is the minimum/maximum amount I can deposit or withdraw?",
        a: "Minimum deposit amount is the equivalent to $25 in whichever cryptocurrency you choose to deposit in, and maximum deposit amount is the equivalent to $50,000. Minimum withdrawal is the equivalent of $25.",
      },
      {
        q: "When can I make a withdrawal?",
        a: "A withdrawal can only be requested when it is allowed in the Cashier. Some reasons you cannot withdraw include previous deposits not yet in confirmed state, an in-process withdrawal, or a recent password change.",
      },
      {
        q: "How long will it take to receive my money once I have made a withdrawal?",
        a: "All withdrawals are processed the following working day, and are accessible from your cryptocurrency wallet as soon as the sufficient amount of confirmations are met in the blockchain after sending.",
      },
    ],
  },
  {
    key: "bonuses",
    title: "Bonuses",
    items: [
      {
        q: "Where can I find available bonuses?",
        a: (
          <>
            Check the <a className="text-primary underline" href="#">Promotions page</a> to find all current available
            bonuses.
          </>
        ),
      },
      {
        q: "Where and how do I claim bonuses at CryptoSlots?",
        a: "Go to the \"Bonus\" tab in the Cashier section. Remember to enter a match bonus code before making a deposit.",
      },
      {
        q: "How many times must I wager a bonus?",
        a: "Wagering requirements are always detailed in the bonus terms.",
      },
      {
        q: "Can I see how much I still need to wager on a bonus?",
        a: "Check the \"Bonus\" tab in the Cashier section to find all relevant information for active bonuses.",
      },
    ],
  },
  {
    key: "jackpot",
    title: "Jackpot Trigger",
    items: [
      {
        q: "Does CryptoSlots have a Jackpot?",
        a: "CryptoSlots does have a jackpot and it is tied in with the jackpot specific slot, Jackpot Trigger. Jackpot wins on this game are worth up to $1,000,000.",
      },
      {
        q: "What are Jackpot Tokens and how are they acquired?",
        a: "Jackpot Tokens are collected when playing other CryptoSlots games. One token is earned for every $100 a player accumulates in wins, across all other CryptoSlots games. Once Jackpot Tokens are collected, they never expire.",
      },
      {
        q: "What happens to wins from Jackpot Trigger?",
        a: "Even though players can only play Jackpot Trigger with the Jackpot Tokens, all winnings are real money wins and will transfer to a player's cash balance.",
      },
      {
        q: "How is it possible to make wins on the Jackpot Trigger?",
        a: "There are several different ways to win on this slot: matching colors, numbers, or both, on up to 10 paylines. The payoff chart is displayed on the right of the game and wins range from $1 to $1,000,000.",
      },
      {
        q: "When does the Hold feature activate?",
        a: "The Hold Feature is available to players after a spin result in which there is no winning combination on any of the paylines. The Hold Feature cannot be used in two consecutive spins.",
      },
    ],
  },
  {
    key: "crypto-lotto",
    title: "Crypto Lotto",
    items: [
      {
        q: "How do I enter the Crypto Lotto?",
        a: "Crypto Lotto tickets are earned automatically as you play, one ticket is earned for every day that you bet $100 or over on slots (excluding the Jackpot Trigger). Maximum of one ticket can be earned per day.",
      },
      {
        q: "How are Crypto Lotto winners chosen?",
        a: "20 winners are chosen each month. Winning tickets will be randomly drawn at 00:01 GMT on the first day of each month. The winning players will be notified by email.",
      },
      {
        q: "Can I win multiple prizes?",
        a: "A player can only win one prize per lotto. Tickets are drawn from highest to lowest.",
      },
      {
        q: "When are my Lotto Tickets credited to my ticket balance?",
        a: "As soon as you have bet $100 or over on slots within one day, a ticket will be automatically credited to your Lottery Ticket balance.",
      },
      {
        q: "Where do I see the number of tickets earned?",
        a: "The Lotto Ticket icon at the top right of the screen displays the number of tickets a player has earned for the next Crypto Lotto.",
      },
    ],
  },
];

function FaqPage() {
  const [openSection, setOpenSection] = useState<string | null>(null);

  return (
    <div className="space-y-8 [&_p]:text-base [&_p]:leading-7">
      <h1 className="bg-image-clip-text text-[2.5rem] mb-[30px]">FAQ</h1>

      <p className="font-bold !text-2xl leading-9">Do you have any questions about CryptoSlots? You've come to the right place for answers.</p>

      <div className="space-y-2">
        {sections.map((section) => {
          const isOpen = openSection === section.key;
          return (
            <div key={section.key} className="rounded-md bg-[#dadbdc] px-8 py-6">
              <button
                type="button"
                className="w-full flex items-center justify-between text-left"
                onClick={() => setOpenSection(isOpen ? null : section.key)}
              >
                <span className="text-[2rem]">{section.title}</span>
                <svg
                  className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 32 32"
                >
                  <path fill="currentColor" d="M16 22L6 12l1.4-1.4l8.6 8.6l8.6-8.6L26 12z" />
                </svg>
              </button>

              {isOpen && (
                <div className="mt-8 space-y-8">
                  {section.items.map((item) => (
                    <div key={item.q} className="space-y-2">
                      <p className="font-bold">{item.q}</p>
                      <p>{item.a}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FaqPage;
