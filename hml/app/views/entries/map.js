function (doc) {
	if (doc._id.substr(0,6) === "entry:") {
		emit(doc._id.substr(6), {
			"mediaChoice": doc.mediaChoice,
			"nameItem": doc.nameItem,
			"genreItem": doc.genreItem,
			"lengthItem": doc.lengthItem,
			"pubDate"   : doc.pubDate,
			"purchaseDate" : doc.purchaseDate,
			"notesLabel": doc.notesLabel,
			"id": doc.id
		
		});
	}
};