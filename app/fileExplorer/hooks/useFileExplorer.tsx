
"use client"
import { useState } from "react";

type itemDeatils = {
  expanded: true | false;
  type: "folder" | "file";
  name: string;
  desc: string;
  hash: string;
};

type fileDetails = itemDeatils & {
  child: Record<string, fileDetails>;
};

export function useFileExplorer() {
  const [filesTree, setFileTree] = useState<Record<string, fileDetails>>({});

  const addFolder = (callingHash: string, name = "aaa", desc = "abc") => {
    let timeHash = Date.now();
    if (callingHash) {
      let newHashMade = callingHash + `--${timeHash}`;
      let newItem: fileDetails = {
        name,
        desc,
        expanded: true,
        type: "folder",
        hash: newHashMade,
        child: {},
      };
      let treeArray = callingHash.split("--");
      const clonedTree = structuredClone(filesTree);
      let item = clonedTree;
      let locationNotFound = false;
      for (let location of treeArray) {
        if (item[location]) {
          item = item[location]?.child;
        } else {
          locationNotFound = true;
          break;
        }
      }
      if (!locationNotFound) {
        item[timeHash] = newItem;
      }
      setFileTree(clonedTree);
    } else {
      let newItem: fileDetails = {
        name,
        desc,
        expanded: true,
        type: "folder",
        hash: `${timeHash}`,
        child: {},
      };
      setFileTree({ [timeHash]: newItem });
    }
  };

  return { addFolder, filesTree };
}
