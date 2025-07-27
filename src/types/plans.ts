export interface Plans {
  plnid: number;
  name1: string | null;
  price: number | null;
  durat: number | null;
}

export interface TransactionPlans {
  plnid: number;
  usrid?: number;
  strdt?: string;
  enddt?: string;
  stats?: string;
  crtdt?: string;
  durat?: string;
}
