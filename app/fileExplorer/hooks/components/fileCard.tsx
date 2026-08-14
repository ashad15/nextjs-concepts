
"use client"
const styles = {
  cardAction: {},
  cardDetails: {},
};

export function FileCard({
  treeItem,
  addFolder,
}: {
  treeItem: any;
  addFolder: (callingHash: string, name :string, desc: string ) => void;
}) {
  console.log(treeItem);
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div style={styles?.cardDetails}>
        <h2>{treeItem?.name}</h2>
        <h5>{treeItem?.desc}</h5>
      </div>
      {treeItem?.type === "folder" ? (
        <div style={styles.cardAction}>
          <button onClick={() => {addFolder(treeItem?.hash, 'ascasc', 'ascasc')}}>add folder</button>
        </div>
      ) : null}
    </div>
  );
}
