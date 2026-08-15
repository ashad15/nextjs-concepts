"use client";

import React from "react";
import { FileCard } from "./hooks/components/fileCard";
import { useFileExplorer } from "./hooks/useFileExplorer";

export default function FileExplorerPage() {
  const { addFolder, filesTree } = useFileExplorer();

  const renderFileTree = (fileTree = {}) => {
    console.log(fileTree);
    if (!(fileTree instanceof Object)) {
      console.log("not ins");
      return;
    }
    return (
      <div className="fileCard">
        <h1>asdasdas</h1>
        {Object.entries(fileTree).map(([key, treeItem]) => {
          return (
            <div key={key}>
              <FileCard treeItem={treeItem} addFolder={addFolder} />
              {treeItem?.child && Object.entries(treeItem?.child)?.length ? (
                <div>
                  {Object.entries(treeItem?.child).length ? (
                    <div>
                      <h1>asbchasnuchbascjasc </h1>
                      {Object.entries(treeItem.child).map(([key, subtree]) => {
                        return (
                          <React.Fragment key={key}>
                            {renderFileTree({ [key]: subtree })}
                          </React.Fragment>
                        );
                      })}
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div>
      {Object.keys(filesTree)?.length ? (
        renderFileTree(filesTree)
      ) : (
        <div>
          <h2>No Folder/Files added </h2>
          <button
            onClick={() => {
              addFolder("", "newItem", "some random desc");
            }}
          >
            add folder
          </button>
        </div>
      )}
    </div>
  );
}
