class Bill {
  public _id:string;
  public ac_invoice_item_id: string;
  public doc_date:any = new Date();
  public doc_number: number;
  public customer_id: string;
  public total_discount: number;
  public total_tax: number;
  public total_value: number;
  public tenant_id: string;
}

export { Bill }
