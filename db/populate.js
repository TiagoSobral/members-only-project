async function main() {
	console.log('seeding...');
	const client = new Client({
		connectionString: process.env.DATABASE_URL,
	});
	await client.connect();
	await client.query(initialScript);
	await insertCat(client);
	await insertColors(client);
	await insertArr(client);
	await client.end();
	console.log('done');
}
