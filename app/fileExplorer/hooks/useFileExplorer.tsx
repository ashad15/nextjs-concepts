
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
    const timeHash = Date.now();
    if (callingHash) {
      const newHashMade = callingHash + `--${timeHash}`;
      const newItem: fileDetails = {
        name,
        desc,
        expanded: true,
        type: "folder",
        hash: newHashMade,
        child: {},
      };
      const treeArray = callingHash.split("--");
      const clonedTree = structuredClone(filesTree);
      let item = clonedTree;
      let locationNotFound = false;
      for (const location of treeArray) {
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
      const newItem: fileDetails = {
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
