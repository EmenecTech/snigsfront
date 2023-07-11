import { useRef } from "react";

const Print_parent = () => {
  const componentRef = useRef();

  const Data = [
    {
      ID: "1",
      JobTitle: "Clerk",
      EmailAddress: "Emerald_Lambert9442@1kmd3.biz",
      FirstNameLastName: "Emerald Lambert",
    },
    {
      ID: "2",
      JobTitle: "Fabricator",
      EmailAddress: "Maya_Mould4025@ag5wi.website",
      FirstNameLastName: "Maya Mould",
    },
    {
      ID: "3",
      JobTitle: "Business Broker",
      EmailAddress: "Mark_Murray8424@lyvnc.center",
      FirstNameLastName: "Mark Murray",
    },
    {
      ID: "4",
      JobTitle: "Doctor",
      EmailAddress: "Sara_Khan955@lhp4j.net",
      FirstNameLastName: "Sara Khan",
    },
    {
      ID: "5",
      JobTitle: "Stockbroker",
      EmailAddress: "Lexi_Seymour9320@xqj6f.center",
      FirstNameLastName: "Lexi Seymour",
    },
  ];
  return (
    <>
      <div
        className="text-center"
        ref={componentRef}
        style={{ width: "100%", height: window.innerHeight }}
      >
        <h1>employee data</h1>
      </div>
    </>
  );
};
export default Print_parent;
