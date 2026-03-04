'use client';

import { useState } from "react";

const generalTerms: Array<string | JSX.Element> = [
  "Players must be of legal gambling age (18 or older) in his or her jurisdiction in order to play at CryptoSlots.",
  "CryptoSlots reserves the right to exclude anybody from participating in promotions and receiving newsletters, and can void or reject any transactions upon their discretion.",
  "It is the player's sole responsibility to safeguard their login credentials (email & password) at all times, and CryptoSlots will not be held responsible for any unauthorized use of a player's account.",
  "CryptoSlots games are for players' personal entertainment, and players acknowledge that gambling in general may result in monetary losses. Players, therefore, consent that CryptoSlots cannot be held responsible for losses or damages of any kind resulting from real money play. All wagered transactions are final and non-refundable.",
  <>
    Players are to correspond with our{" "}
    <a className="text-primary underline" href="/support">
      Customer Support
    </a>{" "}
    regarding any issues with their account, transactions, or winnings. Final decisions regarding disputes will be made
    by CryptoSlots and winnings paid at the casino&apos;s discretion. In case of any discrepancy between the game
    results on a player&apos;s device and the results on CryptoSlots servers, the results on CryptoSlots&apos; servers
    will be considered final and binding. Upon request, records can be readily provided in order to support the case.
  </>,
  "Players will not use CryptoSlots for any unlawful or fraudulent activity, nor for prohibited transactions under the laws of any jurisdiction applying to the player. This includes, but is not limited to, money laundering and using CryptoSlots as a cryptocurrency mixer. If CryptoSlots suspects that a player is engaging in fraudulent activity, or is funding their account through unlawful means, their account may be blocked immediately and any funds tied to their account withheld.",
  "Malfunctions void all pays and plays. CryptoSlots accepts no liability for omissions, errors, software bugs, service interruption, or service termination.",
  "The player agrees to receive administrative and promotional emails from CryptoSlots or other Slotland Entertainment projects. To stop receiving promotional emails, players must unsubscribe from receiving such emails in their account profile or may contact our Customer Support team.",
  "CryptoSlots is entitled to collect, store, and process only the personal data provided by players. This will only be used for the purposes of i) proof of agreement to terms, ii) sending any relevant promotional material or information about CryptoSlots and player's account, iii) further agreements between player and Slotland Entertainment, iv) fulfilling any legal obligations as a result of these terms, v) protecting CryptoSlots in any judicial, administrative, or other proceedings.",
  <>
    CryptoSlots will never sell your data to third parties and your data will not be provided to third parties unless
    required by law. Further information about data use can be found in CryptoSlots&apos;{" "}
    <a className="text-primary underline" href="/privacy-policy">
      Privacy Policy
    </a>
    .
  </>,
  "CryptoSlots utilizes cookies to track player visits for the purpose of personalizing player gaming experience. This information is collected to improve overall services and not in a way which personally identifies players. Players can turn off cookies at any time, by following instructions on their browsers.",
  "Duplication, redistribution, or publication of any content or part of CryptoSlots is strictly prohibited unless used to promote CryptoSlots directly.",
  <>
    Minimum deposit is equivalent to $25, in the event a player&apos;s deposit is lower, the deposit will be credited to
    your account but will not be eligible to receive a bonus. Maximum deposit is equivalent to $50,000, in the event a
    player&apos;s deposit exceeds this amount your account may be suspended for your safety. In this case please contact{" "}
    <a className="text-primary underline" href="/support">
      Customer Support
    </a>
    . The minimum withdrawal amount is $25, and is paid out the following business day.
  </>,
  "All deposits must be wagered at least once, unless connected to a match bonus. If a player does not meet this condition and requests a withdrawal, CryptoSlots will consider this behavior as an attempt at money laundering and/or bonus abuse. A withdrawal made from said deposit will result in a 25% processing fee and the player account may be subject to suspension.",
  "Deposits which have not yet been fully confirmed in the blockchain will be marked as \"Confirming\" in the Cashier section. The amount deposited will, however, be credited to your account prior to full confirmation. When the deposit is complete the status will read \"Confirmed\" in the Cashier.",
  "All funds credited prior to 100% deposit confirmation are a courtesy of CryptoSlots and all wins resulting from said deposit(s) will belong to the casino until the deposit status will read \"Confirmed\" in the Cashier. In the event of failed deposit(s), subsequent withdrawals will be voided and your account will be subject to suspension/cancelation. Withdrawals can only be requested when all deposits are in the \"Confirmed\" state.",
  "All withdrawals will be subject to an internal audit before being processed. CryptoSlots reserves all rights to void any winnings for failed audits. If it appears that the player is participating in malicious practices, is taking advantage of any software or system bug/failure, or is participating in any form of activity that CryptoSlots deems to be abusive, CryptoSlots, at its sole discretion, reserves the right to confiscate winnings and/or deposit of such abuse from the player in question.",
  "The cut-off time for withdrawals is 23:59 GMT (18:59 EST / 19:59 EDT) the day before the payments are processed. After this cut off time the money in your withdrawal fund will be transferred to the prepayment fund and can no longer be reversed.",
  "For player's personal security all wins over $10k will be paid in multiple simultaneous transactions to different addresses. Players will be contacted by the Billing Department and asked to provide several addresses to allow this.",
  "Players understand that digital currencies can fluctuate in value and that CryptoSlots exchange rates update every 15 minutes.",
  "Throughout the lifetime of a player's account, CryptoSlots reserves the right to use verification procedures to verify the player's identity, and access to a player's account may be suspended or closed if CryptoSlots determines that a player has supplied false or misleading information.",
  "Jackpot Trigger can only be played using Jackpot Tokens and not from funds in your cash balance. These tokens are earned through playing other CryptoSlots games and cannot be purchased. Every time a player's winnings accumulate to a multiple of $100, one Jackpot Token is earned. This excludes all Jackpot Trigger winnings.",
  "Players can only collect tickets for the Crypto Lotto once they have made at least three closed deposits of at least $25 in their account and have deposited at least $100 in total. Lotto Tickets are automatically credited as soon as a player's bets accumulate to $100 within one day, spanning from 00:00 to 23:59 GMT. Bets on Jackpot Trigger do not count towards the $100. Winning tickets will be drawn at 00:01 GMT on the first day of each month. The winning players will be notified by email. Prizes must be claimed within 30 days and must be wagered 1x. A player can only win one prize per lotto. Tickets are drawn from highest to lowest. If any subsequent tickets belong to players who have already won a prize, these will be discarded and the draw will continue.",
  "Terms and conditions may be changed without prior notice. It is the player's responsibility to make sure that they are up to date with recent changes to the terms and conditions, and their continued use of CryptoSlots will be deemed as acceptance and consent to all updates.",
];

