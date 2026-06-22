export type User = { id:number; full_name:string; email:string; role:string; department_id?:number };
export type Complaint = { id:number; title:string; description:string; category:string; status:string; priority:string; latitude:number; longitude:number; address:string; citizen_id:number; assigned_officer_id?:number; department_id?:number };
export type Asset = { id:number; name:string; asset_type:string; status:string; latitude:number; longitude:number; address:string; department_id:number; last_maintenance_date?:string; next_maintenance_date?:string };
export type Alert = { id:number; title:string; message:string; severity:string; latitude:number; longitude:number; location_name:string; is_active:boolean; created_by:number };
