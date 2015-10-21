if (Websites.find().count() === 0) {
    var siteNames = [
        "teron",
        "properm",
        "gsm-opt",
        "business-class",
        "kino"
    ];

    for (var i = 0; i < siteNames.length; i++) {
        var dataWebsite = JSON.parse(Assets.getText('data/' + siteNames[i] + '.json'))[0];

        for (var j = 0; j < dataWebsite.data.length; j++) {
            dataWebsite.data[j].date = moment(dataWebsite.data[j].date, "DD-MM-YYYY").toDate();
            dataWebsite.data[j].visitors = +dataWebsite.data[j].visitors.replace(/\s+/g, '');
            dataWebsite.data[j].views = +dataWebsite.data[j].views.replace(/\s+/g, '');
        }

        Websites.insert(dataWebsite);
    }
}