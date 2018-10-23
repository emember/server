/**

truncate table  user_account RESTART IDENTITY;

select * from user_account;

call proc_user_create();
**/
drop ROUTINE if exists proc_user_create();
create procedure proc_user_create()
language sql
AS $$

drop table if exists generated_id;
create temp table generated_id as
with insert_result as (
	insert into user_account(user_account_attr) 
	values ('{"first_name":"bbb","last_name":"bbb","email":"bbb@bbb.com"}') returning user_account_id
)
select user_account_id, jsonb_build_object('user_account_id', user_account_id) as json_value from insert_result group by user_account_id;

update user_account ua
set user_account_attr=  user_account_attr || gd.json_value 
from generated_id gd
where ua.user_account_id = gd.user_account_id;

$$;