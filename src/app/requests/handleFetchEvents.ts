export const handleFetchEvents = () => {
	return new Promise((resolve, reject) => {
		fetch("/api/events", {
			method: 'get',
		})
			.then((res) => res.json())
			.then((json) => {
				return resolve(json)
			})
			.catch((error) => {
				reject(error);
			});
	});
}