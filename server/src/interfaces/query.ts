export interface Query {
  propertyType?: string | qs.ParsedQs | string[] | qs.ParsedQs[];
  title?: {
    $regex: string | qs.ParsedQs | string[] | qs.ParsedQs[];
    $options: string;
  };
}
