// import ContentWrapper from "@/components/content-wrapper";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
// import {
//   DollarSign,
//   FileCheck,
//   FileText,
//   Scale,
//   Shield,
//   Users,
// } from "lucide-react";
// import Link from "next/link";
// import React from "react";

import MarkdownViewer from "@/components/ContestRules";

// interface AccordionSection {
//   value: string;
//   icon?: React.ReactNode;
//   title: string;
//   content: React.ReactNode;
// }

// const ContestRules: React.FC = () => {
//   const sections: AccordionSection[] = [
//     {
//       value: "Invitation Only",
//       icon: <Users className="w-5 h-5" />,
//       title: "Invitation Only",
//       content: (
//         <div className="space-y-4">
//           <ul className="space-y-3 ml-4">
//             <li className="flex items-start gap-3">
//               <span className="text-gray-300 ">
//                 Please note that entry and participation in the Cut to Black
//                 Prize screenwriting contest are by invitation only. Be sure to
//                 request an invitation before submitting your entry.
//               </span>
//             </li>
//           </ul>
//         </div>
//       ),
//     },
//     {
//       value: "Grand Prize",
//       icon: <FileText className="w-5 h-5" />,
//       title: "Grand Prize",
//       content: (
//         <div className="space-y-4">
//           <ul className="space-y-3 ml-4">
//             <li className="flex items-start gap-3">
//               <span className="text-yellow-500 mt-1">•</span>
//               <span className="text-gray-300">
//                 Cash award: 10,000 USD to the winner, paid within 30 days of
//                 winner verification.
//               </span>
//             </li>
//             <li className="flex items-start gap-3">
//               <span className="text-yellow-500 mt-1">•</span>
//               <span className="text-gray-300">
//                 Hollywood trip package: round-trip economy airfare to Los
//                 Angeles, two or three consecutive nights of standard hotel
//                 lodging, and a scheduled face-to-face general meeting with a
//                 producer or development executive.
//               </span>
//             </li>
//             <li className="flex items-start gap-3">
//               <span className="text-yellow-500 mt-1">•</span>
//               <span className="text-gray-300">
//                 Approximate retail value of travel package: up to 2,500 USD,
//                 varies by origin and travel dates. Total prize value up to
//                 12,500 USD.
//               </span>
//             </li>
//             <li className="flex items-start gap-3">
//               <span className="text-yellow-500 mt-1">•</span>
//               <span className="text-gray-300">
//                 No substitution, transfer, or cash redemption of the travel
//                 package is permitted except at Sponsor’s sole discretion. If
//                 travel is impractical or unavailable, Sponsor may provide a cash
//                 alternative of 1,500 USD or an equivalent virtual meeting
//                 package of equal or greater value.
//               </span>
//             </li>
//           </ul>
//         </div>
//       ),
//     },
//     {
//       value: "Travel Package Terms",
//       icon: <Scale className="w-5 h-5" />,
//       title: "Travel Package Terms",
//       content: (
//         <div className="space-y-4">
//           <ul className="space-y-3 ml-4">
//             <li className="flex items-start gap-3">
//               <span className="text-yellow-500 mt-1">•</span>
//               <span className="text-gray-300">
//                 Airfare: round-trip economy from the winner’s nearest major
//                 airport to LAX or BUR, booked by Sponsor or reimbursed, capped
//                 at 800 USD for U.S. and Canada, capped at 1,200 USD for
//                 international origins.
//               </span>
//             </li>
//             <li className="flex items-start gap-3">
//               <span className="text-yellow-500 mt-1">•</span>
//               <span className="text-gray-300">
//                 Lodging: standard single-occupancy room, hotel class to be
//                 determined by Sponsor, up to 300 USD per night, taxes and
//                 standard fees included.
//               </span>
//             </li>
//             <li className="flex items-start gap-3">
//               <span className="text-yellow-500 mt-1">•</span>
//               <span className="text-gray-300">
//                 Local transport and per diem: 100 USD total local transport
//                 stipend or rideshare credits, plus 60 USD per day per diem
//                 during hotel nights.
//               </span>
//             </li>
//             <li className="flex items-start gap-3">
//               <span className="text-yellow-500 mt-1">•</span>
//               <span className="text-gray-300">
//                 Travel window: must be completed within 12 months of the winner
//                 announcement. Blackout dates may apply around major holidays and
//                 industry events.
//               </span>
//             </li>
//             <li className="flex items-start gap-3">
//               <span className="text-yellow-500 mt-1">•</span>
//               <span className="text-gray-300">
//                 Documents and eligibility: winner must possess valid government
//                 identification, visas if required, and the ability to travel.
//                 Sponsor is not responsible for denied boarding, visa issues, or
//                 travel restrictions.
//               </span>
//             </li>
//             <li className="flex items-start gap-3">
//               <span className="text-yellow-500 mt-1">•</span>
//               <span className="text-gray-300">
//                 Meeting details: Sponsor will schedule a minimum 60-minute
//                 in-person general meeting with a producer or development
//                 executive. No promise of representation, employment, option,
//                 purchase, or further meetings is made or implied.
//               </span>
//             </li>
//             <li className="flex items-start gap-3">
//               <span className="text-yellow-500 mt-1">•</span>
//               <span className="text-gray-300">
//                 Guest policy: the prize is for the winner only unless Sponsor
//                 approves a guest in writing. Any guest travel costs are the
//                 responsibility of the winner.
//               </span>
//             </li>
//             <li className="flex items-start gap-3">
//               <span className="text-yellow-500 mt-1">•</span>
//               <span className="text-gray-300">
//                 Force majeure and scheduling: if events outside Sponsor’s
//                 control affect travel or meetings, Sponsor may modify dates,
//                 locations, or deliver a virtual alternative of equal or greater
//                 value.
//               </span>
//             </li>
//           </ul>
//         </div>
//       ),
//     },
//     {
//       value: "Taxes and Reporting",
//       icon: <DollarSign className="w-5 h-5" />,
//       title: "Taxes and Reporting",
//       content: (
//         <div className="space-y-4">
//           <ul className="space-y-3 ml-4">
//             <li className="flex items-start gap-3">
//               <span className="text-yellow-500 mt-1">•</span>
//               <span className="text-gray-300">
//                 Winner is responsible for all applicable taxes. For U.S.
//                 winners, Sponsor will issue a Form 1099 for the total value
//                 received. For non-U.S. winners, Sponsor may issue a Form 1042-S
//                 and withhold taxes as required.
//               </span>
//             </li>
//           </ul>
//         </div>
//       ),
//     },
//     {
//       value: "Eligibility",
//       icon: <Shield className="w-5 h-5" />,
//       title: "Eligibility",
//       content: (
//         <div className="space-y-4">
//           <ul className="space-y-3 ml-4">
//             <li className="flex items-start gap-3">
//               <span className="text-yellow-500 mt-1">•</span>
//               <span className="text-gray-300">
//                 By invitation only. Open to individuals aged 18 or older at the
//                 time of entry, except employees, officers, and immediate family
//                 members of Sponsor or judges, and anyone involved in
//                 administration of the contest. Void where prohibited by law.
//               </span>
//             </li>
//           </ul>
//         </div>
//       ),
//     },
//     {
//       value: "Entry Period and How to Enter",
//       icon: <FileCheck className="w-5 h-5" />,
//       title: "Entry Period and How to Enter",
//       content: (
//         <div className="space-y-4">
//           <ul className="space-y-3 ml-4">
//             <li className="flex items-start gap-3">
//               <span className="text-yellow-500 mt-1">•</span>
//               <span className="text-gray-300">
//                 Pre-registration: November 15, 2025 - December 31, 2025
//               </span>
//             </li>
//             <li className="flex items-start gap-3">
//               <span className="text-yellow-500 mt-1">•</span>
//               <span className="text-gray-300">
//                 Early: January 1, 2026 - March 31, 2026
//               </span>
//             </li>
//             <li className="flex items-start gap-3">
//               <span className="text-yellow-500 mt-1">•</span>
//               <span className="text-gray-300">
//                 Regular: April 1, 2026 - May 14, 2026
//               </span>
//             </li>
//             <li className="flex items-start gap-3">
//               <span className="text-yellow-500 mt-1">•</span>
//               <span className="text-gray-300">
//                 Late: May 15, 2026 - May 30, 2026
//               </span>
//             </li>
//             <li className="flex items-start gap-3">
//               <span className="text-yellow-500 mt-1">•</span>
//               <span className="text-gray-300">
//                 Extended: May 31, 2026 - June 30, 2026
//               </span>
//             </li>
//             <p className="text-gray-300">
//               Submissions will close once the participant quota is reached.
//             </p>
//             <p className="text-gray-300"> Entry fee per script:</p>
//             <li className="flex items-start gap-3">
//               <span className="text-yellow-500 mt-1">•</span>
//               <span className="text-gray-300">Early: 100 USD</span>
//             </li>
//             <li className="flex items-start gap-3">
//               <span className="text-yellow-500 mt-1">•</span>
//               <span className="text-gray-300">Regular: 120 USD</span>
//             </li>
//             <li className="flex items-start gap-3">
//               <span className="text-yellow-500 mt-1">•</span>
//               <span className="text-gray-300">Late: 130 USD</span>
//             </li>
//             <li className="flex items-start gap-3">
//               <span className="text-yellow-500 mt-1">•</span>
//               <span className="text-gray-300">Extended: 150 USD</span>
//             </li>
//             <p className="text-gray-300">
//               Fees are nonrefundable except as required by law. Entry method:
//               <br />
//               <br />
//               invited entrants submit one screenplay as a PDF with a title page
//               only and no identifying information. An optional one-page logline
//               and synopsis may be requested.
//               <br />
//               <br />
//               Limits: one submission per entrant unless Sponsor expressly
//               authorizes otherwise in writing
//             </p>
//           </ul>
//         </div>
//       ),
//     },
//     // {
//     //   value: "Entry Period and How to Enter",
//     //   icon: <FileCheck className="w-5 h-5" />,
//     //   title: "Entry Period and How to Enter",
//     //   content: (
//     //     <div className="space-y-4">
//     //       <p className="text-gray-300">
//     //         By submitting, you agree to all terms outlined therein.
//     //       </p>
//     //     </div>
//     //   ),
//     // },

