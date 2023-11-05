export interface PathState {
  fontPaths?: string[];
  facePaths?: FacePath[];
  maskPaths?: FacePath[];
}

export interface FacePath {
  httpPath: string;
  serverPath: string;
}