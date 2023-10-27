type DefaultParams = Record<string, string | string[] | undefined>;

export interface PageProps<T = DefaultParams, S = DefaultParams> {
  params: T;
  searchParams: S;
}