//     {
//       value: "Submission Requirements",
//       icon: <Shield className="w-5 h-5" />,
//       title: "Submission Requirements",
//       content: (
//         <div className="space-y-4">
//           <ul className="space-y-3 ml-4">
//             <li className="flex items-start gap-3">
//               <p>
//                 Original, unproduced scripts only. Entrant affirms sole
//                 authorship and ownership or that all co-writers have consented
//                 to entry.
//                 <br />
//                 <br />
//               </p>
//             </li>
//             <li className="flex items-start gap-3">
//               <span className="text-yellow-500 mt-1">•</span>
//               <span className="text-gray-300">
//                 Quarterfinalists: July 10, 2026
//               </span>
//             </li>
//             <li className="flex items-start gap-3">
//               <span className="text-yellow-500 mt-1">•</span>
//               <span className="text-gray-300">
//                 Semifinalists: July 20, 2026
//               </span>
//             </li>
//             <li className="flex items-start gap-3">
//               <span className="text-yellow-500 mt-1">•</span>
//               <span className="text-gray-300">Finalists: August 3, 2026</span>
//             </li>
//             <li className="flex items-start gap-3">
//               <span className="text-yellow-500 mt-1">•</span>
//               <span className="text-gray-300">Winner: August 14, 2026</span>
//             </li>
//             <li className="flex items-start gap-3">
//               <p>
//                 Criteria and weights: storytelling and originality 30 percent,
//                 characterization and emotional stakes 25 percent, craft
//                 including structure, pacing, formatting, and dialogue 25
//                 percent, market potential 20 percent.
//                 <br />
//                 <br />
//                 The entrant with the highest composite score will be the
//                 potential winner. In the event of a tie, the script with the
//                 higher storytelling and originality score prevails, then
//                 characterization, then craft.
//                 <br />
//                 <br />
//                 Judges’ decisions are final. Odds of winning depend on the
//                 number and quality of eligible entries.
//                 <br />
//               </p>
//             </li>
//           </ul>
//         </div>
//       ),
//     },
//     {
//       value: "Judging and Selection",
//       icon: <Shield className="w-5 h-5" />,
//       title: "Judging and Selection",
//       content: (
//         <div className="space-y-4">
//           <ul className="space-y-3 ml-4">
//             <li className="flex items-start gap-3">
//               <p>
//                 Blind judging in multiple rounds by producers, professional
//                 screenwriters, script analysts, and development executives
//                 selected by Sponsor.
//                 <br />
//                 <br />
//                 Length guidance: shorts 5 to 30 pages, television pilots 30 to
//                 65 pages, features 85 to 130 pages.
//                 <br />
//                 <br />
//                 English-language scripts. Standard industry formatting is
//                 expected. Illegible, incomplete, or improperly formatted entries
//                 may be disqualified.
//               </p>
//             </li>
//           </ul>
//         </div>
//       ),
//     },
//   ];

