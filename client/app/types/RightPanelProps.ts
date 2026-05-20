interface RightPanelProps {
  finalCode: string;
  reviewJson: any;
  repoTree?: any[];
  githubOwner?: string;
  githubRepo?: string;
  githubBranch?: string;
  selectedFilePath?: string;
  error?: string | null;
  loading: boolean;
}