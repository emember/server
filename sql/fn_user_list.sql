/**

select * from user_account;

select fn_user_list('{"first_name":"","last_name":"bbb","email":"bbb@bbb.com"}'::json);

select pg_get_functiondef('fn_user_list()'::regprocedure);

**/


drop routine if exists fn_user_list(para json);
--create function fn_user_list(para json) returns table(users jsonb) AS $$
create function fn_user_list(para json) returns table (j jsonb) AS $$

declare p_first_name text;
declare p_last_name text;
declare p_email text;
declare P_where_clause text;

begin
select coalesce(cast(para->>'first_name' as text),'') into p_first_name ;
select coalesce(cast(para->>'last_name' as text),'') into p_last_name;
select coalesce(cast(para->>'email' as text),'') into p_email;



raise notice 'p_first_name: %', p_first_name;	

--set where_clause= concat(
--	cast(para->>'first_name' as text)=''
--)

--select  (cast(para->>'first_name' as text)<>'') is not true
return query 
select jsonb_agg( user_account_attr) 
from user_account
where user_account_attr->>'first_name' like concat('%',p_first_name,'%') or p_first_name='';

end;
$$ language plpgsql;