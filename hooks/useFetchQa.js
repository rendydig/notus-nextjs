import useAxios from "axios-hooks";
import { useCallback, useEffect, useMemo, useState } from "react";
import * as _ from "underscore";

const host = "http://localhost:3000/report-results/";
const TEST_ROOT_DIR = process.env.NEXT_PUBLIC_TEST_ROOT_DIR;
console.log({ TEST_ROOT_DIR });

const getJsonOrgFromSpec = (spec) => {
  let org;
  const sp = spec.replace(TEST_ROOT_DIR, "").split("/", 2);
  if (sp.length === 1) {
    org = "others";
    return { org, file: sp[0] };
  }
  org = sp[0];
  return { org, file: sp[1] };
};

export const useFetchQa = () => {
  const [data, setData] = useState(undefined);
  const [orgValues, setOrgValues] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [groupList, setGroupList] = useState(undefined);

  const QaMultiFetcher = useCallback(async (urlsData = "") => {
    const urls = urlsData.split("\n").filter((v) => !_.isEmpty(v));
    const allResponses = [];

    const responses = await Promise.all(
      urls.map((url) => {
        return fetch(host + url);
      })
    );

    const orgs = {};

    for (const response of responses) {
      const jsonResponse = await response.json();
      let org;
      jsonResponse.cleanSpecs = jsonResponse.specs.map((spec) => {
        const orgFile = getJsonOrgFromSpec(spec);
        org = orgFile.org;
        return orgFile;
      });

      jsonResponse.org = org;
      if (orgs[org] && orgs[org].resp) {
        orgs[org].resp.push(jsonResponse);
      } else {
        orgs[org] = { name: org, resp: [jsonResponse] };
      }
      allResponses.push(jsonResponse);
    }
    setOrgValues(() => {
      return orgs;
    });
    setData(() => {
      return allResponses;
    });

    setGroupList(
      Object.keys(orgs).reduce((prev, curr) => {
        prev.push(curr);
        return prev;
      }, [])
    );
    setLoading(false);
  }, []);

  useMemo(() => {
    fetch(host + "main.list").then(async (response) => {
      const resp = await response.text();

      QaMultiFetcher(resp);
    });
  }, [QaMultiFetcher]);

  return [data, loading, groupList, orgValues];
};
export default useFetchQa;