const bonusTerms: Array<string | JSX.Element> = [
  "In order to claim a bonus, players must redeem the bonus code in the Cashier. For match bonuses, the bonus code must be claimed before the player makes a deposit.",
  "If a player redeems a bonus code, it is their responsibility to ensure that all bonus terms are met, otherwise the casino reserves the right to cancel the bonus. Wagering requirements stated in the bonus terms only apply to the bonus amount itself.",
  "Players may cancel a redeemed bonus code in the Cashier only before the bonus is played on. If a player cancels a bonus code, they forfeit all bonus money and winnings. In the case of a match bonus, only the deposit made to receive the bonus will remain in the player's cash balance, or what remains of it. General terms will then apply to the remaining deposit and players will not be able to redeem a new match bonus code on this deposit.",
  "Once a player starts playing after redeeming a match code, the deposit must be wagered as per the bonus terms and the bonus code can no longer be canceled. If assistance is needed, players can contact the Billing Department to request cancelation, however, it is the sole discretion of the Billing Department to determine if a cancelation may be granted. If a bonus is canceled by the Billing Department, standard bonus cancelation procedure will apply and all bonus money and winnings are forfeited.",
  "Only one bonus can be active at a time on a player's account. Promotional offers cannot be combined into one or accumulated. If malfunctions occur and a second bonus is activated then any winnings from such a bonus will be voided. Only the deposit, or what remains, will stay in the player's cash balance.",
  "In the event that a player uses a bonus offer/code that they are not entitled to, all winnings generated from the bonus are forfeited. If a deposit has been made in connection with the bonus then only this deposit will remain in the cash balance.",
  "The maximum bonus amount received on all standard bonuses is $1,000 or $5,000 for VIP players, unless stated otherwise in terms. Please see below for separate welcome bonus terms.",
  "Welcome bonuses are only available to new members who have not played at this site before. Welcome bonuses are valid to claim for 90 days after first creating an account. Players can deposit up to $50,000, however the maximum bonus amount received is $500. The maximum cash out for each particular welcome bonus is $5,000, but this does not apply to any wins resulting from Jackpot Tokens earned while playing welcome bonuses.",
  <>
    Jackpot Tokens can only be used for play on Jackpot Trigger, therefore bonus funds cannot be used to play this
    game. Jackpot Tokens are earned solely through playing other CryptoSlots games (see{" "}
    <a className="text-primary underline" href="/terms-and-conditions">
      General Terms &amp; Conditions
    </a>
    ).
  </>,
  "CryptoSlots reserves the right to deny or remove any bonus or withdrawal if the player owns or has previously owned another CryptoSlots account. Bonuses may also be denied to players who exhibit suspected fraudulent behavior.",
  "CryptoSlots also reserves the right to exclude players from bonuses if the player has been found to abuse bonuses and promotional offers. This includes but is not solely applicable to players who open multiple accounts and players who do not have active depositing accounts, or players who continuously refuse to meet the set bonus terms.",
  "CryptoSlots reserves the right to modify or cancel a promotional offer and modify bonus terms at any time without prior notice. It is the responsibility of all players to check bonus terms and promotional offers prior to acting upon them.",
  "All promotions are listed in Eastern Standard Time (North American), or GMT-5, and it is upon the player to take this into account when claiming bonuses.",
  "All bonus requirements must be fulfilled prior to making a withdrawal, including bonus wagering requirements. For example, if a $100 bonus has a 15x wagering requirement, the player must wager $1,500 ($10 X 15) before a withdrawal can be made. Wagering requirements applicable to bonuses are detailed on the promotions page or are specified during promotional offers.",
  "Wagers are first made from a player's active bonus balance, and only once this has been played will it then be made from the available cash balance. In the case of match bonuses, the bonus balance is made up of the bonus amount and deposit amount attached to the match bonus. Wagers are first made from the deposit amount and second from the bonus amount.",
  "Different games played contribute a different percentage towards fulfilling wagering requirements from bonuses. Jackpot Trigger does not count towards wagering requirements. The respective percentages are as follows: Slots count 100% towards wagering requirements. Video Poker games count 20% towards wagering requirements. Keno counts 50% towards wagering requirements.",
  "Playthrough requirements determine how long players have to use both the bonuses and the resulting winnings. Max cash out requirements determine the amount players can withdraw from a bonus. The Cashier section displays bonus information after a bonus is redeemed.",
  "Winnings and withdrawals are void in the event that players play any games other than those included in the bonus terms.",
  "Any withdrawal requests made from a max cash out bonus are blocked from further use and processed the next withdrawal day. This amount cannot be reversed to the player's available balance. All bonus winnings that exceed the max cash out limit are removed from the player's account balance once they have requested a withdrawal, and this excess amount cannot be withdrawn. CryptoSlots also reserves the right to remove excess play money at any time, whether or not a withdrawal has been processed.",
];

