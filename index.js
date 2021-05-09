const {Pool} = require(&quot;pg&quot;);
async function criarConexao() {
    const pool = new Pool({
        connectionString: '' 
        ssl: {
            rejectUnauthorized: false
        }
    });
    let con = await pool.connect();
    let res = await con.query(`
        create table pizza(
            id serial primary key, 
            tamanho varchar
            sabor varchar
        )`
    );
 
    await con.query(&quot;insert into pizza (tamanho, sabor) values ($1, $2)&quot;,
[&quot;Familia&quot;, &quot;Mussarela&quot;]); 
    await con.query(&quot;insert into pizza (tamanho, sabor) values ($1, $2)&quot;,
[&quot;Pequena&quot;, &quot;Queijo&quot;]);
    await con.query(&quot;insert into pizza (tamanho, sabor) values ($1, $2)&quot;,
[&quot;Familia&quot;, &quot;Moda da casa&quot;]);
    await con.query(&quot;insert into pizza (tamanho, sabor) values ($1, $2)&quot;,
[&quot;Pequena&quot;, &quot;Toscana&quot;]);
   await con.query(&quot;update pizza set sabor = $1 where id = $2&quot;, [&quot;Portugu
esa&quot;, 2]);
await con.query(&quot;delete from pizza where (sabor) like &#39;T%&#39;&quot;);
    
    let res = await con.query(&quot;select * from pizza&quot;);
    let tuplas = res.rows;
    for(let tupla of tuplas) {
        console.log(tupla);
    
    con.release();
}
}
criarConexao();