//   return (
//     <ContentWrapper>
//       <title>Contest Rules | Cut to Black Prize</title>
//       {/* Header */}
//       <div className="mb-16 text-center">
//         <h1 className="text-4xl lg:text-5xl font-bold text-yellow-500 mb-4">
//           Official Contest Rules
//         </h1>
//         <p className="text-gray-400 text-lg max-w-lg mx-auto">
//           Everything you need to know before submitting your screenplay to the
//           contest.
//         </p>
//       </div>

//       {/* Accordion */}
//       <Accordion type="single" collapsible className="w-full space-y-4 ">
//         {sections.map((section) => (
//           <AccordionItem
//             key={section.value}
//             value={section.value}
//             className="bg-card border border-gray-100/40 rounded-lg overflow-hidden py-4 hover:border-yellow-500/70 transition-all"
//           >
//             <AccordionTrigger className="px-6 py-5 hover:no-underline group">
//               <div className="flex items-center gap-4 text-left">
//                 <div className="shrink-0 w-10 h-10 bg-yellow-500/10 rounded-lg flex items-center justify-center group-hover:bg-yellow-500/20 transition-colors">
//                   <span className="text-yellow-500">{section.icon}</span>
//                 </div>
//                 <span className="text-xl font-semibold text-white group-hover:text-yellow-500 transition-colors">
//                   {section.title}
//                 </span>
//               </div>
//             </AccordionTrigger>
//             <AccordionContent className="px-6 pb-6">
//               <div className="pt-2 border-t border-gray-800">
//                 {section.content}
//               </div>
//             </AccordionContent>
//           </AccordionItem>
//         ))}
//       </Accordion>
//     </ContentWrapper>
//   );
// };

// export default ContestRules;

const page = () => {
  return (
    <div>
      <MarkdownViewer />
    </div>
  );
};

export default page;
