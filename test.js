/*
 * 总结一下node调用mysql,返回值的规律
 * 返回值第一个字段总是err
 * 第二个字段一般是result,根据sql语句内容
 * 的不同，result中的内容也会不同。
 * 1.如果sql语句是一个select,那么result
 * 是一个数组,表示返回的rows.
 * 2.如果sql语句是一个insert,那么result
 * 是一个object,它里边的字段包括fieldCount,
 * insertId,affectedRows等。
 * 如果sql语句是一个存储过程调用，分为:
 * a) 如果存储过程中只包含一个select语句，
 * 那么返回的result是一个数组，其中数组第一个
 * 元素是rows(也是一个数组),第二个字段
 * 是changeresult(与上边的insert返回值相同)
 * b) 如果存储过程包含两个select，那么返回的
 * result是一个数组,其中前两个元素分别是两个
 * select的rows，最后一个元素是changeresult
 * c) 多个select的情况参考b)
 * d) 如果包括select和insert,那么result是一个
 * 数组，其中第一个元素(或者前n个元素，如果
 * 包含n个select的话)是select的返回值rows，
 * 最后一个元素是changeresult
 * e) 如果存储过程中只包含insert,那么result
 * 是一个object，而不是数组，其中只包含最后
 * 一个insert的changeresult。
 */


var _mysql = require('mysql');

var mysql = _mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'xxx',
	database:'testdb'
});


mysql.query('select uid,uname,upass from user;',function(err,rows,fields){
	if(err){
		console.log('\n\n**select error:',err);
	}else{
		console.log('\n\n**select rows:',rows);
	}
});

mysql.query('select uid,uname,upass from user_non_exist;',function(err,rows,fields){
	if(err){
		console.log('\n\n**select error:',err);
	}else{
		console.log('\n\n**select rows:',rows);
	}
});

var rand = Math.random();
mysql.query('INSERT INTO user(uname,upass) values(?,?);',
		[rand,rand],function(err,result){
	if(err){
		console.log('\n\n**insert error:',err);
	}else{
		console.log('\n\n**insert result:',result);
	}
});

mysql.query('INSERT INTO user_non_exist(uname,upass) values(?,?);',
		[rand,rand],function(err,result){
	if(err){
		console.log('\n\n**insert error:',err);
	}else{
		console.log('\n\n**insert result:',result);
	}
});

mysql.query('call one_query_proc();',function(err,result,fields){
	console.log("\n\n");
	if(err){
		console.log('call one_query_proc err:',err);
	}else{
		var rows = result[0];
		var changeResult = result[1];
		console.log('one_query_proc rows:',rows);
		console.log('one_query_proc changeResult:',changeResult);
	}
});

mysql.query('call two_query_proc();',function(err,result,fields){
	if(err){
		console.log('err:',err);
	}else{
		var rows1 = result[0];
		var rows2 = result[1];
		var changeResult = result[2];
		console.log('two_query_proc rows1:',rows1);
		console.log('two_query_proc rows2:',rows2);
		console.log('two_query_proc changeResult:',changeResult);
	}
});

mysql.query('call insert_and_query_proc();',function(err,result,fields){
	console.log('\n\n');
	if(err){
		console.log('err:',err);
	}else{
		console.log('insert_and_query rows:',result[0]);
		console.log('rinsert_and_query esult:',result[1]);
	}
});

mysql.query('call one_insert_proc();',function(err,result,fields){
	console.log('\n\n');
	if(err){
		console.log('err:',err);
	}else{
		console.log('one_insert_proc result:',result);
	}
});

mysql.query('call two_insert_proc();',function(err,result,fields){
	console.log('\n\n');
	if(err){
		console.log('err:',err);
	}else{
		console.log('two_insert_proc result:',result);
	}
});
