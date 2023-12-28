function isNonNull(condition: any, msg?: string): asserts condition {
	if (condition === null) {
		throw new Error(msg)
	}
}

document.querySelector("#contact")!.addEventListener('submit', async function (e) {

	e.preventDefault()
	const target = e.target
	isNonNull(target, "no target")

	let data = {
		formId: 1,
		answers: {}
	}
	const form = new FormData(target as HTMLFormElement)
	//@ts-ignore
	const entries = form.entries()
	for (let [key, value] of entries) {
		// Chaque réoonse, même mono-valuée, doit être un tableau.
		data.answers[key] = [value]
	}

	// FETCHEZ LA VACHE
	// L'API Fetch se charge du pre-flight check avec une requête OPTIONS
	fetch('https://nuage.toutcequibouge.net/ocs/v2.php/apps/forms/api/v1.1/submission/insert', {
		method: 'POST',
		mode: 'cors',
		"credentials": "omit",
		headers: {
			'Accept': 'application/json',
			//header obligatoire pour l'API de Nextcloud
			'OCS-APIRequest': 'true',
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data)
	})
		.then(res => {

			if (res.ok) {
				alert(' ✅ Votre message a bien été envoyé.')
			} else {
				alert("⚠️ Erreur dans l'envoi du message. Merci de bien vouloir vous rabattre sur Linkedin.")
			}
		})
		.catch(e => {
			console.log(e)
			alert("⚠️ Erreur dans l'envoi du message. Merci de bien vouloir vous rabattre sur Linkedin.")

		})

})