function TermsAndConditionsPage() {
  const [openSection, setOpenSection] = useState<"general" | "bonus" | null>("general");

  return (
    <div className="space-y-8 [&_p]:text-base [&_p]:leading-7">
      <h1 className="bg-image-clip-text text-[2.5rem] mb-[20px]">Terms &amp; Conditions</h1>
      <p className="font-bold !text-[2rem] leading-9">
        Please take the time to read the terms and conditions below in its entirety before opening an account at
        CryptoSlots.
      </p>
      <p className="!text-sm">
        CryptoSlots is operated by Slotland Entertainment S.A., with registered address at Bonovo Road, Fomboni, Island
        of Moheli, Union of Comoros.
      </p>

      <div className="space-y-2">
        <div className="rounded-md bg-[#dadbdc] px-8 py-6">
          <button
            type="button"
            className="w-full flex items-center justify-between text-left"
            onClick={() => setOpenSection(openSection === "general" ? null : "general")}
          >
            <span className="text-[2rem]">General Terms &amp; Conditions</span>
            <svg
              className={`transition-transform duration-200 ${openSection === "general" ? "rotate-180" : ""}`}
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 32 32"
            >
              <path fill="currentColor" d="M16 22L6 12l1.4-1.4l8.6 8.6l8.6-8.6L26 12z" />
            </svg>
          </button>
          {openSection === "general" && (
              <ol className="list-decimal pl-8 mt-6 space-y-3 [&_li]:text-base [&_li]:leading-7">
              {generalTerms.map((item, idx) => (
                <li key={`general-${idx}`}>{item}</li>
              ))}
            </ol>
          )}
        </div>

        <div className="rounded-md bg-[#dadbdc] px-8 py-6">
          <button
            type="button"
            className="w-full flex items-center justify-between text-left"
            onClick={() => setOpenSection(openSection === "bonus" ? null : "bonus")}
          >
            <span className="text-[2rem]">Bonus Terms &amp; Conditions</span>
            <svg
              className={`transition-transform duration-200 ${openSection === "bonus" ? "rotate-180" : ""}`}
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 32 32"
            >
              <path fill="currentColor" d="M16 22L6 12l1.4-1.4l8.6 8.6l8.6-8.6L26 12z" />
            </svg>
          </button>
          {openSection === "bonus" && (
            <div className="mt-6 space-y-5">
              <h3 className="font-bold text-[1.5rem]">General Bonus Rules</h3>
              <ol className="list-decimal pl-8 space-y-3 [&_li]:text-base [&_li]:leading-7">
                {bonusTerms.slice(0, 13).map((item, idx) => (
                  <li key={`bonus-general-${idx}`}>{item}</li>
                ))}
              </ol>
              <h3 className="font-bold text-[1.8rem]">Bonus Cash Out Terms</h3>
              <ol className="list-decimal pl-8 space-y-3 [&_li]:text-base [&_li]:leading-7">
                {bonusTerms.slice(13).map((item, idx) => (
                  <li key={`bonus-cashout-${idx}`}>{item}</li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TermsAndConditionsPage;
