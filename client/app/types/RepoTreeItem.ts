export interface RepoTreeItem {
  path: string;
  entryType: "Directory" | "File";
  type?: string;
  size?: number;
}