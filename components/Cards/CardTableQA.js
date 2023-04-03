import React, { useMemo } from "react";
import PropTypes from "prop-types";

// components

import TableDropdown from "components/Dropdowns/TableDropdown.js";

export default function CardTableQA({ color, data, title }) {
  const qaItems = useMemo(() => {
    return data.map((item, index) => {
      item.key = index;
      return item;
    });
  }, [data]);
  return (
    <>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
          (color === "light" ? "bg-white" : "bg-blueGray-700 text-white")
        }
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3
                className={
                  "font-semibold text-lg " +
                  (color === "light" ? "text-blueGray-700" : "text-white")
                }
              >
                QA Status {title}
              </h3>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <div className="table-qa items-center w-full bg-transparent border-collapse">
            <div className="table-qa-head">
              <div className="table-qa-row flex flex-row w-full">
                <div
                  className={
                    "px-6 grow align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                  }
                >
                  Name / Stories
                </div>
                <div
                  className={
                    "px-6 flex-none align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left w-1/3 " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                  }
                >
                  States (Pass / Failed)
                </div>
                {/* <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                  }
                >
                  Status
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                  }
                >
                  Users
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                  }
                >
                  Completion
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                  }
                ></th> */}
              </div>
            </div>
            <div className="table-qa-body">
              {qaItems.map((qaItem) => {
                return (
                  <div key={qaItem.key}>
                    <div className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {qaItem.suites[0].name} <br />
                      <div className="my-2">Loc: {qaItem.specs[0]}</div>
                      <ul style={{ listStyleType: "disc" }}>
                        {qaItem.suites[0].tests.map((test) => {
                          return (
                            <li
                              className="ml-4 my-2 flex flex-row"
                              key={test.name}
                            >
                              <div className="grow">{test.name}</div>
                              <div className="flex-none w-1/3">
                                {test.state === "passed"
                                  ? "✔ Passed"
                                  : "❌ Failed"}
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                    {/* <div className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      Pass: {qaItem.state.passed} <br />
                      Failed: {qaItem.state.failed} <br />
                      <ul>
                        {qaItem.suites[0].tests.map((test) => {
                          return <li className="" key={test.name}></li>;
                        })}
                      </ul>
                    </div> */}
                  </div>
                );
              })}
              {/* <tr>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  $2,500 USD
                </td>
              </tr> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

CardTableQA.defaultProps = {
  color: "light",
  data: [],
  title: "",
};

CardTableQA.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
  data: PropTypes.array,
  title: PropTypes.string,
};
