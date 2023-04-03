import React, { useMemo } from "react";

// components

import CardTable from "components/Cards/CardTable.js";

// layout for page

import Admin from "layouts/Admin.js";
import useAxios from "axios-hooks";
import useFetchQa from "hooks/useFetchQa";
import CardTableQA from "components/Cards/CardTableQA";
import { useRouter } from "next/router";

export default function Qapages() {
  const [data, loading, groupList, orgValues] = useFetchQa();

  const { query } = useRouter();
  const filteredGroupList = useMemo(()=>{
    if(groupList && query.org){
      return groupList.filter((groupKey) => query.org === groupKey)
    }
    return groupList
  },[groupList, query])
  console.log({ query });
  console.log({ data, groupList });
  if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error!</p>

  // return (
  //   <div>
  //     <button onClick={refetch}>refetch</button>
  //     <pre>{JSON.stringify(data, null, 2)}</pre>
  //   </div>
  // )

  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          {filteredGroupList &&
            filteredGroupList.map((group) => (
              <CardTableQA
                key={group}
                title={group}
                data={data.filter((dt) => {
                  return dt.org === group;
                })}
              />
            ))}
        </div>
        {/* <div className="w-full mb-12 px-4">
          <CardTable color="dark" />
        </div> */}
      </div>
    </>
  );
}

// Qapages.layout = Admin;
