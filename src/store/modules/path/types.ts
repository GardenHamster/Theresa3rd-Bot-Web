export interface PathState {
  fontPaths?: string[];
  facePaths?: FacePath[];
}

export interface FacePath {
  httpPath: string;
  serverPath: string;
}