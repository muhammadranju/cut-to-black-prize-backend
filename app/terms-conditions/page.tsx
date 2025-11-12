// import ContentWrapper from "@/components/content-wrapper";

import ContentWrapper from "@/components/content-wrapper";
import TermsConditions from "./TermsConditions";

// export default function TermsAndConditions() {
//   return (
//     <ContentWrapper>
//       <h1 className="text-5xl md:text-6xl font-bold text-accent mb-8">
//         Terms & Conditions
//       </h1>

//       <div className="space-y-8 text-foreground">
//         <section>
//           <h2 className="text-2xl font-bold text-accent mb-4">
//             1. Eligibility
//           </h2>
//           <p>
//             By entering Cut to Black Prize, you confirm that you are the
//             original author of the submitted screenplay, that you own all
//             intellectual property rights, and that the work has not been
//             previously published or produced commercially.
//           </p>
//         </section>

//         <section>
//           <h2 className="text-2xl font-bold text-accent mb-4">
//             2. Submission Requirements
//           </h2>
//           <p>
//             All submissions must be in standard screenplay format, provided as
//             PDF files, and adhere to the specified length requirements.
//             Submissions must include your name, contact information, and the
//             screenplay title on the cover page.
//           </p>
//         </section>

//         <section>
//           <h2 className="text-2xl font-bold text-accent mb-4">3. Entry Fee</h2>
//           <p>
//             An entry fee of $50 USD is required per submission. Fees are
//             non-refundable. Multiple submissions are permitted, each requiring a
//             separate entry fee.
//           </p>
//         </section>

//         <section>
//           <h2 className="text-2xl font-bold text-accent mb-4">
//             4. Rights & Ownership
//           </h2>
//           <p>
//             Cut to Black Prize acquires no rights to submitted screenplays. All
//             copyrights remain with the author. By submitting, you grant
//             permission for our judges to read and evaluate your work for contest
//             purposes only.
//           </p>
//         </section>

//         <section>
//           <h2 className="text-2xl font-bold text-accent mb-4">
//             5. Confidentiality
//           </h2>
//           <p>
//             All submitted materials will be handled confidentially. Judges will
//             not discuss specific details of entries with non-authorized
//             individuals. Contest organizers will not share your personal
//             information with third parties without consent.
//           </p>
//         </section>

//         <section>
//           <h2 className="text-2xl font-bold text-accent mb-4">
//             6. Winner Notification
//           </h2>
//           <p>
//             Winners will be notified via email at the address provided during
//             submission. If you do not respond within 14 days, we reserve the
//             right to select an alternate winner. Winners may be required to sign
//             a release form for publicity purposes.
//           </p>
//         </section>

//         <section>
//           <h2 className="text-2xl font-bold text-accent mb-4">
//             7. Disqualification
//           </h2>
//           <p>
//             Entries may be disqualified if they contain offensive material,
//             infringe on third-party rights, violate contest rules, or fail to
//             meet submission requirements. In such cases, entry fees will not be
//             refunded.
//           </p>
//         </section>

//         <section>
//           <h2 className="text-2xl font-bold text-accent mb-4">
//             8. Liability Disclaimer
//           </h2>
//           <p>
//             Cut to Black Prize and its organizers are not responsible for lost,
//             damaged, or misdirected submissions. Submissions are made at the
//             entrant's risk. We do not guarantee notification if disqualification
//             occurs.
//           </p>
//         </section>

//         <section>
//           <h2 className="text-2xl font-bold text-accent mb-4">
//             9. Changes to Terms
//           </h2>
//           <p>
//             We reserve the right to modify these terms at any time. Changes will
//             be posted on our website at least 30 days before taking effect.
//             Continued participation in the contest constitutes acceptance of
//             modified terms.
//           </p>
//         </section>

//         <section>
//           <h2 className="text-2xl font-bold text-accent mb-4">10. Contact</h2>
//           <p>
//             For questions regarding these terms or the contest, please contact
//             us at submissions@cuttoblackprize.com.
//           </p>
//         </section>

//         <div className="border-t border-accent/30 pt-8 mt-8">
//           <p className="text-muted text-sm">
//             Last updated:{" "}
//             {new Date().toLocaleDateString("en-US", {
//               year: "numeric",
//               month: "long",
//               day: "numeric",
//             })}
//           </p>
//         </div>
//       </div>
//     </ContentWrapper>
//   );
// }

const page = () => {
  return (
    <ContentWrapper>
      <TermsConditions />
    </ContentWrapper>
  );
};

export default page;
